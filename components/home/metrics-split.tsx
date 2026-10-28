import Image from "next/image";
import Link from "next/link";
import { localePath, type Lang } from "@/lib/i18n";

type MetricsDict = {
  uptimeLabel: string;
  costLabel: string;
  question: string;
  readMore: string;
};

export function MetricsSplit({
  dict,
  lang = "es",
}: {
  dict: MetricsDict;
  lang?: Lang;
}) {
  return (
    <section className="relative overflow-hidden bg-navy">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-1 flex-col gap-5 px-6 py-14 md:px-12 lg:py-20">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="relative overflow-hidden bg-white/5 px-8 py-10 ring-1 ring-white/10">
              <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-brick/20 blur-3xl" />
              <p className="relative text-3xl font-extrabold text-brick md:text-4xl">
                99.9%
              </p>
              <p className="relative mt-3 text-sm font-bold text-white">
                {dict.uptimeLabel}
              </p>
            </div>
            <div className="relative overflow-hidden bg-white/5 px-8 py-10 ring-1 ring-white/10">
              <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-brick/15 blur-3xl" />
              <p className="relative text-3xl font-extrabold text-brick md:text-4xl">
                -40%
              </p>
              <p className="relative mt-3 text-sm font-bold text-white">
                {dict.costLabel}
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy px-8 py-10 ring-1 ring-white/10">
            <div className="absolute -left-16 top-0 h-32 w-32 rounded-full bg-brick/15 blur-3xl" />
            <p className="relative max-w-[36ch] text-justify-block text-base font-bold leading-relaxed text-white">
              {dict.question}
            </p>
            <Link
              href={localePath(lang, "/nosotros")}
              className="relative mt-6 inline-block rounded-full border border-white/60 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-navy-deep"
            >
              {dict.readMore}
            </Link>
          </div>
        </div>

        <div className="relative min-h-[280px] flex-1 lg:min-h-0">
          <Image
            src="/images/impresora-3d.png"
            alt="Detalle de un extrusor de impresión aditiva industrial en operación"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            quality={80}
          />
        </div>
      </div>
    </section>
  );
}
