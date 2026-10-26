import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getDictionary } from "@/lib/dictionary";
import { isLang, locales } from "@/lib/i18n";
import "../globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://maindsteel.mx";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === "en";

  const title = isEn
    ? "Maindsteel Robotics | Industrial automation and robotics"
    : "Maindsteel Robotics | Automatización industrial y robótica";
  const description = isEn
    ? "Machinery and technology for an evolving world. Industrial automation, robot integration and machinery sales in Aguascalientes, Mexico."
    : "Maquinaria y tecnología para un mundo en evolución. Automatización industrial, integración de robots y venta de maquinaria en Aguascalientes, México.";
  const keywords = isEn
    ? [
        "industrial automation",
        "industrial robotics",
        "robot integration",
        "CNC machinery",
        "Aguascalientes",
        "Mexico",
      ]
    : [
        "automatización industrial",
        "robótica industrial",
        "integración de robots",
        "maquinaria CNC",
        "Aguascalientes",
        "México",
      ];

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: "%s | Maindsteel Robotics",
    },
    description,
    applicationName: "Maindsteel Robotics",
    keywords,
    authors: [{ name: "Maindsteel Robotics", url: siteUrl }],
    creator: "Maindsteel Robotics",
    publisher: "Maindsteel Robotics",
    category: "technology",
    icons: {
      icon: [
        {
          url: "/icon-light-32x32.png",
          media: "(prefers-color-scheme: light)",
        },
        {
          url: "/icon-dark-32x32.png",
          media: "(prefers-color-scheme: dark)",
        },
        {
          url: "/icon.svg",
          type: "image/svg+xml",
        },
      ],
      apple: "/apple-icon.png",
    },
    openGraph: {
      type: "website",
      locale: isEn ? "en_US" : "es_MX",
      siteName: "Maindsteel Robotics",
      title,
      description,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Maindsteel Robotics — Automatización industrial y robótica",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#0b1c44",
  width: "device-width",
  initialScale: 1,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  name: "Maindsteel Robotics",
  url: siteUrl,
  logo: `${siteUrl}/images/logo-robotics-horizontal-blanco.png`,
  email: "contacto@maindsteel.mx",
  telephone: "+52 449 305 4098",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Municipio de Calvillo 103",
    postalCode: "20358",
    addressLocality: "Jesús María",
    addressRegion: "Aguascalientes",
    addressCountry: "MX",
  },
  areaServed: "México",
  description:
    "Automatización industrial, integración de robots y venta de maquinaria en Aguascalientes, México.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className="bg-background">
      <body className={`${montserrat.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <SiteHeader dict={dict.nav} lang={lang} />
        <main>{children}</main>
        <SiteFooter dict={dict.footer} lang={lang} />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
