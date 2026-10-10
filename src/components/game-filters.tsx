"use client";

import { ChevronDown, RotateCcw, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { GameCard } from "@/components/game-card";
import { GameDetailModal } from "@/components/game-detail-modal";
import { getDictionary } from "@/lib/i18n";
import { getVolatilityLevel } from "@/lib/volatility";
import type { Game, Locale, VolatilityLevel } from "@/types/game";

type SortKey = "id" | "rtpDesc" | "rtpAsc" | "volatilityDesc" | "volatilityAsc" | "maxWinDesc" | "hitRateDesc";

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
  const [rtpMin, setRtpMin] = useState("");
  const [rtpMax, setRtpMax] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [preloadId, setPreloadId] = useState<string | null>(null);
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);

  type FilterKey = "tag" | "volatility" | "boardSize" | "lineMechanic";

  function matchesGame(game: Game, ignoredFilter?: FilterKey) {
    const normalizedQuery = query.trim().toLowerCase();
    const volatilityLevel = getVolatilityLevel(game.volatility);
    const matchesQuery =
      normalizedQuery.length === 0 ||
      game.id.toLowerCase().includes(normalizedQuery);
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

    const minRtp = rtpMin === "" ? null : Number(rtpMin);
    const maxRtp = rtpMax === "" ? null : Number(rtpMax);
    const matchesRtp =
      (minRtp === null || Number.isNaN(minRtp) || game.rtp >= minRtp) &&
      (maxRtp === null || Number.isNaN(maxRtp) || game.rtp <= maxRtp);

    return (
      matchesRtp &&
      matchesQuery &&
      matchesVolatility &&
      matchesBoardSize &&
      matchesLineMechanic &&
      matchesTags
    );
  }

  const filteredGames = useMemo(() => {
    const result = games.filter((game) => matchesGame(game));
    const compare: Record<SortKey, (a: Game, b: Game) => number> = {
      id: () => 0,
      rtpDesc: (a, b) => b.rtp - a.rtp,
      rtpAsc: (a, b) => a.rtp - b.rtp,
      volatilityDesc: (a, b) => b.volatility - a.volatility,
      volatilityAsc: (a, b) => a.volatility - b.volatility,
      maxWinDesc: (a, b) => b.maxWin - a.maxWin,
      hitRateDesc: (a, b) => b.hitRate - a.hitRate
    };
    return sortKey === "id" ? result : [...result].sort(compare[sortKey]);
  }, [games, query, volatility, boardSize, lineMechanic, tag, rtpMin, rtpMax, sortKey]);
  const preloadUrl = games.find((game) => game.id === preloadId)?.githubUrl;

  useEffect(() => {
    const firstId = games.find((game) => game.githubUrl)?.id ?? null;
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1500));
    const handle = idle(() => setPreloadId((current) => current ?? firstId));
    return () => {
      if (window.cancelIdleCallback && typeof handle === "number") {
        window.cancelIdleCallback(handle);
      }
    };
  }, [games]);

  const quickTags = useMemo(() => {
    const counts = new Map<string, number>();
    games.forEach((game) =>
      game.tags.forEach((value) => counts.set(value, (counts.get(value) ?? 0) + 1))
    );
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([value]) => value);
  }, [games]);
  const advancedActiveCount = [
    tag !== "all" && !quickTags.includes(tag),
    boardSize !== "all",
    lineMechanic !== "all",
    rtpMin !== "",
    rtpMax !== ""
  ].filter(Boolean).length;

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
    [games, query, volatility, boardSize, lineMechanic, rtpMin, rtpMax]
  );

  const availableBoardSizes = useMemo(
    () =>
      boardSizes.filter((value) =>
        games
          .filter((game) => matchesGame(game, "boardSize"))
          .some((game) => game.boardSize === value)
      ),
    [games, boardSizes, query, volatility, lineMechanic, tag, rtpMin, rtpMax]
  );

  const availableLineMechanics = useMemo(
    () =>
      lineMechanics.filter((value) =>
        games
          .filter((game) => matchesGame(game, "lineMechanic"))
          .some((game) => game.lineMechanic === value)
      ),
    [games, lineMechanics, query, volatility, boardSize, tag, rtpMin, rtpMax]
  );

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
    setRtpMin("");
    setRtpMax("");
    setSortKey("id");
  }

  return (
    <div className="space-y-8">
      <section className="rounded border border-white/10 bg-white/[0.04] p-4">
        <div className="grid gap-3 sm:grid-cols-[1fr_14rem_auto]">
          <label className="relative">
            <span className="sr-only">{dictionary.games.search}</span>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={dictionary.games.search}
              className="h-12 w-full rounded border border-white/10 bg-void/80 pl-10 pr-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-neon/50"
            />
          </label>
          <label>
            <span className="sr-only">{dictionary.games.sortBy}</span>
            <select
              value={sortKey}
              onChange={(event) => setSortKey(event.target.value as SortKey)}
              className="h-12 w-full min-w-0 rounded border border-white/10 bg-void/80 px-3 text-sm font-semibold text-white outline-none transition focus:border-neon/50"
            >
              {(Object.keys(dictionary.games.sortOptions) as SortKey[]).map((key) => (
                <option key={key} value={key}>
                  {dictionary.games.sortOptions[key]}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex h-12 items-center justify-center gap-2 rounded border border-white/10 px-4 text-sm font-bold text-slate-200 transition hover:border-neon/50 hover:text-white"
          >
            <RotateCcw size={16} />
            {dictionary.common.reset}
          </button>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-black text-slate-400">
              {dictionary.features.volatility}
            </span>
            {volatilities.map((level) => (
              <Chip
                key={level}
                active={volatility === level}
                onClick={() => setVolatility(volatility === level ? "all" : level)}
              >
                {level}/5
              </Chip>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-black text-slate-400">
              {dictionary.common.tags}
            </span>
            {quickTags.map((value) => (
              <Chip
                key={value}
                active={tag === value}
                onClick={() => setTag(tag === value ? "all" : value)}
              >
                {value}
              </Chip>
            ))}
          </div>
        </div>

        <button
          type="button"
          aria-expanded={showAdvanced}
          onClick={() => setShowAdvanced((open) => !open)}
          className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-neon transition hover:text-white"
        >
          {dictionary.games.advanced}
          {advancedActiveCount > 0 ? ` (${advancedActiveCount})` : ""}
          <ChevronDown
            size={16}
            className={showAdvanced ? "rotate-180 transition" : "transition"}
          />
        </button>

        {showAdvanced ? (
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
              label={dictionary.features.boardSize}
              value={String(boardSize)}
              options={["all", ...keepSelectedOption(availableBoardSizes, boardSize)]}
              getLabel={(value) =>
                value === "all" ? dictionary.features.boardSize : value
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
                value === "all" ? dictionary.features.lineMechanic : value
              }
              onChange={setLineMechanic}
            />
            <div className="grid grid-cols-2 gap-3">
              <label>
                <span className="sr-only">{dictionary.games.rtpMin}</span>
                <input
                  type="number"
                  inputMode="decimal"
                  step="0.1"
                  min="0"
                  max="100"
                  value={rtpMin}
                  onChange={(event) => setRtpMin(event.target.value)}
                  placeholder={dictionary.games.rtpMin}
                  className="h-12 w-full min-w-0 rounded border border-white/10 bg-void/80 px-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-neon/50"
                />
              </label>
              <label>
                <span className="sr-only">{dictionary.games.rtpMax}</span>
                <input
                  type="number"
                  inputMode="decimal"
                  step="0.1"
                  min="0"
                  max="100"
                  value={rtpMax}
                  onChange={(event) => setRtpMax(event.target.value)}
                  placeholder={dictionary.games.rtpMax}
                  className="h-12 w-full min-w-0 rounded border border-white/10 bg-void/80 px-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-neon/50"
                />
              </label>
            </div>
          </div>
        ) : null}

        <div className="mt-4 border-t border-white/10 pt-4 text-sm font-bold text-slate-300">
          {dictionary.games.showingPrefix} {filteredGames.length}{" "}
          {dictionary.games.showingSuffix}
        </div>
      </section>

      {filteredGames.length > 0 ? (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              onPointerEnter={() => setPreloadId(game.id)}
              onFocus={() => setPreloadId(game.id)}
              onTouchStart={() => setPreloadId(game.id)}
            >
              <GameCard
                game={game}
                locale={locale}
                onOpen={() => setSelectedGameId(game.id)}
              />
            </div>
          ))}
        </section>
      ) : (
        <div className="rounded border border-white/10 bg-panel/80 p-10 text-center text-slate-400">
          {dictionary.games.empty}
        </div>
      )}

      {preloadUrl && !selectedGame ? (
        <iframe
          key={preloadUrl}
          src={`${preloadUrl}?embed=1`}
          title="preload"
          aria-hidden="true"
          tabIndex={-1}
          className="pointer-events-none fixed -left-[9999px] top-0 h-[360px] w-[640px] border-0 opacity-0"
        />
      ) : null}

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
