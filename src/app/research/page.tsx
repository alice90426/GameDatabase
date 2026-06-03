import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { ResearchList } from "@/components/research-list";
import { getDictionary } from "@/lib/i18n";
import { getPublishedResearchArticles } from "@/lib/notion";

export const revalidate = 3600;

const locale = "en";

export async function generateMetadata(): Promise<Metadata> {
  const content = getDictionary(locale).research;

  return {
    title: content.title,
    description: content.intro,
    alternates: {
      canonical: "/research"
    }
  };
}

export default async function ResearchEntryPage() {
  const articles = await getPublishedResearchArticles();
  const dictionary = getDictionary(locale);

  return (
    <div className="min-h-screen overflow-hidden">
      <div className="noise-overlay pointer-events-none fixed inset-0 opacity-70" />
      <Navbar locale={locale} />
      <main className="relative z-10">
        <ResearchList articles={articles} locale={locale} pathPrefix="/research" />
      </main>
      <footer className="relative z-10 border-t border-white/10 px-5 py-8 text-center text-sm text-slate-500">
        {dictionary.common.footer}
      </footer>
    </div>
  );
}
