import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionary";
import { CircleCheck } from "lucide-react";
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
    title: isEn ? "Services" : "Servicios",
    description: isEn
      ? "Industrial automation, robot integration, commercialization, machinery sales and specialized technical consulting."
      : "Automatización industrial, integración de robots, comercialización, venta de maquinaria y asesoría técnica especializada.",
  };
}

function CotizarButton({ text }: { text: string }) {
  return (
    <Link
      href="/cotizaciones/index.html"
      className="inline-block border-2 border-white px-6 py-3 text-sm font-bold tracking-wide text-white transition-colors hover:bg-white hover:text-navy-deep"
    >
      {text}
    </Link>
  );
}

type ServiceProps = {
  title: string;
  body: string;
  image: string;
  alt: string;
  reverse?: boolean;
  tone: "navy" | "brick";
  bold?: boolean;
  children?: React.ReactNode;
};

function Service({
  title,
  body,
  image,
  alt,
  reverse,
  tone,
  bold,
  children,
  quoteText,
}: ServiceProps & { quoteText?: string }) {
  return (
    <section
      className={
        "py-14 md:py-20 " + (tone === "navy" ? "bg-navy-deep" : "bg-brick")
      }
    >
      <div
        className={
          "mx-auto flex max-w-6xl flex-col gap-8 px-6 md:items-center md:gap-12 " +
          (reverse ? "md:flex-row-reverse" : "md:flex-row")
        }
      >
        <div className="flex-1">
          <h2 className="text-2xl text-balance text-white md:text-3xl">
            {title}
          </h2>
          <p
            className={
              "mt-5 text-sm leading-relaxed text-white/90 md:text-base " +
              (bold ? "font-bold" : "")
            }
          >
            {body}
          </p>
          {children}
          <div className="mt-8">
            <CotizarButton text={quoteText || "SOLICITAR COTIZACIÓN"} />
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full flex-1 md:max-w-md">
          <Image
            src={image || "/placeholder.svg"}
            alt={alt}
            fill
            sizes="(min-width: 768px) 40vw, 90vw"
            className="object-cover"
            quality={80}
          />
        </div>
      </div>
    </section>
  );
}

export default async function ServiciosPage({
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
        title={dict.servicios.heroTitle}
        image="/images/banner-servicios.png"
        alt="Línea de producción industrial con maquinaria y luces de planta"
        underline
      />

      <Service
        tone="navy"
        title={dict.servicios.services[0].title}
        body={dict.servicios.services[0].body}
        image="/images/servicio-automatizacion.png"
        alt="Ingeniero con casco blanco operando un panel HMI frente a robots industriales"
        quoteText={dict.servicios.quoteButton}
      >
        <ul className="mt-6 flex flex-col gap-3">
          {dict.servicios.services[0].list?.map((item: string) => (
            <li key={item} className="flex items-center gap-3">
              <CircleCheck
                className="size-6 shrink-0 text-white"
                aria-hidden="true"
              />
              <span className="text-sm font-bold text-white">{item}</span>
            </li>
          ))}
        </ul>
      </Service>

      <Service
        tone="brick"
        reverse
        title={dict.servicios.services[1].title}
        body={dict.servicios.services[1].body}
        image="/images/servicio-integracion.png"
        alt="Técnico ajustando el gripper de un robot colaborativo en taller industrial"
        quoteText={dict.servicios.quoteButton}
      >
        <div className="mt-8 inline-flex flex-col items-center bg-steel px-8 py-4 text-center">
          <span className="text-xs font-bold tracking-widest text-white">
            {dict.servicios.kpiGuarantee}
          </span>
          <span className="mt-1 text-2xl text-white md:text-3xl">
            99.8% UPTIME
          </span>
        </div>
      </Service>

      <Service
        tone="navy"
        title={dict.servicios.services[2].title}
        bold
        body={dict.servicios.services[2].body}
        image="/images/servicio-comercializacion.png"
        alt="Ejecutivos revisando una tableta dentro de un almacén industrial"
        quoteText={dict.servicios.quoteButton}
      >
        <div className="mt-8 flex flex-wrap gap-4">
          {["PROTOCOLOS ETHERCAT / SIL3", "LOGIC PLC-OPEN / HMI"].map((tag) => (
            <span
              key={tag}
              className="bg-steel px-6 py-4 text-center text-sm font-bold text-white"
            >
              {tag}
            </span>
          ))}
        </div>
      </Service>

      <Service
        tone="brick"
        reverse
        bold
        title={dict.servicios.services[3].title}
        body={dict.servicios.services[3].body}
        image="/images/servicio-venta.png"
        alt="Brazo robótico naranja en una línea de producción"
        quoteText={dict.servicios.quoteButton}
      />

      <Service
        tone="navy"
        bold
        title={dict.servicios.services[4].title}
        body={dict.servicios.services[4].body}
        image="/images/servicio-asesoria.png"
        alt="Dos técnicos con chalecos de seguridad revisando una laptop en planta"
        quoteText={dict.servicios.quoteButton}
      />
    </>
  );
}
