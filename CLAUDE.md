@AGENTS.md

# Reglas de seguridad web (obligatorias)

Estas reglas aplican a todo cambio en este repositorio. Si una tarea entra en conflicto con ellas, detente y pregunta antes de continuar.

## Secretos
- Nunca leas, imprimas, copies ni hagas commit de `.env*`, `*.pem`, `*.key`, carpetas `secrets/` ni `.vercel/`.
- Cero secretos en el frontend: nada de API keys, tokens, URLs de webhooks privados ni credenciales en componentes `"use client"`, en el sub-proyecto Vite (`maindsteel-robotics---terminal-b2b/`) ni en `public/`.
- Solo las variables `NEXT_PUBLIC_*` llegan al navegador; jamás pongas un secreto en una variable `NEXT_PUBLIC_*` ni en `import.meta.env.VITE_*`.
- Los secretos viven en variables de entorno de Vercel y se leen únicamente en código de servidor (Route Handlers, Server Actions, Server Components).

## Validación de entradas
- Todo dato que venga del usuario (formularios, chat, query params, `params` de rutas, cookies, headers) es no confiable.
- Valida en el servidor con un esquema estricto (tipo, longitud máxima, formato, lista permitida). La validación en el cliente es solo UX, no seguridad.
- No uses `dangerouslySetInnerHTML`, `innerHTML`, `eval` ni `new Function` con datos del usuario. Los únicos usos permitidos son JSON-LD generado desde datos estáticos y SVG generado por la librería `qrcode` con valores constantes.
- Al enviar datos a hojas de cálculo (Google Sheets) neutraliza fórmulas: prefija con `'` cualquier valor que empiece con `=`, `+`, `-`, `@`, tab o retorno de carro.
- Consultas a base de datos siempre parametrizadas; nunca concatenar strings en SQL.

## Backend y permisos
- Todo endpoint (`app/api/**`, Server Actions, webhooks) debe verificar autenticación y autorización en el servidor en cada petición; nunca confíes en datos de rol o ID enviados por el cliente (evita IDOR).
- Si se agrega base de datos (p. ej. Supabase), RLS activado en todas las tablas antes de exponerlas.
- Endpoints públicos (contacto, cotizaciones) requieren rate limiting y protección anti-bots (honeypot/CAPTCHA) del lado del servidor.
- Los formularios no deben aparentar autenticación si no existe backend real de login.

## Cabeceras, cookies y CORS
- Mantén las cabeceras de seguridad de `vercel.json` / `next.config.mjs` (HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) y agrega/conserva una Content-Security-Policy.
- Nunca uses `Access-Control-Allow-Origin: *` en endpoints con datos o efectos secundarios.
- Cookies de sesión: `HttpOnly`, `Secure`, `SameSite=Lax` o `Strict`.

## Dependencias
- No agregues dependencias sin justificarlo. Ejecuta `npm audit` tras cualquier cambio en `package.json` y no introduzcas versiones con vulnerabilidades Críticas/Altas conocidas.
- Herramientas CLI (p. ej. `shadcn`) van en `devDependencies`, no en `dependencies`.

## Archivos públicos
- Todo lo que está en `public/` es descargable por cualquiera. No dejes ahí builds viejos, mapas de fuente, respaldos (`*.bak`) ni documentos internos.
