import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";

const routes = ["", "/games", "/research", "/articles", "/services", "/about"];
const rootRoutes = ["/articles"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...locales.flatMap((locale) =>
      routes.map((route) => ({
        url: `https://example.com/${locale}${route}`,
        lastModified: new Date("2026-05-25"),
        changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
        priority: route === "" ? 1 : 0.8
      }))
    ),
    ...rootRoutes.map((route) => ({
      url: `https://example.com${route}`,
      lastModified: new Date("2026-05-25"),
      changeFrequency: "daily" as const,
      priority: 0.7
    }))
  ];
}
