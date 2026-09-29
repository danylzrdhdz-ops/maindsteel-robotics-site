import { Hero } from '@/components/home/hero'
import { StatsBar } from '@/components/home/stats-bar'
import { ModelsCarousel } from '@/components/home/models-carousel'
import { MetricsSplit } from '@/components/home/metrics-split'
import { Clients } from '@/components/home/clients'

import { cookies } from 'next/headers'
import { getDictionary } from '@/lib/dictionary'

export default async function HomePage() {
  const cookieStore = await cookies()
  const lang = cookieStore.get('x-lang')?.value === 'en' ? 'en' : 'es'
  const dict = await getDictionary(lang)
  return (
    <>
      <Hero dict={dict.home.hero} />
      <StatsBar dict={dict.home.stats} />
      <ModelsCarousel dict={dict.home.models} lang={lang} />
      <MetricsSplit dict={dict.home.metrics} />
      <Clients dict={dict.home.clients} />
    </>
  )
}
