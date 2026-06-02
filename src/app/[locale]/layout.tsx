import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import type { Locale } from "@/types/game";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const dictionary = getDictionary(locale);

  return {
    title: dictionary.common.badge,
    description:
      locale === "zh"
        ? "整理遊戲規格、數值特徵與玩法分類的資料庫。"
        : "A database for game specs, numerical traits, and play categories.",
    alternates: {
      canonical: `/${locale}`,
      languages: {
        "zh-Hant": "/zh",
        en: "/en"
      }
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <div className="min-h-screen overflow-hidden">
      <div className="noise-overlay pointer-events-none fixed inset-0 opacity-70" />
      <Navbar locale={locale as Locale} />
      <main className="relative z-10">{children}</main>
      <footer className="relative z-10 border-t border-white/10 px-5 py-8 text-center text-sm text-slate-500">
        2026 GAME DATABASE. Built for structured game data.
      </footer>
    </div>
  );
}
