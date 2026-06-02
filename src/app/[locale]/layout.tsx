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
    description: dictionary.common.description,
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

  const dictionary = getDictionary(locale);

  return (
    <div className="min-h-screen overflow-hidden">
      <div className="noise-overlay pointer-events-none fixed inset-0 opacity-70" />
      <Navbar locale={locale as Locale} />
      <main className="relative z-10">{children}</main>
      <footer className="relative z-10 border-t border-white/10 px-5 py-8 text-center text-sm text-slate-500">
        {dictionary.common.footer}
      </footer>
    </div>
  );
}
