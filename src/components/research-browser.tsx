"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { ArticleCard } from "@/components/research-card";
import { getDictionary } from "@/lib/i18n";
import { researchPath } from "@/lib/research-language";
import type { ResearchArticle } from "@/lib/notion";
import type { Locale } from "@/types/game";

const PAGE_SIZE = 12;
const QUICK_TAG_COUNT = 10;

export function ResearchBrowser({
  articles,
  locale
}: {
  articles: ResearchArticle[];
  locale: Locale;
}) {
  const content = getDictionary(locale).research;
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [tag, setTag] = useState("all");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const categories = useMemo(
    () => rankByCount(articles.map((article) => article.category)),
    [articles]
  );
  const quickTags = useMemo(
    () => rankByCount(articles.flatMap((article) => article.tags)).slice(0, QUICK_TAG_COUNT),
    [articles]
  );

  const hasTagPrefix = quickTags.some((value) => /^\[[A-Z]\]/.test(value));

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return articles.filter(
      (article) =>
        (normalizedQuery === "" ||
          article.title.toLowerCase().includes(normalizedQuery) ||
          article.tags.some((value) => value.toLowerCase().includes(normalizedQuery))) &&
        (category === "all" || article.category === category) &&
        (tag === "all" || article.tags.includes(tag))
    );
  }, [articles, query, category, tag]);

  function update<T>(setter: (value: T) => void, value: T) {
    setter(value);
    setVisible(PAGE_SIZE);
  }

  return (
    <div>
      <div className="rounded border border-white/10 bg-white/[0.04] p-4">
        <label className="relative block">
          <span className="sr-only">{content.searchPlaceholder}</span>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            value={query}
            onChange={(event) => update(setQuery, event.target.value)}
            placeholder={content.searchPlaceholder}
            className="h-12 w-full rounded border border-white/10 bg-void/80 pl-10 pr-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-neon/50"
          />
        </label>
        <div className="mt-4 space-y-3">
          <ChipRow label={content.categoryLabel}>
            <Chip active={category === "all"} onClick={() => update(setCategory, "all")}>
              {content.all}
            </Chip>
            {categories.map((value) => (
              <Chip
                key={value}
                active={category === value}
                onClick={() => update(setCategory, category === value ? "all" : value)}
              >
                {value}
              </Chip>
            ))}
          </ChipRow>
          <ChipRow label={content.tagLabel}>
            <Chip active={tag === "all"} onClick={() => update(setTag, "all")}>
              {content.all}
            </Chip>
            {quickTags.map((value) => (
              <Chip
                key={value}
                active={tag === value}
                onClick={() => update(setTag, tag === value ? "all" : value)}
              >
                {value}
              </Chip>
            ))}
          </ChipRow>
          {hasTagPrefix ? (
            <p className="text-xs text-slate-400">{content.tagLegend}</p>
          ) : null}
        </div>
        <p className="mt-4 border-t border-white/10 pt-4 text-sm font-bold text-slate-300">
          {filtered.length} {content.notesCount}
        </p>
      </div>

      {filtered.length > 0 ? (
        <>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {filtered.slice(0, visible).map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                href={researchPath(article)}
                  locale={locale}
              />
            ))}
          </div>
          {visible < filtered.length ? (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setVisible((count) => count + PAGE_SIZE)}
                className="inline-flex h-12 items-center justify-center rounded border border-white/10 px-6 text-sm font-bold text-slate-200 transition hover:border-neon/50 hover:text-white"
              >
                {content.showMore} ({filtered.length - visible})
              </button>
            </div>
          ) : null}
        </>
      ) : (
        <div className="mt-6 rounded border border-white/10 bg-panel/75 p-8 text-slate-300">
          {content.noResults}
        </div>
      )}
    </div>
  );
}

function rankByCount(values: string[]) {
  const counts = new Map<string, number>();
  values.filter(Boolean).forEach((value) => counts.set(value, (counts.get(value) ?? 0) + 1));
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([value]) => value);
}

function ChipRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs font-black text-slate-400">{label}</span>
      {children}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={
        active
          ? "rounded border border-neon bg-neon/15 px-3 py-1.5 text-xs font-black text-neon"
          : "rounded border border-white/10 px-3 py-1.5 text-xs font-bold text-slate-300 transition hover:border-neon/50 hover:text-white"
      }
    >
      {children}
    </button>
  );
}
