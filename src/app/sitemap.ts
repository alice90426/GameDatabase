import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";

const routes = ["", "/games", "/research", "/services", "/about"];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `https://example.com/${locale}${route}`,
      lastModified: new Date("2026-05-25"),
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1 : 0.8
    }))
  );
}
