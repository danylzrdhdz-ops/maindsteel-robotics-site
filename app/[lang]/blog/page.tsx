import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { Portfolio } from "@/components/blog/portfolio";
import { getDictionary } from "@/lib/dictionary";
import { isLang } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === "en";
  return {
    title: "Blog",
    description: isEn
      ? "Articles and practical guides on industrial automation, robotics and advanced manufacturing."
      : "Artículos y guías prácticas sobre automatización industrial, robótica y manufactura avanzada.",
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <>
      <PageHero
        title={dict.blog.heroTitle}
        image="/images/banner-blog.webp"
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
              src="/images/ingenieria-aplicada.webp"
              alt="Detalle de maquinaria industrial con botón de paro de emergencia"
              fill
              sizes="(min-width: 768px) 45vw, 90vw"
              className=""

              style={{ objectFit: "contain" }}
              quality={80}
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
  );
}
