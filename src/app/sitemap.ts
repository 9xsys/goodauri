import type { MetadataRoute } from "next";
import { siteConfig } from "@/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return siteConfig.locales.map((locale) => ({
    url: `${siteConfig.siteUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: locale === siteConfig.defaultLocale ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        siteConfig.locales.map((loc) => [loc, `${siteConfig.siteUrl}/${loc}`])
      ),
    },
  }));
}
