import type { Locale } from "@/types/game";

export function cvPath(locale: Locale) {
  return `/cv/Javier-Chiang-CV-${locale}.pdf`;
}

export function localizedPath(locale: Locale, path = "") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalizedPath === "/" ? "" : normalizedPath}`;
}
