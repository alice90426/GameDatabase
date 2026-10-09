import { localizedAlternates } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Calculator,
  Check,
  Dices,
  FileText,
  Gamepad2,
  LayoutGrid,
  LineChart,
  Linkedin,
  Mail,
  Spade
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
    description: content.seoDescription,
    alternates: localizedAlternates(locale, "/services")
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
  const contactHref = `mailto:${dictionary.about.contactLinks.email}?subject=${encodeURIComponent(
    dictionary.common.contactSubject
  )}&body=${encodeURIComponent(dictionary.common.contactBody)}`;
  const icons = [
    <Calculator key="model" size={22} />,
    <LineChart key="probability" size={22} />,
    <BarChart3 key="simulation" size={22} />,
    <FileText key="specs" size={22} />
  ];
  const experienceIcons = [
    <LayoutGrid key="gaming" size={20} />,
    <Gamepad2 key="arcade" size={20} />,
    <Dices key="bets" size={20} />,
    <Spade key="cards" size={20} />
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
            <a
              href={contactHref}
              className="inline-flex h-12 items-center justify-center gap-2 rounded bg-neon px-5 text-sm font-black text-void transition hover:bg-white"
            >
              <Mail size={18} />
              {content.primaryCta}
            </a>
            <Link
              href={localizedPath(locale, "/games")}
              className="inline-flex h-12 items-center justify-center gap-2 rounded border border-white/10 px-5 text-sm font-bold text-slate-200 transition hover:border-neon/50 hover:text-white"
            >
              {content.secondaryCta}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 grid max-w-6xl gap-3 sm:grid-cols-3">
        {content.proofs.map((proof) => (
          <div
            key={proof.label}
            className="rounded border border-white/10 bg-panel/75 p-4"
          >
            <p className="whitespace-nowrap text-2xl font-black text-white">
              {proof.value}
            </p>
            <p className="mt-1 text-sm text-slate-300">{proof.label}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto mt-12 max-w-6xl">
        <h2 className="text-2xl font-black text-white">{content.servicesTitle}</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {content.cards.map((card, index) => (
            <article
              key={card.title}
              className="rounded border border-white/10 bg-panel/75 p-5"
            >
              <span className="grid size-11 place-items-center rounded border border-neon/30 bg-neon/10 text-neon">
                {icons[index]}
              </span>
              <h3 className="mt-5 text-xl font-black text-white">{card.title}</h3>
              <p className="mt-2 leading-7 text-slate-300">{card.text}</p>
              <ul className="mt-4 space-y-2">
                {card.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-2 text-sm leading-6 text-slate-200"
                  >
                    <Check size={16} className="mt-1 shrink-0 text-neon" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-6xl rounded border border-white/10 bg-panel/75 p-5">
        <h2 className="text-xl font-black text-white">{content.experienceTitle}</h2>
        <div className="mt-5 grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.experienceGroups.map((group, index) => (
            <div key={group.category} className="flex items-start gap-3">
              <span className="mt-0.5 text-neon">{experienceIcons[index]}</span>
              <div>
                <h3 className="text-base font-black text-white">{group.category}</h3>
                <p className="mt-1 leading-7 text-slate-300">
                  {group.games.join(" · ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-6xl">
        <h2 className="text-2xl font-black text-white">{content.processTitle}</h2>
        <ol className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.process.map((step, index) => (
            <li
              key={step.title}
              className="rounded border border-white/10 bg-white/[0.04] p-5"
            >
              <span className="text-sm font-black text-neon">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-lg font-black text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-6 rounded border border-white/10 bg-panel/75 p-5">
          <h3 className="text-lg font-black text-white">{content.collaborationTitle}</h3>
          <p className="mt-2 max-w-3xl leading-7 text-slate-300">
            {content.collaborationText}
          </p>
          <Link
            href={localizedPath(locale, "/tools")}
            className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-neon hover:text-white"
          >
            {dictionary.home.toolsTitle}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="mx-auto mt-12 flex max-w-6xl flex-col gap-5 rounded border border-neon/25 bg-panel/85 p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div>
          <h2 className="text-2xl font-black text-white">{content.ctaTitle}</h2>
          <p className="mt-2 max-w-2xl leading-7 text-slate-300">{content.ctaText}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={contactHref}
            className="inline-flex h-12 items-center justify-center gap-2 rounded bg-neon px-5 text-sm font-black text-void transition hover:bg-white"
          >
            <Mail size={18} />
            Email
          </a>
          <a
            href={dictionary.about.contactLinks.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded border border-white/10 px-5 text-sm font-bold text-slate-200 transition hover:border-neon/50 hover:text-white"
          >
            <Linkedin size={18} />
            LinkedIn
          </a>
        </div>
      </section>

      <p className="mx-auto mt-8 max-w-6xl text-sm leading-6 text-slate-400">
        {content.note}
      </p>
    </div>
  );
}
