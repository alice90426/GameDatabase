import { localizedAlternates } from "@/lib/seo";
import type { Metadata } from "next";
import { GameFilters } from "@/components/game-filters";
import { allGames, getGameBoardSizes, getGameGenres, getGameLines, getGameStats, getGameTags, getGameVolatilities } from "@/lib/games";
import { getDictionary, isLocale } from "@/lib/i18n";
import Link from "next/link";
import { localizedPath } from "@/lib/routes";
import type { Locale } from "@/types/game";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : "zh";
  const dictionary = getDictionary(locale);

  return {
    title: dictionary.games.title,
    description: dictionary.games.seoDescription.replace(
      "{count}",
      String(getGameStats().count)
    ),
    alternates: localizedAlternates(locale, "/games")
  };
}

export default async function GamesPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = (isLocale(localeParam) ? localeParam : "zh") as Locale;
  const dictionary = getDictionary(locale);
  const stats = getGameStats();

  return (
    <section className="px-5 py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-neon">
            {dictionary.games.eyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">
            {dictionary.games.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            {dictionary.games.intro}
          </p>
        </div>

        <div className="mb-8">
          <dl className="grid gap-3 sm:grid-cols-2">
            <div className="rounded border border-white/10 bg-panel/75 p-4">
              <dt className="text-sm text-slate-300">{dictionary.games.stats.models}</dt>
              <dd className="mt-1 text-2xl font-black text-white">{stats.count}</dd>
            </div>
            <div className="rounded border border-white/10 bg-panel/75 p-4">
              <dt className="text-sm text-slate-300">{dictionary.games.stats.rtpRange}</dt>
              <dd className="mt-1 whitespace-nowrap text-2xl font-black text-white">
                {stats.rtpMin.toFixed(1)}% – {stats.rtpMax.toFixed(1)}%
              </dd>
            </div>
          </dl>
          <p className="mt-3 text-sm text-slate-400">{dictionary.games.stats.note}</p>
        </div>

        <GameFilters
          games={allGames}
          genres={getGameGenres()}
          volatilities={getGameVolatilities()}
          boardSizes={getGameBoardSizes()}
          lineMechanics={getGameLines()}
          tags={getGameTags()}
          locale={locale}
        />

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-slate-300">{dictionary.games.footerText}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={localizedPath(locale, "/research")}
              className="inline-flex h-12 items-center justify-center rounded border border-white/10 px-5 text-sm font-bold text-slate-200 transition hover:border-neon/50 hover:text-white"
            >
              {dictionary.games.footerResearch}
            </Link>
            <Link
              href={localizedPath(locale, "/about")}
              className="inline-flex h-12 items-center justify-center rounded border border-white/10 px-5 text-sm font-bold text-slate-200 transition hover:border-neon/50 hover:text-white"
            >
              {dictionary.games.footerAbout}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
