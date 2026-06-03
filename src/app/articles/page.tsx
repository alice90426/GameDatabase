import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { ArticleList } from "@/components/article-list";
import { getBloggerArticles } from "@/lib/blogger";
import { getDictionary } from "@/lib/i18n";

export const revalidate = 86400;

const locale = "en";
const articleCopy = getDictionary(locale).articles;

export const metadata: Metadata = {
  title: articleCopy.title,
  description: articleCopy.description
};

export default async function ArticlesPage() {
  const articles = await getBloggerArticles();
  const dictionary = getDictionary(locale);

  return (
    <div className="min-h-screen overflow-hidden">
      <div className="noise-overlay pointer-events-none fixed inset-0 opacity-70" />
      <Navbar locale={locale} />
      <main className="relative z-10">
        <ArticleList articles={articles} locale={locale} pathPrefix="/articles" />
      </main>
      <footer className="relative z-10 border-t border-white/10 px-5 py-8 text-center text-sm text-slate-500">
        {dictionary.common.footer}
      </footer>
    </div>
  );
}
