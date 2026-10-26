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
    <section className="bg-navy">
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-1 flex-col gap-5 px-6 py-14 md:px-12 lg:py-20">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="bg-white/10 px-8 py-10">
              <p className="text-3xl font-extrabold text-brick md:text-4xl">
                99.9%
              </p>
              <p className="mt-3 text-sm font-bold text-white">
                {dict.uptimeLabel}
              </p>
            </div>
            <div className="bg-white/10 px-8 py-10">
              <p className="text-3xl font-extrabold text-brick md:text-4xl">
                -40%
              </p>
              <p className="mt-3 text-sm font-bold text-white">
                {dict.costLabel}
              </p>
            </div>
          </div>

          <div className="bg-navy-deep px-8 py-10">
            <p className="max-w-[36ch] text-justify-block text-base font-bold leading-relaxed text-white">
              {dict.question}
            </p>
            <Link
              href={localePath(lang, "/nosotros")}
              className="mt-6 inline-block border border-white/60 px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-navy-deep"
            >
              {dict.readMore}
            </Link>
          </div>
        </div>

        <div className="relative min-h-[280px] flex-1 lg:min-h-0">
          <Image
            src="/images/impresora-3d.webp"
            alt="Detalle de un extrusor de impresión aditiva industrial en operación"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className=""

            style={{ objectFit: "contain" }}
            quality={80}
          />
        </div>
      </div>
    </section>
  );
}
