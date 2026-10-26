import type { MetadataRoute } from "next";
import { getPosts, getProducts } from "@/lib/data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://maindsteel.mx";

const esUrl = (path: string) => `${siteUrl}${path}`;
const enUrl = (path: string) => `${siteUrl}/en${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/productos", priority: 0.9 },
    { path: "/servicios", priority: 0.9 },
    { path: "/nosotros", priority: 0.7 },
    { path: "/blog", priority: 0.8 },
    { path: "/contacto", priority: 0.8 },
  ];

  const pages = staticRoutes.map((route) => ({
    url: esUrl(route.path),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route.priority,
    alternates: {
      languages: {
        es: esUrl(route.path),
        en: enUrl(route.path),
      },
    },
  }));

  const products = getProducts("es").map((product) => {
    const path = `/productos/${product.slug}`;
    return {
      url: esUrl(path),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: {
          es: esUrl(path),
          en: enUrl(path),
        },
      },
    };
  });

  const posts = getPosts("es").map((post) => {
    const path = `/blog/${post.slug}`;
    return {
      url: esUrl(path),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: {
          es: esUrl(path),
          en: enUrl(path),
        },
      },
    };
  });

  return [...pages, ...products, ...posts];
}
