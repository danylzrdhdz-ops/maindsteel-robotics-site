import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { isLang } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === "en";
  return {
    title: isEn ? "About us" : "Nosotros",
    description: isEn
      ? "A company specialized in industrial automation solutions and integration technologies."
      : "Empresa comercializadora especializada en soluciones de automatización industrial y tecnologías de integración.",
  };
}

import { getDictionary } from "@/lib/dictionary";

export default async function NosotrosPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const dict = await getDictionary(lang);

  const blocks = dict.nosotros.blocks.map((block: any, idx: number) => ({
    ...block,
    tone: (idx % 2 === 0 ? "steel" : "brick") as "steel" | "brick",
    side: (idx % 2 === 0 ? "left" : "right") as "left" | "right",
  }));

  return (
    <>
      <PageHero
        title={dict.nosotros.heroTitle}
        image="/images/banner-nosotros.jpg"
        alt="Fila de robots de soldadura amarillos en una planta automotriz"
      />

      <section className="bg-navy-deep py-14 md:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 md:gap-16">
          {blocks.map((block: (typeof blocks)[number]) => (
            <article
              key={block.title}
              className={
                "w-full px-8 py-10 md:w-[55%] md:px-12 md:py-12 " +
                (block.tone === "steel" ? "bg-steel" : "bg-brick") +
                " " +
                (block.side === "right" ? "md:self-end" : "md:self-start")
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
  );
}
