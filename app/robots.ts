import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://maindsteel.mx";

export default function robots(): MetadataRoute.Robots {
  // Until the company approves the content, block every crawler.
  if (process.env.SITE_ALLOW_INDEXING !== "true") {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/login", "/en/login", "/api/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
