import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { ArticleDetail } from "@/components/article-detail";
import { getBloggerArticleBySlug } from "@/lib/blogger";
import { getDictionary } from "@/lib/i18n";

export const revalidate = 86400;
export const dynamicParams = true;

const locale = "en";

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getBloggerArticleBySlug(slug);

  if (!article) {
    return {
      title: "Articles",
      description: "Blogger tutorials and long-form posts."
    };
  }

  return {
    title: article.title,
    description: article.labels.join(", ") || "Blogger article.",
    openGraph: {
      images: article.thumbnail ? [article.thumbnail] : []
    },
    alternates: {
      canonical: `/articles/${article.slug}`
    }
  };
}

export default async function ArticleDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getBloggerArticleBySlug(slug);
  const dictionary = getDictionary(locale);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen overflow-hidden">
      <div className="noise-overlay pointer-events-none fixed inset-0 opacity-70" />
      <Navbar locale={locale} />
      <main className="relative z-10">
        <ArticleDetail article={article} locale={locale} backHref="/articles" />
      </main>
      <footer className="relative z-10 border-t border-white/10 px-5 py-8 text-center text-sm text-slate-500">
        {dictionary.common.footer}
      </footer>
    </div>
  );
}
