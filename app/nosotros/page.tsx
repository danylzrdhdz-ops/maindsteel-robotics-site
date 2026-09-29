import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'

export const metadata: Metadata = {
  title: 'Nosotros',
  description:
    'Empresa comercializadora especializada en soluciones de automatización industrial y tecnologías de integración.',
}

import { cookies } from 'next/headers'
import { getDictionary } from '@/lib/dictionary'

export default async function NosotrosPage() {
  const cookieStore = await cookies()
  const lang = cookieStore.get('x-lang')?.value === 'en' ? 'en' : 'es'
  const dict = await getDictionary(lang)
  
  const blocks = dict.nosotros.blocks.map((block: any, idx: number) => ({
    ...block,
    tone: (idx % 2 === 0 ? 'steel' : 'brick') as 'steel' | 'brick',
    side: (idx % 2 === 0 ? 'left' : 'right') as 'left' | 'right',
  }))

  return (
    <>
      <PageHero
        title={dict.nosotros.heroTitle}
        image="/images/banner-nosotros.png"
        alt="Fila de robots de soldadura amarillos en una planta automotriz"
      />

      <section className="bg-navy-deep py-14 md:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 md:gap-16">
          {blocks.map((block) => (
            <article
              key={block.title}
              className={
                'w-full px-8 py-10 md:w-[55%] md:px-12 md:py-12 ' +
                (block.tone === 'steel' ? 'bg-steel' : 'bg-brick') +
                ' ' +
                (block.side === 'right' ? 'md:self-end' : 'md:self-start')
              }
            >
              <h2 className="text-center text-xl text-balance text-white md:text-2xl">
                {block.title}
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-white/95 md:text-base">
                {block.body}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
