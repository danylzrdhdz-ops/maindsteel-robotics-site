import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CircleArrowLeft, Download } from "lucide-react";
import { getProducts } from "@/lib/data";
import { isLang, localePath, type Lang } from "@/lib/i18n";

export function generateStaticParams() {
  const products = getProducts("es");
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang: rawLang, slug } = await params;
  const lang: Lang = isLang(rawLang) ? rawLang : "es";
  const products = getProducts(lang);
  const product = products.find((p) => p.slug === slug);
  if (!product)
    return { title: lang === "en" ? "Product not found" : "Producto no encontrado" };
  return {
    title: product.title,
    description:
      lang === "en"
        ? `Technical datasheet for ${product.name} — ${product.title}.`
        : `Ficha técnica de ${product.name} — ${product.title}.`,
  };
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: rawLang, slug } = await params;
  if (!isLang(rawLang)) notFound();
  const lang: Lang = rawLang;

  const products = getProducts(lang);
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  return (
    <section className="bg-white py-10 md:py-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-14">
        <div className="flex flex-col gap-4">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-steel-light shadow-[0_40px_80px_-60px_rgba(11,28,68,0.9)] ring-1 ring-navy-deep/5">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              preload
              sizes="(min-width: 1024px) 340px, 90vw"
              className="object-cover"
              quality={80}
            />
          </div>
          <a
            href={product.image || "#"}
            download
            className="flex items-center justify-center gap-3 bg-brick px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brick/90"
          >
            Descargar ficha técnica
            <Download className="size-4" aria-hidden="true" />
          </a>
          <Link
            href="/cotizaciones/index.html"
            className="border-2 border-navy px-5 py-3 text-center text-base font-bold text-navy-deep transition-colors hover:bg-navy hover:text-white"
          >
            Solicitar cotización
          </Link>
        </div>

        <div>
          <h1 className="text-2xl uppercase text-navy-deep md:text-3xl">
            {product.title}
          </h1>

          <table className="mt-6 w-full table-fixed border-collapse text-navy-deep">
            <caption className="sr-only">
              Especificaciones técnicas de {product.name}
            </caption>
            <tbody>
              {product.specs.map((spec) => (
                <tr key={spec.label}>
                  <th
                    scope="row"
                    className="border border-navy-deep/25 px-4 py-5 text-center text-sm font-normal leading-relaxed"
                  >
                    {spec.label}
                  </th>
                  <td className="border border-navy-deep/25 px-4 py-5 text-center text-sm leading-relaxed">
                    {spec.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-8 flex justify-center">
            <Link
              href={localePath(lang, "/productos")}
              className="flex items-center gap-3 text-xl font-bold text-navy-deep transition-opacity hover:opacity-70"
            >
              <CircleArrowLeft className="size-8" aria-hidden="true" />
              Regresar
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
