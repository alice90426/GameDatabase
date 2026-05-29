import type { Metadata } from "next";
import { GameFilters } from "@/components/game-filters";
import { allGames, getGameBoardSizes, getGameGenres, getGameLines, getGameTags, getGameVolatilities } from "@/lib/games";
import { getDictionary, isLocale } from "@/lib/i18n";
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
    description: dictionary.games.intro,
    alternates: {
      canonical: `/${locale}/games`,
      languages: {
        "zh-Hant": "/zh/games",
        en: "/en/games"
      }
    }
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

  return (
    <section className="px-5 py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-neon">
            Database
          </p>
          <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">
            {dictionary.games.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            {dictionary.games.intro}
          </p>
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
      </div>
    </section>
  );
}
