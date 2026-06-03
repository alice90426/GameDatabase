import type { Metadata } from "next";
import {
  BookOpen,
  Compass,
  ExternalLink,
  FileText,
  Github,
  Handshake,
  NotebookText,
  Play,
  Sparkles
} from "lucide-react";
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
    title: dictionary.about.title,
    description: dictionary.about.intro,
    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        "zh-Hant": "/zh/about",
        en: "/en/about"
      }
    }
  };
}

export default async function AboutPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = (isLocale(localeParam) ? localeParam : "zh") as Locale;
  const content = getDictionary(locale).about;
  const resources = [
    { icon: <BookOpen size={20} />, ...content.resources.blogger },
    { icon: <NotebookText size={20} />, ...content.resources.notion },
    { icon: <Github size={20} />, ...content.resources.github },
    { icon: <Play size={20} />, ...content.resources.itch }
  ];

  return (
    <div className="px-5 py-14 sm:py-16">
      <section className="mx-auto grid max-w-6xl items-stretch gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <aside className="rounded border border-neon/25 bg-panel/85 p-6 shadow-2xl shadow-black/25">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-neon">
            {content.eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-black text-white sm:text-5xl">
            {content.title}
          </h1>
          <p className="mt-4 text-lg font-bold text-slate-200">
            {content.role}
          </p>
          <p className="mt-5 whitespace-pre-line leading-8 text-slate-300">
            {content.intro}
          </p>
        </aside>

        <section className="rounded border border-white/25 bg-panel/85 p-5">
          <div className="flex items-center gap-3">
            <Sparkles className="text-neon" size={22} />
            <h2 className="text-xl font-black text-white">
              {content.strengthsTitle}
            </h2>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {content.strengths.map((item) => (
              <div
                key={item}
                className="rounded border border-sky-300/10 bg-void/75 px-3 py-3 text-sm font-bold text-slate-200"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded border border-white/25 bg-panel/85 p-5">
          <div className="flex items-center gap-3">
            <FileText className="text-neon" size={22} />
            <h2 className="text-xl font-black text-white">
              {content.websitePurposeTitle}
            </h2>
          </div>
          <p className="mt-3 whitespace-pre-line leading-8 text-slate-300">
            {content.websitePurpose}
          </p>
        </section>

        <section className="rounded border border-white/25 bg-panel/85 p-5">
          <div className="flex items-center gap-3">
            <Compass className="text-neon" size={22} />
            <h2 className="text-xl font-black text-white">
              {content.researchDirectionTitle}
            </h2>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {content.researchDirections.map((item) => (
              <div
                key={item}
                className="rounded border border-violet-300/10 bg-void/75 px-3 py-3 text-sm font-bold text-slate-200"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded border border-white/25 bg-panel/85 p-5">
          <div className="flex items-center gap-3">
            <Handshake className="text-neon" size={22} />
            <h2 className="text-xl font-black text-white">
              {content.contact}
            </h2>
          </div>
          <p className="mt-3 leading-7 text-slate-300">
            {content.contactText}
          </p>
        </section>

        <section className="rounded border border-white/10 bg-panel/85 p-5">
          <div className="flex items-center gap-3">
            <ExternalLink className="text-neon" size={22} />
            <h2 className="text-xl font-black text-white">
              {content.resourcesTitle}
            </h2>
          </div>
          <p className="mt-3 leading-7 text-slate-300">
            {content.resourcesIntro}
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {resources.map((resource) => (
              <a
                key={resource.title}
                href={resource.href}
                target="_blank"
                rel="noreferrer"
                className="rounded border border-white/10 bg-white/[0.04] p-4 transition hover:border-neon/50"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="shrink-0 text-neon">{resource.icon}</span>
                    <h3 className="truncate font-black text-white">
                      {resource.title}
                    </h3>
                  </div>
                  <ExternalLink size={15} className="text-slate-500" />
                </div>
                <p className="mt-2 text-sm text-slate-400">
                  {resource.text}
                </p>
              </a>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
