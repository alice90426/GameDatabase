import Image from "next/image";
import Link from "next/link";
import { FileText } from "lucide-react";
import { getDictionary } from "@/lib/i18n";
import type { ResearchArticle } from "@/lib/notion";
import type { Locale } from "@/types/game";

type ResearchListProps = {
  articles: ResearchArticle[];
  locale: Locale;
  pathPrefix: string;
};

export function ResearchList({
  articles,
  locale,
  pathPrefix
}: ResearchListProps) {
  const content = getDictionary(locale).research;

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
      </section>

      <section className="mx-auto mt-10 max-w-6xl">
        {articles.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                href={`${pathPrefix}/${article.slug}`}
              />
            ))}
          </div>
        ) : (
          <div className="rounded border border-white/10 bg-panel/75 p-8 text-slate-300">
            {content.empty}
          </div>
        )}
      </section>
    </div>
  );
}

function ArticleCard({
  article,
  href
}: {
  article: ResearchArticle;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group overflow-hidden rounded border border-white/10 bg-panel/75 transition hover:border-neon/50 hover:shadow-glow"
    >
      {article.cover ? (
        <div className="relative aspect-[16/8] border-b border-white/10 bg-void">
          <Image
            src={article.cover}
            alt={article.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            unoptimized
          />
        </div>
      ) : (
        <div className="grid aspect-[16/8] place-items-center border-b border-white/10 bg-void/80 text-neon">
          <FileText size={34} />
        </div>
      )}
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2">
          {article.category ? (
            <span className="rounded border border-neon/30 bg-neon/10 px-2.5 py-1 text-xs font-bold text-neon">
              {article.category}
            </span>
          ) : null}
          {article.date ? (
            <span className="text-xs font-bold text-slate-500">
              {formatDate(article.date)}
            </span>
          ) : null}
        </div>
        <h2 className="mt-4 text-xl font-black text-white transition group-hover:text-neon">
          {article.title}
        </h2>
        {article.summary ? (
          <p className="mt-3 line-clamp-3 leading-7 text-slate-300">
            {article.summary}
          </p>
        ) : null}
        {article.tags.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-semibold text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit"
  }).format(new Date(value));
}
