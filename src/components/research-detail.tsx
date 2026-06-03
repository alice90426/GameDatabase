import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { NotionBlockRenderer } from "@/components/notion-block-renderer";
import { getDictionary } from "@/lib/i18n";
import type { NotionBlock, ResearchArticle } from "@/lib/notion";
import type { Locale } from "@/types/game";

type ResearchDetailProps = {
  article: ResearchArticle;
  blocks: NotionBlock[];
  locale: Locale;
  backHref: string;
};

export function ResearchDetail({
  article,
  blocks,
  locale,
  backHref
}: ResearchDetailProps) {
  const content = getDictionary(locale).research;
  const cover = article.cover || getFirstBlockImage(blocks);

  return (
    <article className="px-5 py-12 sm:py-14">
      <div className="mx-auto max-w-4xl">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm font-black text-neon transition hover:text-white"
        >
          <ArrowLeft size={16} />
          {content.backToResearch}
        </Link>

        <div className="mt-7 flex flex-wrap items-center gap-2">
          {article.category ? (
            <span className="rounded border border-neon/30 bg-neon/10 px-2.5 py-1 text-xs font-bold text-neon">
              {article.category}
            </span>
          ) : null}
          {article.date ? (
            <span className="text-xs font-bold text-slate-500">
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
