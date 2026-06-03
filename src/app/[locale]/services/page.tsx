import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Calculator,
  FileText,
  LineChart,
  ShieldCheck
} from "lucide-react";
import { getDictionary, isLocale } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";
import type { Locale } from "@/types/game";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : "en";
  const content = getDictionary(locale).services;

  return {
    title: content.title,
    description: content.intro,
    alternates: {
      canonical: `/${locale}/services`,
      languages: {
        "zh-Hant": "/zh/services",
        en: "/en/services"
      }
    }
  };
}

export default async function ServicesPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = (isLocale(localeParam) ? localeParam : "en") as Locale;
  const dictionary = getDictionary(locale);
  const content = dictionary.services;
  const icons = [
    <Calculator key="model" size={22} />,
    <LineChart key="probability" size={22} />,
    <BarChart3 key="simulation" size={22} />,
    <FileText key="specs" size={22} />
  ];

  return (
    <div className="px-5 py-14 sm:py-16">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-neon">
          {content.eyebrow}
        </p>
        <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_0.82fr] lg:items-end">
          <div>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-white sm:text-5xl">
              {content.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              {content.intro}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Link
              href={localizedPath(locale, "/games")}
              className="inline-flex h-12 items-center justify-center gap-2 rounded bg-neon px-5 text-sm font-black text-void transition hover:bg-white"
            >
              {content.primaryCta}
              <ArrowRight size={18} />
            </Link>
            <Link
              href={localizedPath(locale, "/about")}
              className="inline-flex h-12 items-center justify-center rounded border border-white/10 px-5 text-sm font-bold text-slate-200 transition hover:border-neon/50 hover:text-neon"
            >
              {content.secondaryCta}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 grid max-w-6xl gap-4 md:grid-cols-2">
        {content.cards.map((card, index) => (
          <article
            key={card.title}
            className="rounded border border-white/10 bg-panel/75 p-5"
          >
            <span className="grid size-11 place-items-center rounded border border-neon/30 bg-neon/10 text-neon">
              {icons[index]}
            </span>
            <h2 className="mt-5 text-xl font-black text-white">{card.title}</h2>
            <p className="mt-3 leading-7 text-slate-300">{card.text}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-8 grid max-w-6xl gap-4 rounded border border-white/10 bg-white/[0.04] p-5 md:grid-cols-[0.75fr_1.25fr]">
        <div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-neon" size={22} />
            <h2 className="text-xl font-black text-white">
              {content.processTitle}
            </h2>
          </div>
          <p className="mt-4 leading-7 text-slate-300">{content.note}</p>
        </div>
        <div className="grid gap-2 sm:grid-cols-4">
          {content.process.map((item) => (
            <div
              key={item}
              className="rounded border border-white/10 bg-void/70 px-3 py-3 text-sm font-black text-slate-200"
            >
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
