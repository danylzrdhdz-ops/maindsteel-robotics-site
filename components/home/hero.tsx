import Image from "next/image";
import Link from "next/link";
import { localePath, type Lang } from "@/lib/i18n";

export function Hero({ dict, lang = "es" }: { dict?: any; lang?: Lang }) {
  const t = dict || {
    title: "MAINDSTEEL ROBOTICS",
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
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/90 via-navy-deep/60 to-navy-deep/10" />

      <div className="relative mx-auto flex min-h-[560px] w-full max-w-[1400px] flex-col justify-center px-6 py-20 md:min-h-[680px] md:px-12">
        <div className="w-full max-w-5xl">
          <h1 className="max-w-[22ch] text-4xl leading-[0.98] text-balance text-white sm:text-6xl lg:text-7xl xl:text-8xl">
            {t.title}
          </h1>
          <p className="mt-6 max-w-[45ch] text-lg font-bold leading-relaxed text-white sm:text-xl md:text-2xl">
            {t.subtitle}
          </p>
          <div className="mt-10 grid w-full gap-4 sm:grid-cols-2">
            <Link
              href="/cotizaciones/index.html"
              className="rounded-full bg-brick px-8 py-4 text-center text-base font-bold text-white transition-opacity hover:opacity-90"
            >
              {t.requestQuote}
            </Link>
            <Link
              href={localePath(lang, "/servicios")}
              className="rounded-full border-2 border-white px-8 py-4 text-center text-base font-bold text-white transition-colors hover:bg-white hover:text-navy-deep"
            >
              {t.requestService}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
