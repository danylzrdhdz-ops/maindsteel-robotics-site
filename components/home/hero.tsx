import Image from 'next/image'
import Link from 'next/link'

export function Hero({ dict }: { dict?: any }) {
  const t = dict || {
    title: 'MAINDSTEEL ROBOTICS',
    subtitle: 'Maquinaria y tecnología para un mundo en evolución.',
    requestQuote: 'Solicitar Cotización',
    requestService: 'Solicitar un servicio'
  }

  return (
    <section className="relative overflow-hidden">
      <Image
        src="/images/hero-robot.png"
        alt="Brazo robótico industrial naranja operando en una planta automatizada"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/90 via-navy-deep/60 to-navy-deep/10" />

      <div className="relative mx-auto flex min-h-[520px] w-full max-w-[1400px] flex-col justify-center px-6 py-20 md:min-h-[600px] md:px-12">
        <h1 className="max-w-[16ch] text-4xl leading-[1.05] text-balance text-white md:text-6xl">
          {t.title}
        </h1>
        <p className="mt-5 max-w-[28ch] text-lg font-bold leading-relaxed text-white md:text-xl">
          {t.subtitle}
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:max-w-xs">
          <Link
            href="/cotizaciones/index.html"
            className="rounded-full bg-brick px-8 py-3 text-center text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            {t.requestQuote}
          </Link>
          <Link
            href="/servicios"
            className="rounded-full border-2 border-white px-8 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-white hover:text-navy-deep"
          >
            {t.requestService}
          </Link>
        </div>
      </div>
    </section>
  )
}
