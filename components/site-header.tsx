"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, Search, ShoppingCart, X, Globe } from "lucide-react";
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
    <header className="sticky top-0 z-50 bg-navy/95 backdrop-blur supports-[backdrop-filter]:bg-navy/80">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="relative mx-auto flex h-16 w-full max-w-[1400px] items-center gap-4 px-4 md:px-6">
        <Link
          href={localePath(lang, "/")}
          aria-label="Maindsteel Robotics, ir al inicio"
        >
          <Logo />
        </Link>

        <nav
          aria-label="Navegación principal"
          className="ml-6 hidden items-center gap-6 lg:flex"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "border-b-2 pb-0.5 text-sm font-semibold transition-colors",
                isActive(item.href)
                  ? "border-brick text-brick"
                  : "border-transparent text-white hover:text-brick",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3 md:gap-4">
          <form
            role="search"
            onSubmit={(e) => e.preventDefault()}
            className="hidden items-center gap-2 rounded-full bg-muted/70 px-3 py-1.5 md:flex"
          >
            <Search className="h-3.5 w-3.5 text-navy-deep" aria-hidden="true" />
            <label htmlFor="site-search" className="sr-only">
              Buscar en el sitio
            </label>
            <input
              id="site-search"
              type="search"
              placeholder={dict?.search || "Buscar"}
              className="w-28 bg-transparent text-sm text-navy-deep placeholder:text-navy-deep/70 focus:outline-none lg:w-36"
            />
          </form>

          <button
            type="button"
            aria-label="Ver carrito de cotización"
            className="text-white transition-colors hover:text-brick"
          >
            <ShoppingCart className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Language Switcher */}
          <div className="hidden sm:flex items-center rounded-full bg-slate-800/50 p-1 border border-slate-700/50">
            <Globe className="w-4 h-4 text-slate-400 ml-1.5 mr-1" />
            <div className="flex items-center">
              <button
                onClick={() => switchLanguage("es")}
                className={cn(
                  "px-2 py-0.5 text-xs font-bold rounded-full transition-all cursor-pointer",
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
                  "px-2 py-0.5 text-xs font-bold rounded-full transition-all cursor-pointer",
                  lang === "en"
                    ? "bg-brick text-white shadow-sm"
                    : "text-slate-400 hover:text-white",
                )}
              >
                EN
              </button>
            </div>
          </div>

          <Link
            href="/cotizaciones/index.html"
            className="hidden bg-brick px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90 sm:inline-block"
          >
            {dict?.quoteButton || "Solicitar Cotización"}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="text-white lg:hidden"
          >
            {open ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
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

            {/* Mobile Language Switcher */}
            <li className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
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
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
