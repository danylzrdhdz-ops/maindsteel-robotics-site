export type Lang = "es" | "en";

export const locales: Lang[] = ["es", "en"];
export const defaultLocale: Lang = "es";

export function isLang(value: string): value is Lang {
  return value === "es" || value === "en";
}

export function localePath(lang: Lang, path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (lang !== "en") return normalized;
  return normalized === "/" ? "/en" : `/en${normalized}`;
}
