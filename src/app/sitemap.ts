import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { getBloggerArticles } from "@/lib/blogger";
import { getPublishedResearchArticles } from "@/lib/notion";
import { siteUrl } from "@/lib/site";

const routes = ["", "/games", "/research", "/articles", "/services", "/about"];
const rootRoutes = ["/research", "/articles"];
const staticLastModified = new Date("2026-06-16");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [researchArticles, bloggerArticles] = await Promise.all([
    getPublishedResearchArticles(),
    getBloggerArticles()
  ]);

  return [
    ...locales.flatMap((locale) =>
      routes.map((route) => ({
        url: `${siteUrl}/${locale}${route}`,
        lastModified: staticLastModified,
        changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
        priority: route === "" ? 1 : 0.8
      }))
    ),
    ...rootRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: staticLastModified,
      changeFrequency: "daily" as const,
      priority: 0.7
    })),
    ...locales.flatMap((locale) =>
      researchArticles.map((article) => ({
        url: `${siteUrl}/${locale}/research/${article.slug}`,
        lastModified: article.date ? new Date(article.date) : staticLastModified,
        changeFrequency: "monthly" as const,
        priority: 0.65
      }))
    ),
    ...researchArticles.map((article) => ({
      url: `${siteUrl}/research/${article.slug}`,
      lastModified: article.date ? new Date(article.date) : staticLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.55
    })),
    ...locales.flatMap((locale) =>
      bloggerArticles.map((article) => ({
        url: `${siteUrl}/${locale}/articles/${article.slug}`,
        lastModified: article.date ? new Date(article.date) : staticLastModified,
        changeFrequency: "monthly" as const,
        priority: 0.65
      }))
    ),
    ...bloggerArticles.map((article) => ({
      url: `${siteUrl}/articles/${article.slug}`,
      lastModified: article.date ? new Date(article.date) : staticLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.55
    }))
  ];
}
