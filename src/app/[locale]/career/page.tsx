import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Calculator,
  CheckCircle2,
  Database,
  ExternalLink,
  FileText,
  Github,
  Mail,
  NotebookText,
  Play
} from "lucide-react";
import { isLocale } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";
import type { Locale } from "@/types/game";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : "en";
  const content = getCareerContent(locale);

  return {
    title: content.position,
    description: content.intro,
    alternates: {
      canonical: `/${locale}/career`,
      languages: {
        "zh-Hant": "/zh/career",
        en: "/en/career"
      }
    }
  };
}

export default async function CareerPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = (isLocale(localeParam) ? localeParam : "en") as Locale;
  const content = getCareerContent(locale);

  const services = [
    {
      icon: <Calculator size={21} />,
      title: content.services.model.title,
      items: content.services.model.items
    },
    {
      icon: <BarChart3 size={21} />,
      title: content.services.simulation.title,
      items: content.services.simulation.items
    },
    {
      icon: <FileText size={21} />,
      title: content.services.specification.title,
      items: content.services.specification.items
    }
  ];

  const resources = [
    {
      icon: <BookOpen size={20} />,
      title: "Blogger",
      text: content.resources.blogger,
      href: "https://slotmathmodel.blogspot.com/"
    },
    {
      icon: <NotebookText size={20} />,
      title: "Notion",
      text: content.resources.notion,
      href: "https://app.notion.com/p/7143abd96b7340ccacc97bacf8f3ea48?v=995db3faa1ca41d3b31052f6a34bceae"
    },
    {
      icon: <Github size={20} />,
      title: "GitHub",
      text: content.resources.github,
      href: "https://github.com/alice90426"
    },
    {
      icon: <Play size={20} />,
      title: "itch.io",
      text: content.resources.itch,
      href: "https://alice90426.itch.io"
    }
  ];

  return (
    <div>
      <section className="relative px-5 py-14 sm:py-20">
        <div className="absolute inset-x-0 top-0 -z-10 h-full bg-tech-grid bg-[length:44px_44px] opacity-35" />
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-neon">
            {content.eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl">
            {content.position}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            {content.intro}
          </p>

          <div className="mt-8 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded border border-white/10 bg-white/10 sm:grid-cols-4">
            {content.metrics.map((metric) => (
              <div key={metric} className="bg-panel/90 px-4 py-4 text-sm font-black text-white">
                {metric}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={localizedPath(locale, "/games")}
              className="inline-flex h-12 items-center justify-center gap-2 rounded bg-neon px-5 text-sm font-black text-void transition hover:bg-white"
            >
              {content.browseModels}
              <ArrowRight size={18} />
            </Link>
            <a
              href="#contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded border border-white/10 px-5 text-sm font-bold text-slate-200 transition hover:border-neon/50 hover:text-neon"
            >
              <Mail size={17} />
              {content.contactMe}
            </a>
          </div>
        </div>
      </section>

      <CareerSection eyebrow={content.servicesEyebrow} title={content.servicesTitle}>
        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="rounded border border-white/10 bg-panel/75 p-5">
              <IconBox>{service.icon}</IconBox>
              <h3 className="mt-5 text-xl font-black text-white">{service.title}</h3>
              <BulletList items={service.items} />
            </article>
          ))}
        </div>
      </CareerSection>

      <CareerSection eyebrow={content.workEyebrow} title={content.workTitle}>
        <div className="grid gap-4 md:grid-cols-2">
          <WorkCard
            icon={<Database size={22} />}
            title={content.work.database.title}
            items={content.work.database.items}
            href={localizedPath(locale, "/games")}
            linkLabel={content.browseModels}
          />
          <WorkCard
            icon={<Calculator size={22} />}
            title={content.work.research.title}
            items={content.work.research.items}
          />
        </div>
      </CareerSection>

      <CareerSection eyebrow={content.resourcesEyebrow} title={content.resourcesTitle}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {resources.map((resource) => (
            <ResourceCard key={resource.title} {...resource} />
          ))}
        </div>
      </CareerSection>

      <section id="contact" className="px-5 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl rounded border border-neon/20 bg-neon/[0.06] p-6 sm:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-neon">
            {content.contactEyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-black text-white">{content.contactTitle}</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-300">{content.contactText}</p>
          <BulletList items={content.contactItems} columns />
          <button
            type="button"
            disabled
            className="mt-6 inline-flex h-12 cursor-not-allowed items-center justify-center gap-2 rounded border border-white/10 px-5 text-sm font-black text-slate-500"
          >
            <Mail size={17} />
            {content.contactButton}
          </button>
        </div>
      </section>
    </div>
  );
}

function CareerSection({
  eyebrow,
  title,
  children
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-white/10 px-5 py-12 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-neon">{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-black text-white">{title}</h2>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}

function IconBox({ children }: { children: React.ReactNode }) {
  return (
    <span className="grid size-11 place-items-center rounded border border-neon/30 bg-neon/10 text-neon">
      {children}
    </span>
  );
}

function BulletList({ items, columns = false }: { items: string[]; columns?: boolean }) {
  return (
    <div className={`mt-4 grid gap-2 ${columns ? "sm:grid-cols-3" : ""}`}>
      {items.map((item) => (
        <div key={item} className="flex items-start gap-2 text-sm leading-6 text-slate-300">
          <CheckCircle2 className="mt-1 shrink-0 text-neon" size={14} />
          {item}
        </div>
      ))}
    </div>
  );
}

function WorkCard({
  icon,
  title,
  items,
  href,
  linkLabel
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  href?: string;
  linkLabel?: string;
}) {
  return (
    <article className="rounded border border-white/10 bg-white/[0.04] p-5">
      <IconBox>{icon}</IconBox>
      <h3 className="mt-5 text-xl font-black text-white">{title}</h3>
      <BulletList items={items} />
      {href && linkLabel ? (
        <Link href={href} className="mt-5 inline-flex items-center gap-2 text-sm font-black text-neon hover:text-white">
          {linkLabel}
          <ArrowRight size={16} />
        </Link>
      ) : null}
    </article>
  );
}

function ResourceCard({
  icon,
  title,
  text,
  href
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  href: string | null;
}) {
  const content = (
    <>
      <div className="flex items-center justify-between gap-3">
        <span className="text-neon">{icon}</span>
        {href ? <ExternalLink size={15} className="text-slate-500" /> : null}
      </div>
      <h3 className="mt-4 font-black text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-400">{text}</p>
    </>
  );

  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="rounded border border-white/10 bg-panel/75 p-4 transition hover:border-neon/50"
    >
      {content}
    </a>
  ) : (
    <div className="rounded border border-white/10 bg-panel/75 p-4">{content}</div>
  );
}

function getCareerContent(locale: Locale) {
  if (locale === "zh") {
    return {
      eyebrow: "\u670d\u52d9\u5b9a\u4f4d",
      position: "Game Mathematics Model Designer",
      intro: "\u6211\u63d0\u4f9b\u904a\u6232\u6578\u5b78\u6a21\u578b\u8a2d\u8a08\u3001\u6a5f\u7387\u5206\u6790\u3001\u6a21\u64ec\u9a57\u8b49\u8207\u7d50\u69cb\u5316\u904a\u6232\u898f\u683c\u6587\u4ef6\u3002",
      metrics: ["100+ \u904a\u6232\u6a21\u578b", "\u6a21\u64ec\u6578\u64da", "\u96d9\u8a9e\u6587\u4ef6", "\u6a5f\u7387\u7814\u7a76"],
      browseModels: "\u700f\u89bd\u904a\u6232\u6a21\u578b",
      contactMe: "\u806f\u7d61\u6211",
      servicesEyebrow: "\u670d\u52d9",
      servicesTitle: "\u6211\u63d0\u4f9b\u7684\u670d\u52d9",
      services: {
        model: { title: "\u6578\u5b78\u6a21\u578b", items: ["RTP", "\u4e2d\u734e\u7387", "\u6ce2\u52d5\u5ea6", "\u6700\u5927\u500d\u6578"] },
        simulation: { title: "\u6a21\u64ec\u9a57\u8b49", items: ["\u6a21\u64ec\u6e2c\u8a66", "\u6578\u64da\u5206\u6790", "\u9577\u671f\u8868\u73fe\u9a57\u8b49"] },
        specification: { title: "\u898f\u683c\u6587\u4ef6", items: ["\u904a\u6232\u898f\u5247", "\u529f\u80fd\u5b9a\u7fa9", "\u4e2d\u82f1\u6587\u6587\u4ef6"] }
      },
      workEyebrow: "\u4f5c\u54c1",
      workTitle: "\u4ee3\u8868\u4f5c\u54c1",
      work: {
        database: { title: "\u904a\u6232\u6a21\u578b\u8cc7\u6599\u5eab", items: ["100+ \u904a\u6232\u6a21\u578b", "\u516d\u5927\u6838\u5fc3\u6578\u503c", "\u6a21\u64ec\u6578\u64da"] },
        research: { title: "\u6a5f\u7387\u7cfb\u7d71\u7814\u7a76", items: ["Slot \u8207\u975e Slot \u904a\u6232\u7814\u7a76", "\u6a5f\u7387\u8207\u734e\u52f5\u6a5f\u5236\u5206\u6790"] }
      },
      resourcesEyebrow: "\u4f50\u8b49\u8cc7\u6599",
      resourcesTitle: "\u5916\u90e8\u8cc7\u6e90",
      resources: { blogger: "\u6559\u5b78\u6587\u7ae0", notion: "\u7814\u7a76\u7b46\u8a18", github: "\u7a0b\u5f0f\u8207\u5de5\u5177", itch: "\u8a66\u73a9\u4f5c\u54c1" },
      contactEyebrow: "\u5408\u4f5c",
      contactTitle: "\u806f\u7d61\u6211",
      contactText: "\u53ef\u63d0\u4f9b\u6578\u5b78\u6a21\u578b\u8a2d\u8a08\u3001\u6a21\u64ec\u9a57\u8b49\u8207\u904a\u6232\u898f\u683c\u6587\u4ef6\u3002",
      contactItems: ["\u6578\u5b78\u6a21\u578b\u8a2d\u8a08", "\u6a21\u64ec\u9a57\u8b49", "\u904a\u6232\u898f\u683c\u6587\u4ef6"],
      contactButton: "\u806f\u7d61\u65b9\u5f0f\u5f85\u88dc"
    };
  }

  return {
    eyebrow: "Service Profile",
    position: "Game Mathematics Model Designer",
    intro: "I provide game mathematics model design, probability analysis, simulation validation, and structured game specification documents.",
    metrics: ["100+ Game Models", "Simulation Data", "Bilingual Docs", "Probability Research"],
    browseModels: "Browse Game Models",
    contactMe: "Contact Me",
    servicesEyebrow: "Services",
    servicesTitle: "What I Provide",
    services: {
      model: { title: "Mathematics Models", items: ["RTP", "Hit Rate", "Volatility", "Max Win"] },
      simulation: { title: "Simulation Validation", items: ["Simulation Testing", "Data Analysis", "Long-run Validation"] },
      specification: { title: "Specification Documents", items: ["Game Rules", "Feature Definitions", "Chinese and English Docs"] }
    },
    workEyebrow: "Portfolio",
    workTitle: "Selected Work",
    work: {
      database: { title: "Game Model Database", items: ["100+ Game Models", "Six Core Metrics", "Simulation Data"] },
      research: { title: "Probability System Research", items: ["Slot and Non-slot Game Research", "Probability and Reward Mechanism Analysis"] }
    },
    resourcesEyebrow: "Supporting Proof",
    resourcesTitle: "External Resources",
    resources: { blogger: "Tutorial Articles", notion: "Research Notes", github: "Code and Tools", itch: "Playable Work" },
    contactEyebrow: "Collaboration",
    contactTitle: "Contact Me",
    contactText: "Available for mathematics model design, simulation validation, and structured game specification documents.",
    contactItems: ["Mathematics Model Design", "Simulation Validation", "Game Specification Documents"],
    contactButton: "Contact details pending"
  };
}
