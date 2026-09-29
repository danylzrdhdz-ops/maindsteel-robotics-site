import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { Catalog } from '@/components/productos/catalog'

import { cookies } from 'next/headers'

export const metadata: Metadata = {
  title: 'Productos',
  description:
    'Catálogo de alta ingeniería: maquinaria CNC, grippers y robots industriales para la industria 4.0.',
}

export default async function ProductosPage() {
  const cookieStore = await cookies()
  const lang = cookieStore.get('x-lang')?.value === 'en' ? 'en' : 'es'

  return (
    <>
      <PageHero
        title={lang === 'en' ? 'HIGH ENGINEERING CATALOG' : 'CATÁLOGO DE ALTA INGENIERIA'}
        subtitle={lang === 'en' ? 'Robotic solutions designed for Industry 4.0' : 'Soluciones robóticas diseñadas para la industria 4.0'}
        image="/images/banner-productos.png"
        alt="Robot industrial ensamblando una carrocería en planta automotriz"
        underline
      />
      <Catalog lang={lang} />
    </>
  )
}
