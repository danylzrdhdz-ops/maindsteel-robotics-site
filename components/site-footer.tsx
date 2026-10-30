import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/logo";
import { localePath, type Lang } from "@/lib/i18n";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/social-icons";

type FooterDict = {
  subtitle: string;
  legalTitle: string;
  sitemapTitle: string;
  contactTitle: string;
  legal: { label: string; href: string }[];
  sitemap: { label: string; href: string }[];
  address: string;
};

export function SiteFooter({
  dict,
  lang = "es",
}: {
  dict: FooterDict;
  lang?: Lang;
}) {
  return (
    <footer className="relative overflow-hidden bg-navy">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brick/10 blur-3xl" />
      <div className="relative mx-auto grid w-full max-w-[1200px] gap-12 px-6 py-16 md:grid-cols-3 md:px-10">
        <div>
          <Logo className="mb-5" />
          <p className="max-w-[16rem] text-justify-block text-sm font-bold leading-relaxed text-white">
            {dict.subtitle}
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-white hover:text-brick"
            >
              <LinkedinIcon className="h-6 w-6" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-white hover:text-brick"
            >
              <InstagramIcon className="h-6 w-6" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="text-white hover:text-brick"
            >
              <FacebookIcon className="h-6 w-6" />
            </a>
          </div>
          <div className="mt-6">
            <Image
              src="/images/certificaciones-bn.png"
              alt="Certificaciones"
              width={280}
              height={90}
              className="h-auto w-full max-w-[280px] opacity-90"
            />
          </div>
          <p className="mt-6 inline-block border-b-2 border-brick pb-1 text-sm font-bold text-white">
            {dict.legalTitle}
          </p>
          <ul className="mt-4 flex flex-col gap-3">
            {dict.legal.map((item) => (
              <li key={item.label}>
                <Link
                  href={localePath(lang, item.href)}
                  className="text-xs font-bold tracking-wide text-white hover:text-brick"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="inline-block border-b-2 border-brick pb-1 text-base font-bold tracking-wide text-white">
            {dict.sitemapTitle}
          </h2>
          <ul className="mt-5 flex flex-col gap-4">
            {dict.sitemap.map((item) => (
              <li key={item.label}>
                <Link
                  href={localePath(lang, item.href)}
                  className="text-sm font-semibold text-white hover:text-brick"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="inline-block border-b-2 border-brick pb-1 text-base font-bold tracking-wide text-white">
            {dict.contactTitle}
          </h2>
          <ul className="mt-6 flex flex-col gap-6">
            <li className="flex items-start gap-4">
              <MapPin
                className="mt-0.5 h-5 w-5 shrink-0 text-brick"
                aria-hidden="true"
              />
              <span className="text-justify-block text-sm font-bold leading-relaxed text-white">
                {dict.address}
              </span>
            </li>
            <li className="flex items-start gap-4">
              <Phone
                className="mt-0.5 h-5 w-5 shrink-0 text-brick"
                aria-hidden="true"
              />
              <a
                href="tel:+524493054098"
                className="text-sm font-bold text-white hover:text-brick"
              >
                449 305 4098
              </a>
            </li>
            <li className="flex items-start gap-4">
              <Mail
                className="mt-0.5 h-5 w-5 shrink-0 text-brick"
                aria-hidden="true"
              />
              <a
                href="mailto:contacto@maindsteel.mx"
                className="text-sm font-bold text-white hover:text-brick"
              >
                contacto@maindsteel.mx
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
