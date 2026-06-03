import type { Metadata } from "next";
import { ArticleList } from "@/components/article-list";
import { getBloggerArticles } from "@/lib/blogger";
import { isLocale } from "@/lib/i18n";
import type { Locale } from "@/types/game";

export const revalidate = 86400;

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : "en";

  return {
    title: locale === "zh" ? "教學文章" : "Articles",
    description:
      locale === "zh"
        ? "從 Blogger 匯入的教學與長篇文章。"
        : "Blogger tutorials and long-form posts.",
    alternates: {
      canonical: `/${locale}/articles`,
      languages: {
        "zh-Hant": "/zh/articles",
        en: "/en/articles"
      }
    }
  };
}

export default async function LocalizedArticlesPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = (isLocale(localeParam) ? localeParam : "en") as Locale;
  const articles = await getBloggerArticles();

  return (
    <ArticleList
      articles={articles}
      locale={locale}
      pathPrefix={`/${locale}/articles`}
    />
  );
}
