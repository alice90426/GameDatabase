import Image from "next/image";
import Link from "next/link";
import { FileText } from "lucide-react";
import { researchLanguageTag } from "@/lib/research-language";
import type { ResearchArticle } from "@/lib/notion";
import type { Locale } from "@/types/game";

// Notes are written in one language only; flag them when the site language differs.
export function LanguageBadge({ article, locale }: { article: ResearchArticle; locale?: Locale }) {
  if (!locale || article.language === locale) {
    return null;
  }

  return (
    <span className="rounded border border-amber-300/40 bg-amber-300/10 px-2.5 py-1 text-xs font-bold text-amber-200">
      {article.language === "zh" ? "中文" : "EN"}
    </span>
  );
}

export function ArticleCard({
  article,
  href,
  locale
}: {
  article: ResearchArticle;
  href: string;
  locale?: Locale;
}) {
  return (
    <Link
      lang={researchLanguageTag(article.language)}
      href={href}
      className="group overflow-hidden rounded border border-white/10 bg-panel/75 transition hover:border-neon/50"
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
          <LanguageBadge article={article} locale={locale} />
          {article.category ? (
            <span className="rounded border border-neon/30 bg-neon/10 px-2.5 py-1 text-xs font-bold text-neon">
              {article.category}
            </span>
          ) : null}
          {article.date ? (
            <span className="text-xs font-bold text-slate-400">
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
