import Link from "next/link";
import { Gamepad2, Mail } from "lucide-react";
import { getDictionary } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";
import { LanguageSwitch } from "@/components/language-switch";
import { MobileNav } from "@/components/mobile-nav";
import type { Locale } from "@/types/game";

type NavbarProps = {
  locale: Locale;
};

export function Navbar({ locale }: NavbarProps) {
  const dictionary = getDictionary(locale);

  const navItems = [
    { label: dictionary.nav.home, href: localizedPath(locale) },
    { label: dictionary.nav.games, href: localizedPath(locale, "/games") },
    { label: dictionary.nav.research, href: localizedPath(locale, "/research") },
    { label: dictionary.nav.services, href: localizedPath(locale, "/services") },
    { label: dictionary.nav.about, href: localizedPath(locale, "/about") }
  ];
  const contactHref = `mailto:${dictionary.about.contactLinks.email}?subject=${encodeURIComponent(
    dictionary.common.contactSubject
  )}&body=${encodeURIComponent(dictionary.common.contactBody)}`;

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-void/88 backdrop-blur-xl">
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4">
        <Link
          href={localizedPath(locale)}
          className="flex items-center gap-3 text-sm font-black tracking-[0.28em] text-white"
        >
          <span className="grid h-10 w-10 place-items-center rounded border border-neon/35 bg-neon/10 text-neon shadow-glow">
            <Gamepad2 size={22} />
          </span>
          <span className="hidden sm:inline">{dictionary.common.brand}</span>
        </Link>

        <div className="hidden items-center gap-1 rounded border border-white/10 bg-white/[0.04] p-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={contactHref}
            className="inline-flex h-10 items-center gap-2 rounded bg-neon px-3 text-sm font-black text-void transition hover:bg-white"
          >
            <Mail size={16} />
            {dictionary.nav.contact}
          </a>
          <LanguageSwitch
            locale={locale}
            label={dictionary.nav.language}
            ariaLabel={dictionary.common.switchLanguage}
          />
          <MobileNav items={navItems} menuLabel={dictionary.nav.menu} />
        </div>
      </nav>
    </header>
  );
}
