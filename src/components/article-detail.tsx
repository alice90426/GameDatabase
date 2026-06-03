import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ArticlePost } from "@/lib/blogger";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/types/game";

type ArticleDetailProps = {
  article: ArticlePost;
  locale: Locale;
  backHref: string;
};

export function ArticleDetail({ article, locale, backHref }: ArticleDetailProps) {
  const content = selectLocalizedContent(article.content, locale);
  const articleCopy = getDictionary(locale).articles;

  return (
    <article className="px-5 py-12 sm:py-14">
      <div className="mx-auto max-w-4xl">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm font-black text-neon transition hover:text-white"
        >
          <ArrowLeft size={16} />
          {articleCopy.backToArticles}
        </Link>

        <div className="mt-7 flex flex-wrap items-center gap-2">
          {article.date ? (
            <span className="text-xs font-bold text-slate-500">
              {formatDate(article.date, locale)}
            </span>
          ) : null}
        </div>

        <h1 className="mt-5 text-4xl font-black leading-tight text-white sm:text-5xl">
          {article.title}
        </h1>

        {article.labels.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {article.labels.map((label) => (
              <span
                key={label}
                className="rounded border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-semibold text-slate-400"
              >
                {label}
              </span>
            ))}
          </div>
        ) : null}

        {article.thumbnail ? (
          <div className="relative mt-8 aspect-[16/8] overflow-hidden rounded border border-white/10 bg-void">
            <Image
              src={article.thumbnail}
              alt={article.title}
              fill
              sizes="(min-width: 1024px) 896px, 100vw"
              className="object-cover"
              unoptimized
              priority
            />
          </div>
        ) : null}

        <div
          className="blogger-content mt-9 rounded border border-white/10 bg-panel/70 p-5 leading-8 text-slate-300 sm:p-7"
          data-locale={locale}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </article>
  );
}

function selectLocalizedContent(content: string, locale: Locale) {
  const className = locale === "zh" ? "lang-tw" : "lang-en";
  const selected = extractDivByClass(content, className);

  return removeBloggerLanguageButton(selected || content);
}

function extractDivByClass(content: string, className: string) {
  const startTagRegex = new RegExp(
    `<div\\b[^>]*class=["'][^"']*\\b${className}\\b[^"']*["'][^>]*>`,
    "i"
  );
  const startMatch = startTagRegex.exec(content);

  if (!startMatch) {
    return "";
  }

  const bodyStart = startMatch.index + startMatch[0].length;
  const tagRegex = /<\/?div\b[^>]*>/gi;
  tagRegex.lastIndex = bodyStart;

  let depth = 1;
  let match: RegExpExecArray | null;

  while ((match = tagRegex.exec(content))) {
    if (match[0].startsWith("</")) {
      depth -= 1;
    } else {
      depth += 1;
    }

    if (depth === 0) {
      return content.slice(bodyStart, match.index);
    }
  }

  return content.slice(bodyStart);
}

function removeBloggerLanguageButton(content: string) {
  return content.replace(
    /<a\b[^>]*class=["'][^"']*\blang-switch-button\b[^"']*["'][\s\S]*?<\/a>/i,
    ""
  );
}

function formatDate(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "zh" ? "zh-TW" : "en", {
    year: "numeric",
    month: "short",
    day: "2-digit"
  }).format(new Date(value));
}
