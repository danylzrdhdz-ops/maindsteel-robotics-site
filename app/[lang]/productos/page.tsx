import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { Catalog } from "@/components/productos/catalog";
import { isLang } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === "en";
  return {
    title: isEn ? "Products" : "Productos",
    description: isEn
      ? "High-engineering catalog: CNC machinery, grippers and industrial robots for Industry 4.0."
      : "Catálogo de alta ingeniería: maquinaria CNC, grippers y robots industriales para la industria 4.0.",
  };
}

export default async function ProductosPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <>
      <PageHero
        title={
          lang === "en"
            ? "HIGH ENGINEERING CATALOG"
            : "CATÁLOGO DE ALTA INGENIERIA"
        }
        subtitle={
          lang === "en"
            ? "Robotic solutions designed for Industry 4.0"
            : "Soluciones robóticas diseñadas para la industria 4.0"
        }
        image="/images/banner-productos.jpg"
        alt="Robot industrial ensamblando una carrocería en planta automotriz"
        underline
      />
      <Catalog lang={lang} />
    </>
  );
}
