"use client";

import { RotateCcw, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { GameCard } from "@/components/game-card";
import { GameDetailModal } from "@/components/game-detail-modal";
import { getDictionary } from "@/lib/i18n";
import { getVolatilityLevel } from "@/lib/volatility";
import type { Game, Locale, VolatilityLevel } from "@/types/game";

type GameFiltersProps = {
  games: Game[];
  genres: string[];
  volatilities: VolatilityLevel[];
  boardSizes: string[];
  lineMechanics: string[];
  tags: string[];
  locale: Locale;
};

export function GameFilters({
  games,
  volatilities,
  boardSizes,
  lineMechanics,
  tags,
  locale
}: GameFiltersProps) {
  const dictionary = getDictionary(locale);
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("all");
  const [volatility, setVolatility] = useState<VolatilityLevel | "all">("all");
  const [boardSize, setBoardSize] = useState("all");
  const [lineMechanic, setLineMechanic] = useState("all");
  const [tag, setTag] = useState("all");
  const [demoOnly, setDemoOnly] = useState("all");
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);

  type FilterKey = "tag" | "volatility" | "boardSize" | "lineMechanic" | "demo";

  function matchesGame(game: Game, ignoredFilter?: FilterKey) {
    const normalizedQuery = query.trim().toLowerCase();
    const volatilityLevel = getVolatilityLevel(game.volatility);
    const searchable = [
      game.id,
      ...game.genre,
      String(game.rtp),
      String(game.hitRate),
      String(game.volatility),
      game.boardSize,
      game.lineMechanic,
      ...game.tags,
      game.githubUrl ? "demo" : "",
      String(volatilityLevel)
    ]
      .join(" ")
      .toLowerCase();

    const matchesQuery =
      normalizedQuery.length === 0 || searchable.includes(normalizedQuery);
    const matchesVolatility =
      ignoredFilter === "volatility" ||
      volatility === "all" ||
      volatilityLevel === volatility;
    const matchesBoardSize =
      ignoredFilter === "boardSize" ||
      boardSize === "all" ||
      game.boardSize === boardSize;
    const matchesLineMechanic =
      ignoredFilter === "lineMechanic" ||
      lineMechanic === "all" ||
      game.lineMechanic === lineMechanic;
    const matchesTags =
      ignoredFilter === "tag" || tag === "all" || game.tags.includes(tag);
    const matchesDemo =
      ignoredFilter === "demo" || demoOnly === "all" || Boolean(game.githubUrl);

    return (
      matchesQuery &&
      matchesVolatility &&
      matchesBoardSize &&
      matchesLineMechanic &&
      matchesTags &&
      matchesDemo
    );
  }

  const filteredGames = useMemo(
    () => games.filter((game) => matchesGame(game)),
    [games, query, volatility, boardSize, lineMechanic, tag, demoOnly]
  );
  const selectedGameIndex = filteredGames.findIndex(
    (game) => game.id === selectedGameId
  );
  const selectedGame =
    selectedGameIndex >= 0 ? filteredGames[selectedGameIndex] : null;

  const availableTags = useMemo(
    () =>
      Array.from(
        new Set(
          games
            .filter((game) => matchesGame(game, "tag"))
            .flatMap((game) => game.tags)
        )
      ).sort(),
    [games, query, volatility, boardSize, lineMechanic, demoOnly]
  );

  const availableVolatilities = useMemo(() => {
    const values = new Set(
      games
        .filter((game) => matchesGame(game, "volatility"))
        .map((game) => getVolatilityLevel(game.volatility))
    );

    return volatilities.filter((value) => values.has(value));
  }, [games, volatilities, query, boardSize, lineMechanic, tag, demoOnly]);

  const availableBoardSizes = useMemo(
    () =>
      boardSizes.filter((value) =>
        games
          .filter((game) => matchesGame(game, "boardSize"))
          .some((game) => game.boardSize === value)
      ),
    [games, boardSizes, query, volatility, lineMechanic, tag, demoOnly]
  );

  const availableLineMechanics = useMemo(
    () =>
      lineMechanics.filter((value) =>
        games
          .filter((game) => matchesGame(game, "lineMechanic"))
          .some((game) => game.lineMechanic === value)
      ),
    [games, lineMechanics, query, volatility, boardSize, tag, demoOnly]
  );

  const hasAvailableDemo = useMemo(
    () =>
      games
        .filter((game) => matchesGame(game, "demo"))
        .some((game) => game.githubUrl),
    [games, query, volatility, boardSize, lineMechanic, tag]
  );
  const demoFilterLabel =
    locale === "zh" ? "\u6709 Demo" : "Has demo";

  function keepSelectedOption(options: string[], selectedValue: string) {
    if (selectedValue === "all" || options.includes(selectedValue)) {
      return options;
    }

    return [selectedValue, ...options];
  }

  function resetFilters() {
    setQuery("");
    setGenre("all");
    setTag("all");
    setVolatility("all");
    setBoardSize("all");
    setLineMechanic("all");
    setDemoOnly("all");
  }

  return (
    <div className="space-y-8">
      <section className="rounded border border-white/10 bg-white/[0.04] p-4">
        <div className="grid gap-3 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_auto]">
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
            options={["all", ...keepSelectedOption(availableTags, tag)]}
            getLabel={(value) =>
              value === "all" ? dictionary.common.tags : value
            }
            onChange={setTag}
          />
          <SelectFilter
            label={dictionary.features.volatility}
            value={String(volatility)}
            options={[
              "all",
              ...keepSelectedOption(
                availableVolatilities.map(String),
                String(volatility)
              )
            ]}
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
          <SelectFilter
            label={dictionary.features.boardSize}
            value={String(boardSize)}
            options={["all", ...keepSelectedOption(availableBoardSizes, boardSize)]}
            getLabel={(value) =>
              value === "all"
                ? dictionary.features.boardSize
                : value
            }
            onChange={setBoardSize}
          />
          <SelectFilter
            label={dictionary.features.lineMechanic}
            value={String(lineMechanic)}
            options={[
              "all",
              ...keepSelectedOption(availableLineMechanics, lineMechanic)
            ]}
            getLabel={(value) =>
              value === "all"
                ? dictionary.features.lineMechanic
                : value
            }
            onChange={setLineMechanic}
          />
          <SelectFilter
            label={demoFilterLabel}
            value={demoOnly}
            options={[
              "all",
              ...(hasAvailableDemo || demoOnly === "demo" ? ["demo"] : [])
            ]}
            getLabel={(value) =>
              locale === "en" ?
                (value === "all" ? "All Games" : "Demo Only") :
                (value === "all" ? "所有遊戲" : "可試玩遊戲")
            }
            onChange={setDemoOnly}
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
        <div className="mt-4 border-t border-white/10 pt-4 text-sm font-bold text-slate-300">
          {locale === "zh"
            ? `目前顯示 ${filteredGames.length}  款遊戲`
            : `Showing ${filteredGames.length}  games`}
        </div>
      </section>

      {filteredGames.length > 0 ? (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              locale={locale}
              onOpen={() => setSelectedGameId(game.id)}
            />
          ))}
        </section>
      ) : (
        <div className="rounded border border-white/10 bg-panel/80 p-10 text-center text-slate-400">
          {dictionary.games.empty}
        </div>
      )}

      {selectedGame ? (
        <GameDetailModal
          game={selectedGame}
          locale={locale}
          hasPrevious={selectedGameIndex > 0}
          hasNext={selectedGameIndex < filteredGames.length - 1}
          onClose={() => setSelectedGameId(null)}
          onPrevious={() =>
            setSelectedGameId(filteredGames[selectedGameIndex - 1]?.id ?? null)
          }
          onNext={() =>
            setSelectedGameId(filteredGames[selectedGameIndex + 1]?.id ?? null)
          }
        />
      ) : null}
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
