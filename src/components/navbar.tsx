import Link from "next/link";
import { Gamepad2 } from "lucide-react";
import { getDictionary } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";
import { LanguageSwitch } from "@/components/language-switch";
import type { Locale } from "@/types/game";

type NavbarProps = {
  locale: Locale;
};

export function Navbar({ locale }: NavbarProps) {
  const dictionary = getDictionary(locale);

  const navItems = [
    { label: dictionary.nav.home, href: localizedPath(locale) },
    { label: dictionary.nav.games, href: localizedPath(locale, "/games") },
    { label: dictionary.nav.services, href: localizedPath(locale, "/services") },
    { label: dictionary.nav.about, href: localizedPath(locale, "/about") }
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-void/88 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link
          href={localizedPath(locale)}
          className="flex items-center gap-3 text-sm font-black tracking-[0.28em] text-white"
        >
          <span className="grid h-10 w-10 place-items-center rounded border border-neon/35 bg-neon/10 text-neon shadow-glow">
            <Gamepad2 size={22} />
          </span>
          <span>{dictionary.common.brand}</span>
        </Link>

        <div className="hidden items-center gap-1 rounded border border-white/10 bg-white/[0.04] p-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitch
            locale={locale}
            label={dictionary.nav.language}
            ariaLabel={dictionary.common.switchLanguage}
          />
        </div>
      </nav>
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 pb-4 md:hidden">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="shrink-0 rounded border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-300"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
