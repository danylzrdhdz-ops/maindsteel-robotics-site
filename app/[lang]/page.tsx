import { Hero } from "@/components/home/hero";
import { StatsBar } from "@/components/home/stats-bar";
import { ModelsCarousel } from "@/components/home/models-carousel";
import { MetricsSplit } from "@/components/home/metrics-split";
import { Clients } from "@/components/home/clients";

import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionary";
import { isLang } from "@/lib/i18n";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const dict = await getDictionary(lang);
  return (
    <>
      <Hero dict={dict.home.hero} lang={lang} />
      <StatsBar dict={dict.home.stats} />
      <ModelsCarousel dict={dict.home.models} lang={lang} />
      <MetricsSplit dict={dict.home.metrics} lang={lang} />
      <Clients />
    </>
  );
}
