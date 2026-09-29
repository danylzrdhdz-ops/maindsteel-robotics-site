import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHero } from '@/components/page-hero'
import { Portfolio } from '@/components/blog/portfolio'
import { cookies } from 'next/headers'
import { getDictionary } from '@/lib/dictionary'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Artículos y guías prácticas sobre automatización industrial, robótica y manufactura avanzada.',
}

const kpis = [
  { value: '99.8%', label: 'UPTIME GARANTIZADO' },
  { value: '-75%', label: 'TIEMPOS DE CICLO' },
  { value: '+50%', label: 'PRODUCTIVIDAD NETA' },
]

export default async function BlogPage() {
  const cookieStore = await cookies()
  const lang = cookieStore.get('x-lang')?.value === 'en' ? 'en' : 'es'
  const dict = await getDictionary(lang)

  return (
    <>
      <PageHero
        title={dict.blog.heroTitle}
        image="/images/banner-blog.png"
        alt="Exposición de robots industriales en una nave de manufactura"
        size="sm"
      />

      <section className="bg-steel py-10">
        <ul className="mx-auto flex max-w-6xl flex-col gap-8 px-6 text-center sm:flex-row sm:justify-between">
          {dict.blog.kpis.map((kpi: any) => (
            <li key={kpi.label} className="flex-1">
              <p className="text-3xl text-brick md:text-4xl">{kpi.value}</p>
              <p className="mt-2 text-xs font-bold tracking-wide text-white md:text-sm">
                {kpi.label}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <Portfolio dict={dict.blog.portfolio} lang={lang} />

      <section className="bg-navy-deep py-14 md:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 md:flex-row md:items-center md:gap-14">
          <div className="relative aspect-[4/3] w-full flex-1">
            <Image
              src="/images/ingenieria-aplicada.png"
              alt="Detalle de maquinaria industrial con botón de paro de emergencia"
              fill
              sizes="(min-width: 768px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold tracking-[0.2em] text-brick">
              {dict.blog.appliedEngineering.tag}
            </p>
            <h2 className="mt-4 text-2xl text-balance uppercase text-white md:text-4xl">
              {dict.blog.appliedEngineering.title}
            </h2>
            <blockquote className="mt-10 border-l-4 border-brick pl-5">
              <p className="text-base font-bold uppercase text-white md:text-lg">
                {dict.blog.appliedEngineering.quote}
              </p>
            </blockquote>
          </div>
        </div>
      </section>
    </>
  )
}
