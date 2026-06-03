import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { ResearchDetail } from "@/components/research-detail";
import { getDictionary } from "@/lib/i18n";
import {
  getPublishedResearchArticles,
  getResearchArticleBlocks,
  getResearchArticleBySlug
} from "@/lib/notion";

export const revalidate = 3600;

const locale = "en";

export async function generateStaticParams() {
  const articles = await getPublishedResearchArticles();

  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
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
      canonical: `/research/${article.slug}`
    }
  };
}

export default async function ResearchArticleEntryPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getResearchArticleBySlug(slug);
  const dictionary = getDictionary(locale);

  if (!article) {
    notFound();
  }

  const blocks = await getResearchArticleBlocks(article.id);

  return (
    <div className="min-h-screen overflow-hidden">
      <div className="noise-overlay pointer-events-none fixed inset-0 opacity-70" />
      <Navbar locale={locale} />
      <main className="relative z-10">
        <ResearchDetail
          article={article}
          blocks={blocks}
          locale={locale}
          backHref="/research"
        />
      </main>
      <footer className="relative z-10 border-t border-white/10 px-5 py-8 text-center text-sm text-slate-500">
        {dictionary.common.footer}
      </footer>
    </div>
  );
}
