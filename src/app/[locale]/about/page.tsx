import type { Metadata } from "next";
import { Code2, Database, Layers3, Sparkles } from "lucide-react";
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
  const dictionary = getDictionary(locale);

  const dataFocus =
    locale === "zh"
      ? [
          "每款遊戲只保留資料庫真正需要的規格欄位",
          "用 genre 與 tags 做分類，用波動度做快速篩選",
          "中獎率、RTP、盤面大小與連線方式統一以文字格式維護"
        ]
      : [
          "Each game keeps only the fields needed by the database",
          "Genre and tags handle classification, while volatility supports quick filtering",
          "Hit rate, RTP, board size, and line mechanics are maintained as text values"
        ];

  const fields = [
    "id",
    "genre",
    "hitRate",
    "volatility",
    "rtp",
    "boardSize",
    "lineMechanic",
    "tags"
  ];

  return (
    <section className="px-5 py-14">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="rounded border border-white/10 bg-panel/80 p-6 shadow-2xl shadow-black/25">
            <div className="grid h-20 w-20 place-items-center rounded border border-neon/30 bg-neon/10 text-neon shadow-glow">
              <Database size={36} />
            </div>
            <p className="mt-8 text-sm font-black uppercase tracking-[0.22em] text-neon">
              {dictionary.common.studio}
            </p>
            <h1 className="mt-3 text-4xl font-black text-white">
              {dictionary.about.title}
            </h1>
            <p className="mt-4 text-lg font-bold text-slate-200">
              {dictionary.about.role}
            </p>
            <p className="mt-5 leading-8 text-slate-300">
              {dictionary.about.intro}
            </p>
          </aside>

          <div className="space-y-6">
            <ResumeSection
              icon={<Layers3 size={22} />}
              title={dictionary.about.experience}
            >
              <div className="grid gap-3">
                {dataFocus.map((item) => (
                  <div
                    key={item}
                    className="rounded border border-white/10 bg-white/[0.04] p-4 text-slate-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </ResumeSection>

            <ResumeSection icon={<Code2 size={22} />} title={dictionary.about.skills}>
              <div className="flex flex-wrap gap-2">
                {fields.map((field) => (
                  <span
                    key={field}
                    className="rounded border border-white/10 bg-void/80 px-3 py-2 text-sm font-semibold text-slate-200"
                  >
                    {field}
                  </span>
                ))}
              </div>
            </ResumeSection>

            <ResumeSection
              icon={<Sparkles size={22} />}
              title={dictionary.about.contact}
            >
              <p className="leading-8 text-slate-300">
                {dictionary.about.contactText}
              </p>
            </ResumeSection>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResumeSection({
  icon,
  title,
  children
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded border border-white/10 bg-panel/70 p-6">
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded border border-neon/30 bg-neon/10 text-neon">
          {icon}
        </span>
        <h2 className="text-2xl font-black text-white">{title}</h2>
      </div>
      {children}
    </section>
  );
}
