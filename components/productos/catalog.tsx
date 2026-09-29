'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Filter } from 'lucide-react'
import { getProducts } from '@/lib/data'

export function Catalog({ lang = 'es' }: { lang?: 'es' | 'en' }) {
  const categoriesBase = ['All', 'Forklifts', 'Bending', 'Paneling', 'Robots'] as const
  const categoriesEs = ['Todo', 'Montacargas', 'Dobladoras', 'Paneladoras', 'Robots'] as const
  const categories = lang === 'en' ? categoriesBase : categoriesEs
  const [active, setActive] = useState<(typeof categoriesBase)[number] | (typeof categoriesEs)[number]>(lang === 'en' ? 'All' : 'Todo')

  const products = getProducts(lang)

  const visible =
    active === 'Todo' || active === 'All' ? products : products.filter((p) => p.category === active)

  return (
    <section className="bg-steel-light py-12 md:py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 lg:flex-row lg:gap-10">
        <aside className="h-fit w-full bg-navy px-6 py-6 lg:w-64 lg:shrink-0">
          <h2 className="text-center text-lg text-white">{lang === 'en' ? 'Categories' : 'Categorías'}</h2>
          <ul className="mt-5 flex flex-col gap-2">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  type="button"
                  onClick={() => setActive(cat)}
                  aria-pressed={active === cat}
                  className={
                    'w-full py-2 text-center text-base font-medium transition-colors ' +
                    (active === cat
                      ? 'bg-brick text-white'
                      : 'text-white/85 hover:bg-white/10 hover:text-white')
                  }
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-white/70">
            <span>{lang === 'en' ? 'Filter by category' : 'Filtro por categoría'}</span>
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
                className="flex flex-col bg-white shadow-lg shadow-navy-deep/15"
              >
                <div className="relative aspect-[4/3] w-full bg-steel-light">
                  <Image
                    src={product.image || '/placeholder.svg'}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="flex flex-1 flex-col items-center gap-4 px-5 py-6">
                  <h3 className="text-center text-base text-navy-deep">
                    {product.name}
                  </h3>
                  <div className="mt-auto flex w-full flex-col gap-3">
                    <Link
                      href={`/productos/${product.slug}`}
                      className="border-2 border-navy px-4 py-2.5 text-center text-sm font-bold text-navy-deep transition-colors hover:bg-navy hover:text-white"
                    >
                      {lang === 'en' ? 'View details' : 'Ver ficha técnica'}
                    </Link>
                    <Link
                      href="/cotizaciones/index.html"
                      className="bg-brick px-4 py-2.5 text-center text-sm font-bold tracking-wide text-white transition-colors hover:bg-brick/90"
                    >
                      {lang === 'en' ? 'QUOTE' : 'COTIZAR'}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
