import { Activity, Grid3X3, Percent, RadioTower, Waves } from "lucide-react";
import { getDictionary } from "@/lib/i18n";
import { getVolatilityLevel } from "@/lib/volatility";
import type { Game, Locale, VolatilityLevel } from "@/types/game";

type GameCardProps = {
  game: Game;
  locale: Locale;
};

export function GameCard({ game, locale }: GameCardProps) {
  const dictionary = getDictionary(locale);

  return (
    <article className="group overflow-hidden rounded border border-white/10 bg-panel/80 shadow-2xl shadow-black/20 transition hover:-translate-y-1 hover:border-neon/40 hover:shadow-glow">
      <div className="relative min-h-40 bg-[linear-gradient(135deg,rgba(77,227,255,0.22),rgba(168,85,247,0.22)_48%,rgba(255,122,61,0.18)),linear-gradient(45deg,rgba(255,255,255,0.08)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.08)_50%,rgba(255,255,255,0.08)_75%,transparent_75%)] bg-[length:auto,18px_18px]">
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

        <div className="space-y-3 border-t border-white/10 pt-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <SpecPanel
              icon={<Percent size={16} />}
              label={dictionary.features.rtp}
              value={formatPercent(game.rtp)}
            />
            <SpecPanel
              icon={<Activity size={16} />}
              label={dictionary.features.hitRate}
              value={formatPercent(game.hitRate)}
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <SpecPanel
              icon={<Activity size={16} />}
              label={dictionary.features.maxWin}
              value={game.maxWin.toString()}
            />
            <VolatilityPanel
              label={dictionary.features.volatility}
              rawValue={game.volatility}
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <SpecPanel
              icon={<Grid3X3 size={16} />}
              label={dictionary.features.boardSize}
              value={game.boardSize}
            />
            <SpecPanel
              icon={<RadioTower size={16} />}
              label={dictionary.features.lineMechanic}
              value={game.lineMechanic}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
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

function SpecPanel({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded border border-white/10 bg-void/60 p-3">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
        <span className="text-neon">{icon}</span>
        {label}
      </div>
      <p className="mt-2 text-lg font-black text-white">{value}</p>
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
    <div className="rounded border border-white/10 bg-void/60 p-3">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
        <span className="text-neon">
          <Waves size={16} />
        </span>
        {label}
      </div>
      <div className="mt-3 flex items-end gap-1.5">
        {[1, 2, 3, 4, 5].map((barLevel) => (
          <span
            key={barLevel}
            className={
              barLevel <= level
                ? "block h-5 flex-1 rounded-sm bg-neon shadow-glow"
                : "block h-5 flex-1 rounded-sm bg-white/10"
            }
            style={{ height: `${4 + barLevel * 4}px` }}
          />
        ))}
      </div>
    </div>
  );
}

function formatPercent(value: number) {
  return `${value} %`;
}

function formatGameName(id: string) {
  return id
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
