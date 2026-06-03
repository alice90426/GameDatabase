import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleDetail } from "@/components/article-detail";
import { getBloggerArticleBySlug } from "@/lib/blogger";
import { getDictionary, isLocale } from "@/lib/i18n";
import type { Locale } from "@/types/game";

export const revalidate = 86400;
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
  const content = getDictionary(locale).articles;
  const article = await getBloggerArticleBySlug(slug);

  if (!article) {
    return {
      title: content.title,
      description: content.description
    };
  }

  return {
    title: article.title,
    description: article.labels.join(", ") || content.fallbackDescription,
    openGraph: {
      images: article.thumbnail ? [article.thumbnail] : []
    },
    alternates: {
      canonical: `/${locale}/articles/${article.slug}`,
      languages: {
        "zh-Hant": `/zh/articles/${article.slug}`,
        en: `/en/articles/${article.slug}`
      }
    }
  };
}

export default async function LocalizedArticleDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;
  const locale = (isLocale(localeParam) ? localeParam : "en") as Locale;
  const article = await getBloggerArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <ArticleDetail
      article={article}
      locale={locale}
      backHref={`/${locale}/articles`}
    />
  );
}
