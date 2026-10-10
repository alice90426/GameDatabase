import { researchAlternates } from "@/lib/research-language";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResearchDetail } from "@/components/research-detail";
import { getDictionary, isLocale } from "@/lib/i18n";
import {
  getPublishedResearchArticles,
  getResearchArticleBlocks,
  getResearchArticleBySlug
} from "@/lib/notion";
import { getResearchNeighbors } from "@/lib/research-related";
import type { Locale } from "@/types/game";

export const revalidate = 3600;
export const dynamicParams = true;

// Link previews (e.g. LinkedIn) want a description of at least ~100 characters.
function buildDescription(
  title: string,
  summary: string,
  fallback: string,
  siteDescription: string
) {
  const text = summary ? `${title}：${summary}` : `${title}：${fallback}`;
  return text.length >= 100 ? text : `${text} ${siteDescription}`;
}

function isValidDate(value: string) {
  return Boolean(value) && !Number.isNaN(new Date(value).getTime());
}

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = isLocale(localeParam) ? localeParam : "en";
  const article = await getResearchArticleBySlug(slug);
  const fallback = getDictionary(locale).research;

  if (!article) {
    return {
      title: fallback.title,
      description: fallback.intro
    };
  }

  return {
    title: article.title,
    description: buildDescription(
      article.title,
      article.summary,
      fallback.intro,
      getDictionary(locale).common.description
    ),
    authors: [{ name: "Javier Chiang" }],
    openGraph: {
      type: "article",
      authors: ["Javier Chiang"],
      ...(isValidDate(article.date) ? { publishedTime: new Date(article.date).toISOString() } : {}),
      images: article.cover ? [article.cover] : []
    },
    alternates: researchAlternates(article)
  };
}

export default async function ResearchArticlePage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;
  const locale = (isLocale(localeParam) ? localeParam : "en") as Locale;
  const article = await getResearchArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const [blocks, allArticles] = await Promise.all([
    getResearchArticleBlocks(article.id),
    getPublishedResearchArticles()
  ]);

  return (
    <ResearchDetail
      article={article}
      blocks={blocks}
      locale={locale}
      backHref={`/${locale}/research`}
      neighbors={getResearchNeighbors(article, allArticles)}
    />
  );
}
