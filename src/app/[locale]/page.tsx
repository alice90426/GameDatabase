import Link from "next/link";
import { ArrowRight, BadgeCheck, Boxes, Database } from "lucide-react";
import { GameCard } from "@/components/game-card";
import { allGames, getFeaturedGames, getGameLines, getGameTags } from "@/lib/games";
import { getDictionary, isLocale } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";
import type { Locale } from "@/types/game";

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = (isLocale(localeParam) ? localeParam : "zh") as Locale;
  const dictionary = getDictionary(locale);
  const featuredGames = getFeaturedGames();
  const tagCount = getGameTags().length;
  const lineCount = getGameLines().length;

  return (
    <div>
      <section className="relative px-5 py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-x-0 top-0 -z-10 h-full bg-tech-grid bg-[length:44px_44px] opacity-45" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="inline-flex rounded border border-neon/30 bg-neon/10 px-3 py-1 text-xs font-black uppercase tracking-[0.22em] text-neon">
              {dictionary.common.badge}
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              {dictionary.home.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              {dictionary.home.intro}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={localizedPath(locale, "/games")}
                className="inline-flex h-12 items-center justify-center gap-2 rounded bg-neon px-5 text-sm font-black text-void transition hover:bg-white"
              >
                {dictionary.common.viewGames}
                <ArrowRight size={18} />
              </Link>
              <Link
                href={localizedPath(locale, "/about")}
                className="inline-flex h-12 items-center justify-center rounded border border-white/10 px-5 text-sm font-bold text-slate-200 transition hover:border-plasma/60 hover:text-white"
              >
                {dictionary.common.viewAbout}
              </Link>
            </div>
          </div>

          <div className="rounded border border-white/10 bg-panel/80 p-5 shadow-2xl shadow-black/30">
            <div className="grid gap-3 sm:grid-cols-3">
              <Metric
                value={String(allGames.length).padStart(2, "0")}
                label={dictionary.home.metricGames}
              />
              <Metric
                value={String(tagCount).padStart(2, "0")}
                label={dictionary.home.metricTags}
              />
              <Metric
                value={String(lineCount).padStart(2, "0")} label={dictionary.home.metricLines} />
            </div>
            <div className="mt-5 overflow-hidden rounded border border-white/10 bg-void">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <span className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">
                  Data Fields
                </span>
                <span className="h-2 w-2 rounded-full bg-neon shadow-glow" />
              </div>
              <div className="grid gap-px bg-white/10 md:grid-cols-3">
                {[
                  ["RTP", "Ready"],
                  ["Volatility", "Filter"],
                  ["Layout", "Tracked"]
                ].map(([label, value]) => (
                  <div key={label} className="bg-panel p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      {label}
                    </p>
                    <p className="mt-3 text-xl font-black text-white">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-neon">
                Catalog
              </p>
              <h2 className="mt-2 text-3xl font-black text-white">
                {dictionary.home.featured}
              </h2>
            </div>
            <Link
              href={localizedPath(locale, "/games")}
              className="hidden text-sm font-bold text-neon hover:text-white sm:inline"
            >
              {dictionary.common.viewGames}
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredGames.map((game) => (
              <GameCard key={game.id} game={game} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14">
        <div className="mx-auto grid max-w-7xl gap-6 rounded border border-white/10 bg-white/[0.04] p-6 md:grid-cols-[0.8fr_1.2fr] md:p-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-ember">
              Workflow
            </p>
            <h2 className="mt-2 text-3xl font-black text-white">
              {dictionary.home.pipeline}
            </h2>
            <p className="mt-4 leading-7 text-slate-300">
              {dictionary.home.pipelineText}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <ProcessCard icon={<Database size={22} />} title="Collect" />
            <ProcessCard icon={<Boxes size={22} />} title="Classify" />
            <ProcessCard icon={<BadgeCheck size={22} />} title="Compare" />
          </div>
        </div>
      </section>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded border border-white/10 bg-white/[0.04] p-4">
      <p className="text-3xl font-black text-white">{value}</p>
      <p className="mt-2 text-sm leading-5 text-slate-400">{label}</p>
    </div>
  );
}

function ProcessCard({
  icon,
  title
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="rounded border border-white/10 bg-panel/70 p-5">
      <div className="grid h-11 w-11 place-items-center rounded border border-neon/30 bg-neon/10 text-neon">
        {icon}
      </div>
      <p className="mt-5 text-lg font-black text-white">{title}</p>
    </div>
  );
}
