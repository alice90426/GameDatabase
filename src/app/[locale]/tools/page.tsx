import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, PlayCircle, Wrench } from "lucide-react";
import { tools } from "@/data/tools";
import { getDictionary, isLocale } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";
import type { Locale } from "@/types/game";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: value } = await params;
  const locale = isLocale(value) ? value : "en";
  const content = getDictionary(locale).tools;
  return { title: content.title, description: content.intro };
}

export default async function ToolsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: value } = await params;
  const locale = (isLocale(value) ? value : "en") as Locale;
  const content = getDictionary(locale).tools;

  return (
    <div className="px-5 py-14 sm:py-16">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-neon">{content.eyebrow}</p>
        <h1 className="mt-4 text-4xl font-black text-white sm:text-5xl">{content.title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">{content.intro}</p>
      </section>

      <section className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-2 xl:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={localizedPath(locale, `/tools/${tool.slug}`)}
            className="group flex min-h-64 flex-col rounded border border-white/10 bg-panel/75 p-5 transition hover:-translate-y-1 hover:border-neon/40 hover:shadow-glow"
          >
            <div className="flex items-center justify-between">
              <span className="rounded border border-neon/25 bg-neon/10 px-3 py-1 text-xs font-black text-neon">
                {tool.category[locale]}
              </span>
              <PlayCircle className="text-slate-500 transition group-hover:text-neon" size={24} />
            </div>
            <h2 className="mt-8 text-2xl font-black text-white">{tool.title[locale]}</h2>
            <p className="mt-3 flex-1 leading-7 text-slate-300">{tool.summary[locale]}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-neon">
              {content.viewTool}<ArrowRight size={17} />
            </span>
          </Link>
        ))}
      </section>

      {tools.length === 0 && (
        <section className="mx-auto mt-10 max-w-6xl rounded border border-dashed border-white/15 bg-white/[0.03] px-6 py-16 text-center">
          <Wrench className="mx-auto text-neon" size={32} />
          <h2 className="mt-5 text-xl font-black text-white">{content.emptyTitle}</h2>
          <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-400">{content.empty}</p>
        </section>
      )}
    </div>
  );
}
