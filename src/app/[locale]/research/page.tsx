import type { Metadata } from "next";
import { ResearchList } from "@/components/research-list";
import { getDictionary, isLocale } from "@/lib/i18n";
import { getPublishedResearchArticles } from "@/lib/notion";
import type { Locale } from "@/types/game";

export const revalidate = 3600;

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : "en";
  const content = getDictionary(locale).research;

  return {
    title: content.title,
    description: content.intro,
    alternates: {
      canonical: `/${locale}/research`,
      languages: {
        "zh-Hant": "/zh/research",
        en: "/en/research"
      }
    }
  };
}

export default async function ResearchPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = (isLocale(localeParam) ? localeParam : "en") as Locale;
  const articles = await getPublishedResearchArticles();

  return (
    <ResearchList
      articles={articles}
      locale={locale}
      pathPrefix={`/${locale}/research`}
    />
  );
}
