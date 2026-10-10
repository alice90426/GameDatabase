import Image from "next/image";
import { researchLanguageTag } from "@/lib/research-language";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ArticleCard, LanguageBadge } from "@/components/research-card";
import { NotionBlockRenderer } from "@/components/notion-block-renderer";
import { getDictionary } from "@/lib/i18n";
import { researchPath } from "@/lib/research-language";
import type { NotionBlock, ResearchArticle } from "@/lib/notion";
import type { Locale } from "@/types/game";

type ResearchDetailProps = {
  article: ResearchArticle;
  blocks: NotionBlock[];
  locale: Locale;
  backHref: string;
  neighbors?: {
    previous: ResearchArticle | null;
    next: ResearchArticle | null;
    related: ResearchArticle[];
  };
};

export function ResearchDetail({
  article,
  blocks,
  locale,
  backHref,
  neighbors
}: ResearchDetailProps) {
  const content = getDictionary(locale).research;
  const cover = article.cover || getFirstBlockImage(blocks);

  return (
    <article lang={researchLanguageTag(article.language)} className="px-5 py-12 sm:py-14">
      <div className="mx-auto max-w-4xl">
        <Link
          lang={locale === "zh" ? "zh-Hant" : "en"}
          href={backHref}
          className="inline-flex items-center gap-2 text-sm font-black text-neon transition hover:text-white"
        >
          <ArrowLeft size={16} />
          {content.backToResearch}
        </Link>

        <div className="mt-7 flex flex-wrap items-center gap-2">
          <LanguageBadge article={article} locale={locale} />
          {article.category ? (
            <span className="rounded border border-neon/30 bg-neon/10 px-2.5 py-1 text-xs font-bold text-neon">
              {article.category}
            </span>
          ) : null}
          {article.date ? (
            <span className="text-xs font-bold text-slate-400">
              {formatDate(article.date, locale)}
            </span>
          ) : null}
        </div>

        <h1 className="mt-5 text-4xl font-black leading-tight text-white sm:text-5xl">
          {article.title}
        </h1>

        {article.summary ? (
          <p className="mt-5 text-lg leading-8 text-slate-300">
            {article.summary}
          </p>
        ) : null}

        {article.tags.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-2">
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

        {cover ? (
          <div className="relative mt-8 aspect-[16/8] overflow-hidden rounded border border-white/10 bg-void">
            <Image
              src={cover}
              alt={article.title}
              fill
              sizes="(min-width: 1024px) 896px, 100vw"
              className="object-cover"
              unoptimized
              priority
            />
          </div>
        ) : null}

        <div className="mt-9 rounded border border-white/10 bg-panel/70 p-5 sm:p-7">
          <NotionBlockRenderer blocks={blocks} />
        </div>

        {neighbors ? (
          <>
            {neighbors.previous || neighbors.next ? (
              <nav className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  { item: neighbors.previous, label: content.prevNote },
                  { item: neighbors.next, label: content.nextNote }
                ].map(({ item, label }, index) =>
                  item ? (
                    <Link
                      key={item.id}
                      lang={researchLanguageTag(item.language)}
                      href={researchPath(item)}
                      className={`group rounded border border-white/10 bg-panel/70 p-4 transition hover:border-neon/50 ${index === 1 ? "sm:text-right" : ""}`}
                    >
                      <span className="text-xs font-black text-slate-400">{label}</span>
                      <span className="mt-1 flex items-center gap-2 font-bold text-white transition group-hover:text-neon sm:justify-between">
                        {index === 0 ? <ArrowLeft size={16} className="shrink-0" /> : null}
                        <span className="min-w-0 flex-1">{item.title}</span>
                        {index === 1 ? <ArrowRight size={16} className="shrink-0" /> : null}
                      </span>
                    </Link>
                  ) : (
                    <span key={label} />
                  )
                )}
              </nav>
            ) : null}

            {neighbors.related.length > 0 ? (
              <section className="mt-12">
                <h2 className="text-2xl font-black text-white">{content.relatedTitle}</h2>
                <div className="mt-5 grid gap-5 md:grid-cols-3">
                  {neighbors.related.map((item) => (
                    <ArticleCard
                      key={item.id}
                      article={item}
                      href={researchPath(item)}
                      locale={locale}
                    />
                  ))}
                </div>
              </section>
            ) : null}
          </>
        ) : null}
      </div>
    </article>
  );
}

function formatDate(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "zh" ? "zh-TW" : "en", {
    year: "numeric",
    month: "short",
    day: "2-digit"
  }).format(new Date(value));
}

function getFirstBlockImage(blocks: NotionBlock[]) {
  const image = blocks.find((block) => block.type === "image");

  if (!image || image.type !== "image") {
    return null;
  }

  if (image.image.type === "external") {
    return image.image.external.url;
  }

  return image.image.file.url;
}
