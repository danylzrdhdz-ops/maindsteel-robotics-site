"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Filter } from "lucide-react";
import { getProducts } from "@/lib/data";
import { localePath } from "@/lib/i18n";

export function Catalog({ lang = "es" }: { lang?: "es" | "en" }) {
  const categoriesBase = [
    "All",
    "Forklifts",
    "Bending",
    "Paneling",
    "Robots",
  ] as const;
  const categoriesEs = [
    "Todo",
    "Montacargas",
    "Dobladoras",
    "Paneladoras",
    "Robots",
  ] as const;
  const categories = lang === "en" ? categoriesBase : categoriesEs;
  const [active, setActive] = useState<
    (typeof categoriesBase)[number] | (typeof categoriesEs)[number]
  >(lang === "en" ? "All" : "Todo");

  const products = getProducts(lang);

  const visible =
    active === "Todo" || active === "All"
      ? products
      : products.filter((p) => p.category === active);

  return (
    <section className="relative overflow-hidden bg-steel-light py-12 md:py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy-deep/10 to-transparent" />
      <div className="absolute -top-24 right-0 h-56 w-56 rounded-full bg-brick/5 blur-3xl" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-6 lg:flex-row lg:gap-10">
        <aside className="relative h-fit w-full overflow-hidden bg-navy px-6 py-6 shadow-[0_40px_80px_-60px_rgba(11,28,68,1)] ring-1 ring-white/5 lg:w-64 lg:shrink-0">
          <div className="absolute -top-16 right-0 h-32 w-32 rounded-full bg-brick/15 blur-3xl" />
          <h2 className="relative text-center text-lg text-white">
            {lang === "en" ? "Categories" : "Categorías"}
          </h2>
          <ul className="relative mt-5 flex flex-col gap-2">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  type="button"
                  onClick={() => setActive(cat)}
                  aria-pressed={active === cat}
                  className={
                    "w-full py-2 text-center text-base font-medium transition-colors " +
                    (active === cat
                      ? "bg-brick text-white"
                      : "text-white/85 hover:bg-white/10 hover:text-white")
                  }
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
          <div className="relative mt-6 flex items-center justify-center gap-2 text-xs text-white/70">
            <span>
              {lang === "en" ? "Filter by category" : "Filtro por categoría"}
            </span>
            <Filter className="size-4" aria-hidden="true" />
          </div>
        </aside>

        <div className="flex-1">
          <h2 className="mb-8 text-center text-3xl text-navy-deep md:text-4xl">
            {active}
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((product) => (
              <article
                key={product.slug}
                className="group flex flex-col overflow-hidden bg-white shadow-[0_30px_70px_-50px_rgba(11,28,68,0.9)] ring-1 ring-navy-deep/5 transition-shadow duration-300 hover:shadow-[0_40px_80px_-40px_rgba(11,28,68,0.8)]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-steel-light">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    quality={80}
                  />
                </div>
                <div className="flex flex-1 flex-col items-center gap-4 px-5 py-6">
                  <h3 className="text-center text-base text-navy-deep">
                    {product.name}
                  </h3>
                  <div className="mt-auto flex w-full flex-col gap-3">
                    <Link
                      href={localePath(lang, `/productos/${product.slug}`)}
                      className="border border-navy px-4 py-2.5 text-center text-sm font-bold text-navy-deep transition-colors hover:bg-navy hover:text-white"
                    >
                      {lang === "en" ? "View details" : "Ver ficha técnica"}
                    </Link>
                    <Link
                      href="/cotizaciones/index.html"
                      className="rounded-sm bg-brick px-4 py-2.5 text-center text-sm font-bold tracking-wide text-white transition-colors hover:bg-brick/90"
                    >
                      {lang === "en" ? "QUOTE" : "COTIZAR"}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
