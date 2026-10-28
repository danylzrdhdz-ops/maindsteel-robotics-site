import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contacto/contact-form";
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
    title: isEn ? "Contact" : "Contacto",
    description: isEn
      ? "Connect with our engineers. Municipio de Calvillo 103, Jesús María, Aguascalientes. Tel. 449 305 4098."
      : "Conecte con nuestros ingenieros. Municipio de Calvillo 103, Jesús María, Aguascalientes. Tel. 449 305 4098.",
  };
}

export default async function ContactoPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const dict = await getDictionary(lang);

  const details = [
    {
      icon: MapPin,
      label: dict.contacto.addressLabel,
      value: "Municipio de Calvillo 103, 20358 Jesús María, Aguascalientes",
    },
    { icon: Phone, label: dict.contacto.phoneLabel, value: "449 305 4098" },
    {
      icon: Mail,
      label: dict.contacto.emailLabel,
      value: "contacto@maindsteel.mx",
    },
  ];

  return (
    <>
      <PageHero
        title={dict.contacto.heroTitle}
        image="/images/banner-servicios.png"
        alt="Instalaciones industriales de Maindsteel Robotics"
      />
      <section className="bg-navy-deep py-12 md:py-16">
        <div className="mx-auto grid max-w-6xl px-6 md:grid-cols-2 md:px-8">
          <div className="bg-navy px-8 py-12 md:px-12 md:py-16">
            <h1 className="text-2xl uppercase text-balance text-white md:text-3xl">
              {dict.contacto.heroTitle}
            </h1>

            <ul className="mt-10 flex flex-col gap-8">
              {details.map((detail) => (
                <li key={detail.label} className="flex flex-col gap-1">
                  <span className="pl-10 text-xs font-bold text-white/70">
                    {detail.label}
                  </span>
                  <div className="flex items-start gap-4">
                    <detail.icon
                      className="mt-0.5 size-6 shrink-0 text-brick"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-bold leading-relaxed text-white">
                      {detail.value}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-12 text-sm font-bold uppercase leading-relaxed text-white">
              {dict.contacto.tagline}
            </p>
          </div>

          <div className="flex items-center bg-steel-light px-6 py-12 md:px-10">
            <div className="w-full">
              <ContactForm dict={dict.contacto.form} />
            </div>
          </div>
        </div>
      </section>

      <div className="bg-navy-deep py-6 text-center shadow-[inset_0_4px_10px_rgba(0,0,0,0.1)]">
        <p className="text-xl font-bold tracking-[0.35em] text-white/40 md:text-2xl">
          {dict.contacto.tagline}
        </p>
      </div>
    </>
  );
}
