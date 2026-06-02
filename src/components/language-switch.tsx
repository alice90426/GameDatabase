"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import type { Locale } from "@/types/game";

type LanguageSwitchProps = {
  locale: Locale;
  label: string;
};

export function LanguageSwitch({ locale, label }: LanguageSwitchProps) {
  const pathname = usePathname();
  const nextLocale: Locale = locale === "zh" ? "en" : "zh";
  const pathParts = pathname.split("/");

  if (pathParts[1] === "zh" || pathParts[1] === "en") {
    pathParts[1] = nextLocale;
  } else {
    pathParts.splice(1, 0, nextLocale);
  }

  const href = pathParts.join("/");

  return (
    <Link
      href={href}
      className="inline-flex h-10 items-center gap-2 rounded border border-white/10 px-3 text-sm font-semibold text-slate-200 transition hover:border-neon/50 hover:text-neon"
      aria-label="Switch language"
    >
      <Languages size={16} />
      {label}
    </Link>
  );
}
