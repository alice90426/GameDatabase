import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { cvPath, localizedPath } from "@/lib/routes";
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

  const title = `${dictionary.home.name} | ${dictionary.common.badge}`;

  return {
    title,
    description: dictionary.common.description,
    openGraph: {
      title,
      description: dictionary.common.description,
      type: "website",
      siteName: dictionary.common.brand,
      locale: locale === "zh" ? "zh_TW" : "en_US",
      url: `/${locale}`
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: dictionary.common.description
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
      <footer className="relative z-10 border-t border-white/10 px-5 py-8 text-sm text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4">
          <nav
            aria-label="Footer"
            className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-semibold text-slate-300"
          >
            <Link href={localizedPath(locale as Locale, "/articles")} className="hover:text-white">
              {dictionary.nav.articles}
            </Link>
            <Link href={localizedPath(locale as Locale, "/tools")} className="hover:text-white">
              {dictionary.nav.tools}
            </Link>
            <a href={cvPath(locale as Locale)} download className="hover:text-white">
              {dictionary.common.downloadCv}
            </a>
            <a href={`mailto:${dictionary.about.contactLinks.email}`} className="hover:text-white">
              Email
            </a>
            <a
              href={dictionary.about.contactLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              LinkedIn
            </a>
          </nav>
          <p className="text-center">{dictionary.common.footer}</p>
        </div>
      </footer>
    </div>
  );
}
