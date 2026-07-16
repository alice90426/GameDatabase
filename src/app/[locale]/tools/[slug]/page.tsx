import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { notFound } from "next/navigation";
import { getTool, getYouTubeEmbedUrl, tools } from "@/data/tools";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";
import type { Locale } from "@/types/game";

export function generateStaticParams() {
  return locales.flatMap((locale) => tools.map((tool) => ({ locale, slug: tool.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: value, slug } = await params;
  const locale = (isLocale(value) ? value : "en") as Locale;
  const tool = getTool(slug);
  return tool ? { title: tool.title[locale], description: tool.summary[locale] } : {};
}

export default async function ToolDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: value, slug } = await params;
  const locale = (isLocale(value) ? value : "en") as Locale;
  const tool = getTool(slug);
  if (!tool) notFound();
  const content = getDictionary(locale).tools;
  const embedUrl = getYouTubeEmbedUrl(tool.youtubeUrl);

  return (
    <article className="px-5 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <Link href={localizedPath(locale, "/tools")} className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-neon">
          <ArrowLeft size={17} />{content.backToTools}
        </Link>
        <p className="mt-10 text-sm font-black uppercase tracking-[0.22em] text-neon">{tool.category[locale]}</p>
        <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">{tool.title[locale]}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{tool.summary[locale]}</p>

        {embedUrl && (
          <div className="mt-10 aspect-video overflow-hidden rounded border border-white/10 bg-black shadow-glow">
            <iframe className="h-full w-full" src={embedUrl} title={tool.title[locale]} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
          </div>
        )}

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.42fr]">
          <div>
            <h2 className="text-2xl font-black text-white">{content.overview}</h2>
            <p className="mt-4 whitespace-pre-line leading-8 text-slate-300">{tool.description[locale]}</p>
            <h2 className="mt-9 text-2xl font-black text-white">{content.features}</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {tool.features[locale].map((feature) => <li key={feature} className="rounded border border-white/10 bg-white/[0.04] p-4 text-slate-200">{feature}</li>)}
            </ul>
          </div>
          <aside className="rounded border border-white/10 bg-panel/75 p-5">
            <h2 className="font-black text-white">{content.technologies}</h2>
            <div className="mt-4 flex flex-wrap gap-2">{tool.technologies.map((item) => <span key={item} className="rounded bg-white/[0.06] px-3 py-2 text-sm text-slate-300">{item}</span>)}</div>
            <div className="mt-6 grid gap-3">
              <a href={tool.youtubeUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded bg-neon px-4 py-3 text-sm font-black text-void">{content.watchYouTube}<ExternalLink size={16} /></a>
              {tool.sourceUrl && <a href={tool.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded border border-white/10 px-4 py-3 text-sm font-bold text-white"><Github size={16} />{content.sourceCode}</a>}
              {tool.projectUrl && <a href={tool.projectUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded border border-white/10 px-4 py-3 text-sm font-bold text-white">{content.openProject}<ExternalLink size={16} /></a>}
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
