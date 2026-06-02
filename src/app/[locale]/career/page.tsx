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
  const content = getDictionary(locale).career;

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
  const content = getDictionary(locale).career;

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
      title: content.resources.blogger.title,
      text: content.resources.blogger.text,
      href: "https://slotmathmodel.blogspot.com/"
    },
    {
      icon: <NotebookText size={20} />,
      title: content.resources.notion.title,
      text: content.resources.notion.text,
      href: "https://app.notion.com/p/7143abd96b7340ccacc97bacf8f3ea48?v=995db3faa1ca41d3b31052f6a34bceae"
    },
    {
      icon: <Github size={20} />,
      title: content.resources.github.title,
      text: content.resources.github.text,
      href: "https://github.com/alice90426"
    },
    {
      icon: <Play size={20} />,
      title: content.resources.itch.title,
      text: content.resources.itch.text,
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

          <div className="mt-8 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded border border-white/10 bg-white/10 sm:grid-cols-4">
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

function BulletList({ items, columns = false }: { items: readonly string[]; columns?: boolean }) {
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
  items: readonly string[];
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
