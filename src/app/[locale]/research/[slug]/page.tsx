import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResearchDetail } from "@/components/research-detail";
import { getDictionary, isLocale } from "@/lib/i18n";
import {
  getResearchArticleBlocks,
  getResearchArticleBySlug
} from "@/lib/notion";
import type { Locale } from "@/types/game";

export const revalidate = 3600;
export const dynamicParams = true;

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
    description: article.summary || fallback.intro,
    openGraph: {
      images: article.cover ? [article.cover] : []
    },
    alternates: {
      canonical: `/${locale}/research/${article.slug}`,
      languages: {
        "zh-Hant": `/zh/research/${article.slug}`,
        en: `/en/research/${article.slug}`
      }
    }
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

  const blocks = await getResearchArticleBlocks(article.id);

  return (
    <ResearchDetail
      article={article}
      blocks={blocks}
      locale={locale}
      backHref={`/${locale}/research`}
    />
  );
}
