import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { getBloggerArticles } from "@/lib/blogger";
import { getPublishedResearchArticles } from "@/lib/notion";
import { siteUrl } from "@/lib/site";
import { tools } from "@/data/tools";

const routes = ["", "/games", "/tools", "/research", "/articles", "/services", "/about"];
const staticLastModified = new Date("2026-06-16");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [researchArticles, bloggerArticles] = await Promise.all([
    getPublishedResearchArticles(),
    getBloggerArticles()
  ]);

  const entries: MetadataRoute.Sitemap = [
    ...locales.flatMap((locale) =>
      routes.map((route) => ({
        url: `${siteUrl}/${locale}${route}`,
        lastModified: staticLastModified,
        changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
        priority: route === "" ? 1 : 0.8
      }))
    ),
    ...locales.flatMap((locale) =>
      tools.map((tool) => ({
        url: `${siteUrl}/${locale}/tools/${tool.slug}`,
        lastModified: new Date(tool.publishedAt),
        changeFrequency: "monthly" as const,
        priority: 0.7
      }))
    ),
    ...locales.flatMap((locale) =>
      researchArticles.map((article) => ({
        url: `${siteUrl}/${locale}/research/${article.slug}`,
        lastModified: article.date ? new Date(article.date) : staticLastModified,
        changeFrequency: "monthly" as const,
        priority: 0.65
      }))
    ),
    ...locales.flatMap((locale) =>
      bloggerArticles.map((article) => ({
        url: `${siteUrl}/${locale}/articles/${article.slug}`,
        lastModified: article.date ? new Date(article.date) : staticLastModified,
        changeFrequency: "monthly" as const,
        priority: 0.65
      }))
    )
  ];

  // Source feeds can contain repeated slugs; submit each canonical URL once.
  return Array.from(new Map(entries.map((entry) => [entry.url, entry])).values());
}
