"use client";

import { RotateCcw, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { GameCard } from "@/components/game-card";
import { getDictionary } from "@/lib/i18n";
import { getVolatilityLevel } from "@/lib/volatility";
import type { Game, Locale, VolatilityLevel } from "@/types/game";

type GameFiltersProps = {
  games: Game[];
  genres: string[];
  volatilities: VolatilityLevel[];
  tags: string[];
  locale: Locale;
};

export function GameFilters({
  games,
  genres,
  volatilities,
  tags,
  locale
}: GameFiltersProps) {
  const dictionary = getDictionary(locale);
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("all");
  const [volatility, setVolatility] = useState<VolatilityLevel | "all">("all");
  const [tag, setTag] = useState("all");

  const filteredGames = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return games.filter((game) => {
      const volatilityLevel = getVolatilityLevel(game.volatility);
      const searchable = [
        game.id,
        ...game.tags,
        ...game.genre,
        String(game.hitRate),
        String(game.volatility),
        String(volatilityLevel),
        String(game.rtp),
        game.boardSize,
        game.lineMechanic
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery =
        normalizedQuery.length === 0 || searchable.includes(normalizedQuery);
      const matchesGenre = genre === "all" || game.genre.includes(genre);
      const matchesVolatility =
        volatility === "all" || volatilityLevel === volatility;
      const matchesTags = tag === "all" || game.tags.includes(tag);

      return matchesQuery && matchesGenre && matchesVolatility && matchesTags;
    });
  }, [games, genre, query, volatility, tag]);

  function resetFilters() {
    setQuery("");
    setGenre("all");
    setTag("all");
    setVolatility("all");
  }

  return (
    <div className="space-y-8">
      <section className="rounded border border-white/10 bg-white/[0.04] p-4">
        <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr_1fr_auto]">
          <label className="relative">
            <span className="sr-only">{dictionary.games.search}</span>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              size={18}
            />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={dictionary.games.search}
              className="h-12 w-full rounded border border-white/10 bg-void/80 pl-10 pr-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-neon/50"
            />
          </label>

          <SelectFilter
            label={dictionary.common.tags}
            value={tag}
            options={["all", ...tags]}
            getLabel={(value) =>
              value === "all" ? dictionary.common.tags : value
            }
            onChange={setTag}
          />
          <SelectFilter
            label={dictionary.features.volatility}
            value={String(volatility)}
            options={["all", ...volatilities.map(String)]}
            getLabel={(value) =>
              value === "all"
                ? dictionary.features.volatility
                : `${dictionary.features.volatility} ${value}/5`
            }
            onChange={(value) =>
              setVolatility(
                value === "all" ? "all" : (Number(value) as VolatilityLevel)
              )
            }
          />

          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex h-12 items-center justify-center gap-2 rounded border border-white/10 px-4 text-sm font-bold text-slate-200 transition hover:border-ember/70 hover:text-ember"
          >
            <RotateCcw size={16} />
            {dictionary.common.reset}
          </button>
        </div>
      </section>

      {filteredGames.length > 0 ? (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} locale={locale} />
          ))}
        </section>
      ) : (
        <div className="rounded border border-white/10 bg-panel/80 p-10 text-center text-slate-400">
          {dictionary.games.empty}
        </div>
      )}
    </div>
  );
}

type SelectFilterProps = {
  label: string;
  value: string;
  options: string[];
  getLabel: (value: string) => string;
  onChange: (value: string) => void;
};

function SelectFilter({
  label,
  value,
  options,
  getLabel,
  onChange
}: SelectFilterProps) {
  return (
    <label>
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded border border-white/10 bg-void/80 px-3 text-sm font-semibold text-white outline-none transition focus:border-neon/50"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {getLabel(option)}
          </option>
        ))}
      </select>
    </label>
  );
}
