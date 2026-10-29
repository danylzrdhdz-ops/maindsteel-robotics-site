"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X, Globe, Phone } from "lucide-react";
import { Logo } from "@/components/logo";
import { localePath, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const getNav = (dict: any, lang: Lang) => [
  { label: dict?.home || "Inicio", href: localePath(lang, "/") },
  {
    label: dict?.products || "Productos",
    href: localePath(lang, "/productos"),
  },
  {
    label: dict?.services || "Servicios",
    href: localePath(lang, "/servicios"),
  },
  { label: dict?.about || "Nosotros", href: localePath(lang, "/nosotros") },
  { label: dict?.blog || "Blog", href: localePath(lang, "/blog") },
  { label: dict?.contact || "Contacto", href: localePath(lang, "/contacto") },
];

const normalizePath = (path: string) =>
  path.replace(/^\/(?:es|en)(?=\/|$)/, "") || "/";

export function SiteHeader({
  dict,
  lang = "es",
}: {
  dict: any;
  lang: Lang;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const navItems = getNav(dict, lang);

  const switchLanguage = (targetLang: Lang) => {
    if (lang === targetLang) return;

    document.cookie = `x-lang=${targetLang}; path=/; max-age=31536000; samesite=lax`;

    setOpen(false);
    router.push(localePath(targetLang, normalizePath(pathname)));
  };

  const isActive = (href: string) => {
    const current = normalizePath(pathname);
    const target = normalizePath(href);
    return target === "/" ? current === "/" : current.startsWith(target);
  };

  return (
    <header className="sticky top-0 z-50 bg-navy">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="relative mx-auto grid h-[4.25rem] w-full max-w-[1400px] grid-cols-[auto_1fr_auto] items-center px-4 md:px-6 lg:px-8">
        <Link
          href={localePath(lang, "/")}
          aria-label="Maindsteel Robotics, ir al inicio"
          className="shrink-0 ml-1 md:ml-2 lg:ml-4"
        >
          <Logo />
        </Link>

        <nav
          aria-label="Navegación principal"
          className="hidden items-center justify-center gap-9 lg:flex"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "relative text-[0.95rem] font-semibold transition-colors after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:origin-center after:scale-x-0 after:bg-brick after:transition-transform after:duration-300 hover:after:scale-x-100",
                isActive(item.href)
                  ? "text-brick after:scale-x-100"
                  : "text-white hover:text-brick",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center justify-self-end lg:flex">
          <div className="flex items-center rounded-full bg-white/5 p-1 ring-1 ring-white/10">
            <button
              type="button"
              onClick={() => switchLanguage("es")}
              className={cn(
                "px-2.5 py-1 text-xs font-bold rounded-full transition-all cursor-pointer",
                lang === "es"
                  ? "bg-brick text-white shadow-sm"
                  : "text-white/70 hover:text-white",
              )}
              aria-pressed={lang === "es"}
            >
              ES
            </button>
            <button
              type="button"
              onClick={() => switchLanguage("en")}
              className={cn(
                "px-2.5 py-1 text-xs font-bold rounded-full transition-all cursor-pointer",
                lang === "en"
                  ? "bg-brick text-white shadow-sm"
                  : "text-white/70 hover:text-white",
              )}
              aria-pressed={lang === "en"}
            >
              EN
            </button>
          </div>
          <a
            href="tel:+524493054098"
            className="mx-2 flex h-9 w-9 items-center justify-center rounded-full bg-white text-navy shadow-lg transition-all hover:bg-white/90"
            aria-label="Llamar al 449 305 4098"
          >
            <Phone className="h-4 w-4" />
          </a>
          <Link
            href="/cotizaciones/index.html"
            className="rounded-full bg-brick px-6 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            {dict?.quoteButton || "Solicitar Cotización"}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="ml-auto text-white lg:hidden"
        >
          {open ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Navegación móvil"
          className="border-t border-white/10 bg-navy lg:hidden"
        >
          <ul className="mx-auto flex max-w-[1400px] flex-col px-4 py-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block py-3 text-sm font-semibold",
                    isActive(item.href) ? "text-brick" : "text-white",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {/* Mobile Phone + Language Switcher */}
            <li className="mt-4 pt-4 border-t border-white/10">
              <a
                href="tel:+524493054098"
                className="mb-3 flex items-center gap-2 text-sm font-semibold text-white"
              >
                <Phone className="w-4 h-4" /> 449 305 4098
              </a>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-white flex items-center gap-2">
                  <Globe className="w-4 h-4" /> {dict?.language || "Idioma"}
                </span>
                <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-full border border-slate-700">
                  <button
                    onClick={() => switchLanguage("es")}
                    className={cn(
                      "px-3 py-1 text-xs font-bold rounded-full transition-all cursor-pointer",
                      lang === "es"
                        ? "bg-brick text-white shadow-sm"
                        : "text-slate-400 hover:text-white",
                    )}
                  >
                    ES
                  </button>
                  <button
                    onClick={() => switchLanguage("en")}
                    className={cn(
                      "px-3 py-1 text-xs font-bold rounded-full transition-all cursor-pointer",
                      lang === "en"
                        ? "bg-brick text-white shadow-sm"
                        : "text-slate-400 hover:text-white",
                    )}
                  >
                    EN
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
