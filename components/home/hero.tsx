import Image from "next/image";
import Link from "next/link";
import { localePath, type Lang } from "@/lib/i18n";

export function Hero({ dict, lang = "es" }: { dict?: any; lang?: Lang }) {
  const t = dict || {
    title: "MAINDSTEEL ROBOTICS",
    eyebrow: "Automatización y robótica industrial",
    subtitle: "Maquinaria y tecnología para un mundo en evolución.",
    requestQuote: "Solicitar Cotización",
    requestService: "Solicitar un servicio",
  };

  return (
    <section className="relative overflow-hidden">
      <Image
        src="/images/hero-robot.png"
        alt="Brazo robótico industrial naranja operando en una planta automatizada"
        fill
        preload
        sizes="100vw"
        className="object-cover"
        quality={80}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/80 via-navy-deep/45 to-navy-deep/85" />

      <div className="relative mx-auto flex min-h-[560px] w-full max-w-[1400px] flex-col items-center justify-center px-6 py-20 text-center md:min-h-[660px] md:px-12">
        <div className="flex w-full max-w-5xl flex-col items-center">
          {t.eyebrow && (
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm sm:text-xs">
              <span className="size-1.5 rounded-full bg-brick" aria-hidden="true" />
              {t.eyebrow}
            </span>
          )}
          <h1 className="text-4xl leading-[1.05] text-balance text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            {t.title}
          </h1>
          <p className="mt-5 max-w-[36ch] text-lg font-bold leading-relaxed text-white md:max-w-[42ch] md:text-xl">
            {t.subtitle}
          </p>
          <div className="mt-9 grid w-full max-w-4xl gap-4 sm:grid-cols-2">
            <Link
              href="/cotizaciones/index.html"
              className="w-full rounded-full bg-brick px-8 py-4 text-center text-base font-bold text-white transition-opacity hover:opacity-90"
            >
              {t.requestQuote}
            </Link>
            <Link
              href={localePath(lang, "/servicios")}
              className="w-full rounded-full border-2 border-white px-8 py-4 text-center text-base font-bold text-white transition-colors hover:bg-white hover:text-navy-deep"
            >
              {t.requestService}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
