import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleDetail } from "@/components/article-detail";
import { getBloggerArticleBySlug } from "@/lib/blogger";
import { isLocale } from "@/lib/i18n";
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
  const article = await getBloggerArticleBySlug(slug);

  if (!article) {
    return {
      title: locale === "zh" ? "教學文章" : "Articles",
      description:
        locale === "zh"
          ? "從 Blogger 匯入的教學與長篇文章。"
          : "Blogger tutorials and long-form posts."
    };
  }

  return {
    title: article.title,
    description: article.labels.join(", ") || "Blogger article.",
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
