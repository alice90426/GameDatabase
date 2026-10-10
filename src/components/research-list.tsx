import { researchPath } from "@/lib/research-language";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArticleCard } from "@/components/research-card";
import { ResearchBrowser } from "@/components/research-browser";
import { getDictionary } from "@/lib/i18n";
import { pickFeaturedResearch } from "@/lib/research-featured";
import { localizedPath } from "@/lib/routes";
import type { ResearchArticle } from "@/lib/notion";
import type { Locale } from "@/types/game";

type ResearchListProps = {
  articles: ResearchArticle[];
  locale: Locale;
};

export function ResearchList({
  articles,
  locale
}: ResearchListProps) {
  const dictionary = getDictionary(locale);
  const content = dictionary.research;
  const featured = pickFeaturedResearch(articles);

  return (
    <div className="px-5 py-14 sm:py-16">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-neon">
          {content.eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-white sm:text-5xl">
          {content.title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
          {content.intro}
        </p>
        {articles.length > 0 ? (
          <p className="mt-4 text-sm font-bold text-slate-400">
            {articles.length} {content.notesCount}
          </p>
        ) : null}
      </section>

      {articles.length > 0 ? (
        <>
          <section className="mx-auto mt-10 max-w-6xl">
            <h2 className="text-2xl font-black text-white">{content.featuredTitle}</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {featured.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  href={researchPath(article)}
                />
              ))}
            </div>
          </section>

          <section className="mx-auto mt-14 max-w-6xl">
            <h2 className="mb-5 text-2xl font-black text-white">{content.allTitle}</h2>
            <ResearchBrowser articles={articles} locale={locale} />
          </section>
        </>
      ) : (
        <section className="mx-auto mt-10 max-w-6xl">
          <div className="rounded border border-white/10 bg-panel/75 p-8 text-slate-300">
            {content.empty}
          </div>
        </section>
      )}

      <section className="mx-auto mt-12 max-w-6xl border-t border-white/10 pt-8">
        <h2 className="text-lg font-black text-white">
          {dictionary.home.moreTitle}
        </h2>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          {[
            { href: localizedPath(locale, "/articles"), label: dictionary.nav.articles },
            { href: localizedPath(locale, "/tools"), label: dictionary.nav.tools }
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex h-12 items-center justify-between gap-3 rounded border border-white/10 px-5 text-sm font-bold text-slate-200 transition hover:border-neon/50 hover:text-white sm:min-w-52"
            >
              {item.label}
              <ArrowRight size={16} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
