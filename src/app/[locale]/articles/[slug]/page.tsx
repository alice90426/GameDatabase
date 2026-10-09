import { localizedAlternates } from "@/lib/seo";
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

// Link previews (e.g. LinkedIn) want a description of at least ~100 characters.
function buildDescription(title: string, summary: string, siteDescription: string) {
  const text = `${title}：${summary}`;
  return text.length >= 100 ? text : `${text} ${siteDescription}`;
}

function isValidDate(value: string) {
  return Boolean(value) && !Number.isNaN(new Date(value).getTime());
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
    description: buildDescription(
      article.title,
      article.labels.join(", ") || content.fallbackDescription,
      getDictionary(locale).common.description
    ),
    authors: [{ name: "Javier Chiang" }],
    openGraph: {
      type: "article",
      authors: ["Javier Chiang"],
      ...(isValidDate(article.date) ? { publishedTime: new Date(article.date).toISOString() } : {}),
      images: article.thumbnail ? [article.thumbnail] : []
    },
    alternates: localizedAlternates(locale, `/articles/${article.slug}`)
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
