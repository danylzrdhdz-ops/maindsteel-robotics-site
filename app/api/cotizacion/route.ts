import type { NextRequest } from "next/server";

/**
 * Server-side relay for B2B quote leads coming from the /cotizaciones chat.
 *
 * The real Google Apps Script URL and the shared secret live only in server
 * environment variables (COTIZACION_WEBHOOK_URL, COTIZACION_WEBHOOK_SECRET),
 * never in the client bundle.
 */

// TEMPORARY fallback so leads keep flowing until COTIZACION_WEBHOOK_URL is set
// in Vercel. This URL already appears in the public git history, so this adds
// no new exposure, and it is server-only (never sent to browsers).
// TODO: remove once the env var exists and the Apps Script deployment is rotated.
const FALLBACK_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbwtRvyZ6saPXz2NLfd4gEGOtyu1wgIueipaVCY0CvBfEWgePYy__iFL1SNAUVltDYda0w/exec";

const MAX_BODY_BYTES = 8 * 1024;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

// Field name -> [min length, max length]
const FIELDS = {
  nombre: [2, 120],
  empresa: [1, 160],
  contacto: [3, 160],
  requerimiento: [1, 200],
  especificaciones: [1, 2000],
  pais: [2, 100],
} as const;

type FieldName = keyof typeof FIELDS;
type Lead = Record<FieldName, string>;

// Best-effort in-memory limiter. Serverless instances do not share memory,
// so this only slows down abuse; pair it with a Vercel WAF rate-limit rule.
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > RATE_LIMIT_MAX;
}

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host.split(",")[0].trim();
  } catch {
    return false;
  }
}

/** Removes control characters and neutralizes spreadsheet formulas. */
function clean(value: string): string {
  const text = value
    .normalize("NFKC")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim();
  return /^[=+\-@\t\r]/.test(text) ? `'${text}` : text;
}

function parseLead(input: unknown): Lead | null {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return null;
  const raw = input as Record<string, unknown>;

  // Honeypot: real users never fill this field.
  if (raw.website !== undefined && raw.website !== "") return null;

  const lead = {} as Lead;
  for (const [name, [min, max]] of Object.entries(FIELDS) as [FieldName, readonly [number, number]][]) {
    const value = raw[name];
    if (typeof value !== "string") return null;
    const cleaned = clean(value);
    if (cleaned.length < min || cleaned.length > max) return null;
    lead[name] = cleaned;
  }
  return lead;
}

function json(status: number, body: Record<string, unknown>) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return json(403, { ok: false, error: "forbidden" });
  }

  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return json(415, { ok: false, error: "unsupported_media_type" });
  }

  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (declaredLength > MAX_BODY_BYTES) {
    return json(413, { ok: false, error: "payload_too_large" });
  }

  if (isRateLimited(clientIp(request))) {
    return json(429, { ok: false, error: "too_many_requests" });
  }

  let body: unknown;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) {
      return json(413, { ok: false, error: "payload_too_large" });
    }
    body = JSON.parse(text);
  } catch {
    return json(400, { ok: false, error: "invalid_json" });
  }

  const lead = parseLead(body);
  if (!lead) {
    return json(400, { ok: false, error: "invalid_fields" });
  }

  const webhookUrl = process.env.COTIZACION_WEBHOOK_URL || FALLBACK_WEBHOOK_URL;

  try {
    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        ...lead,
        token: process.env.COTIZACION_WEBHOOK_SECRET ?? "",
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (!upstream.ok) {
      console.error("[cotizacion] upstream responded", upstream.status);
      return json(502, { ok: false, error: "upstream_error" });
    }
  } catch (error) {
    console.error("[cotizacion] upstream request failed", error);
    return json(502, { ok: false, error: "upstream_error" });
  }

  return json(200, { ok: true });
}
