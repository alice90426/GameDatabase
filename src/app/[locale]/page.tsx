import { localizedAlternates } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight, BarChart3, Calculator, Check, Download, FileText, Linkedin, Mail, Table } from "lucide-react";
import { FeaturedGames } from "@/components/featured-games";
import { ArticleCard } from "@/components/research-list";
import { getPublishedResearchArticles } from "@/lib/notion";
import { researchPath } from "@/lib/research-language";
import { getFeaturedGames } from "@/lib/games";
import { getDictionary, isLocale } from "@/lib/i18n";
import { cvPath, localizedPath } from "@/lib/routes";
import type { Locale } from "@/types/game";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return isLocale(locale) ? { alternates: localizedAlternates(locale) } : {};
}

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = (isLocale(localeParam) ? localeParam : "zh") as Locale;
  const dictionary = getDictionary(locale);
  const featuredGames = getFeaturedGames();
  const researchArticles = (await getPublishedResearchArticles()).slice(0, 3);
  const methodIcons = [Calculator, Table, BarChart3, FileText];
  const contactHref = `mailto:${dictionary.about.contactLinks.email}?subject=${encodeURIComponent(
    dictionary.common.contactSubject
  )}&body=${encodeURIComponent(dictionary.common.contactBody)}`;

  return (
    <div>
      <section className="relative px-5 py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-x-0 top-0 -z-10 h-full bg-tech-grid bg-[length:44px_44px] opacity-45" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="inline-flex rounded border border-neon/30 bg-neon/10 px-3 py-1 text-xs font-black uppercase tracking-[0.22em] text-neon">
              {dictionary.home.name} · {dictionary.common.badge}
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-5xl">
              {dictionary.home.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg whitespace-pre-line">
              {dictionary.home.intro}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={contactHref}
                className="inline-flex h-12 items-center justify-center gap-2 rounded bg-neon px-5 text-sm font-black text-void transition hover:bg-white"
              >
                <Mail size={18} />
                {dictionary.nav.contact}
              </a>
              <Link
                href="#selected-work"
                className="inline-flex h-12 items-center justify-center gap-2 rounded border border-white/10 px-5 text-sm font-bold text-slate-200 transition hover:border-plasma/60 hover:text-white"
              >
                {dictionary.common.viewWorks}
                <ArrowRight size={18} />
              </Link>
              <a
                href={cvPath(locale)}
                download
                className="inline-flex h-12 items-center justify-center gap-2 rounded border border-white/10 px-5 text-sm font-bold text-slate-200 transition hover:border-neon/50 hover:text-white"
              >
                <Download size={18} />
                {dictionary.common.downloadCv}
              </a>
            </div>
          </div>

          <div className="rounded border border-white/10 bg-panel/80 p-5 shadow-2xl shadow-black/30">
            <div className="grid gap-3 sm:grid-cols-3">
              {dictionary.home.proofs.map((proof) => (
                <div
                  key={proof.label}
                  className="rounded border border-white/10 bg-white/[0.04] p-4"
                >
                  <p className="whitespace-nowrap text-xl font-black text-white">
                    {proof.value}
                  </p>
                  <p className="mt-2 text-sm leading-5 text-slate-300">{proof.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded border border-white/10 bg-void p-4">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-300">
                {dictionary.home.capabilityTitle}
              </p>
              <ul className="mt-3 space-y-2">
                {dictionary.home.capabilities.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-6 text-slate-200">
                    <Check size={16} className="mt-1 shrink-0 text-neon" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="selected-work" className="scroll-mt-24 px-5 py-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-neon">
                {dictionary.home.catalog}
              </p>
              <h2 className="mt-2 text-3xl font-black text-white">
                {dictionary.home.selectedWork}
              </h2>
            </div>
            <Link
              href={localizedPath(locale, "/games")}
              className="hidden text-sm font-bold text-neon hover:text-white sm:inline"
            >
              {dictionary.common.viewGames}
            </Link>
          </div>
          <FeaturedGames games={featuredGames} locale={locale} />
        </div>
      </section>

      {researchArticles.length > 0 ? (
        <section className="px-5 py-14">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex items-end justify-between gap-4">
              <h2 className="text-3xl font-black text-white">
                {dictionary.home.researchTitle}
              </h2>
              <Link
                href={localizedPath(locale, "/research")}
                className="text-sm font-bold text-neon hover:text-white"
              >
                {dictionary.home.researchMore}
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {researchArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  href={researchPath(article)}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-5 py-14">
        <div className="mx-auto max-w-7xl rounded border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <h2 className="text-3xl font-black text-white">{dictionary.home.method.title}</h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-300">{dictionary.home.method.text}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {dictionary.home.method.steps.map((step, index) => {
              const Icon = methodIcons[index];
              return (
                <ProcessCard
                  key={step.title}
                  icon={<Icon size={22} />}
                  title={`${index + 1}. ${step.title}`}
                  text={step.text}
                />
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 pt-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded border border-neon/25 bg-panel/85 p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <h2 className="text-2xl font-black text-white">{dictionary.home.contactTitle}</h2>
            <p className="mt-2 max-w-2xl leading-7 text-slate-300">{dictionary.home.contactText}</p>
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
            <a
              href={cvPath(locale)}
              download
              className="inline-flex h-12 items-center justify-center gap-2 rounded border border-white/10 px-5 text-sm font-bold text-slate-200 transition hover:border-neon/50 hover:text-white"
            >
              <Download size={18} />
              {dictionary.common.downloadCv}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProcessCard({
  icon,
  title,
  text
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded border border-white/10 bg-panel/70 p-5">
      <div className="grid h-11 w-11 place-items-center rounded border border-neon/30 bg-neon/10 text-neon">
        {icon}
      </div>
      <p className="mt-5 text-lg font-black text-white">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
    </div>
  );
}
