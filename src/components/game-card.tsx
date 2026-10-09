"use client";

import { getDictionary } from "@/lib/i18n";
import { getVolatilityLevel } from "@/lib/volatility";
import type { Game, Locale } from "@/types/game";

type GameCardProps = {
  game: Game;
  locale: Locale;
  onOpen?: () => void;
};

export function GameCard({ game, locale, onOpen }: GameCardProps) {
  const dictionary = getDictionary(locale);

  return (
    <article
      className={`group overflow-hidden rounded border border-white/10 bg-panel/80 shadow-2xl shadow-black/20 transition hover:border-neon/40 ${
        onOpen ? "cursor-pointer focus:outline-none focus:ring-2 focus:ring-neon/60" : ""
      }`}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (onOpen && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          onOpen();
        }
      }}
      role={onOpen ? "button" : undefined}
      tabIndex={onOpen ? 0 : undefined}
    >
      <div className="relative min-h-40 bg-[linear-gradient(135deg,rgba(77,227,255,0.12),rgba(13,19,36,0.9))]">
        <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/20 to-transparent" />
        <div className="absolute left-4 top-4 rounded border border-neon/35 bg-black/35 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-neon">
          {game.genre[0]}
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-300">
            {game.genre.join(" / ")}
          </p>
          <h3 className="mt-2 text-2xl font-black text-white">
            {formatGameName(game.id)}
          </h3>
        </div>
      </div>

      <div className="space-y-5 p-5">
        <div className="grid grid-cols-3 gap-3">
          <PrimaryStat
            label={dictionary.features.rtp}
            value={formatPercent(game.rtp)}
          />
          <VolatilityPanel
            label={dictionary.features.volatility}
            rawValue={game.volatility}
          />
          <PrimaryStat
            label={dictionary.features.maxWin}
            value={`${formatNumber(game.maxWin)}x`}
            compactValue={`${formatCompact(game.maxWin)}x`}
          />
        </div>

        <dl className="grid grid-cols-3 gap-3 border-t border-white/10 pt-4 text-sm">
          <SecondaryStat
            label={dictionary.features.hitRate}
            value={formatPercent(game.hitRate)}
          />
          <SecondaryStat
            label={dictionary.features.boardSize}
            value={game.boardSize}
          />
          <SecondaryStat
            label={dictionary.features.lineMechanic}
            value={formatLineMechanic(game.lineMechanic)}
          />
        </dl>

        <div className="flex flex-wrap gap-2 border-t border-white/10 pt-4">
          {game.tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-semibold text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

    </article>
  );
}

function PrimaryStat({
  label,
  value,
  compactValue
}: {
  label: string;
  value: string;
  compactValue?: string;
}) {
  return (
    <div className="min-w-0 rounded border border-white/10 bg-void/60 p-2.5 sm:p-3">
      <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400 sm:text-xs sm:tracking-[0.12em]">
        {label}
      </p>
      <p className="mt-2 text-base font-black text-white sm:text-xl">
        {compactValue ? (
          <>
            <span className="sm:hidden">{compactValue}</span>
            <span className="hidden sm:inline">{value}</span>
          </>
        ) : (
          value
        )}
      </p>
    </div>
  );
}

function SecondaryStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-bold text-slate-400">{label}</dt>
      <dd className="mt-1 font-bold text-slate-200">{value}</dd>
    </div>
  );
}

function VolatilityPanel({
  label,
  rawValue
}: {
  label: string;
  rawValue: number;
}) {
  const level = getVolatilityLevel(rawValue);

  return (
    <div className="min-w-0 rounded border border-white/10 bg-void/60 p-2.5 sm:p-3">
      <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400 sm:text-xs sm:tracking-[0.12em]">
        {label}
      </p>
      <p className="mt-2 text-base font-black text-white sm:text-xl">
        {level}
        <span className="text-sm font-bold text-slate-400">/5</span>
      </p>
      <div className="mt-2 flex items-end gap-1">
        {[1, 2, 3, 4, 5].map((barLevel) => (
          <span
            key={barLevel}
            className={
              barLevel <= level
                ? "block flex-1 rounded-sm bg-neon"
                : "block flex-1 rounded-sm bg-white/10"
            }
            style={{ height: `${3 + barLevel * 2}px` }}
          />
        ))}
      </div>
    </div>
  );
}

function formatPercent(value: number) {
  return `${formatNumber(value)}%`;
}

function formatCompact(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(value);
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2
  }).format(value);
}

function formatLineMechanic(value: string) {
  const trimmedValue = value.trim();

  if (/^\d+$/.test(trimmedValue)) {
    return `${trimmedValue} ${trimmedValue === "1" ? "Line" : "Lines"}`;
  }

  return trimmedValue.replace(/^1 Line$/i, "1 Line");
}

function formatGameName(id: string) {
  return id
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
