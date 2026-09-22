import type { Metadata } from "next";
import type { Locale } from "@/types/game";

// Existing research notes are written in Traditional Chinese. Notion's optional
// Language property can override this for an individual English article.
export function researchLanguage(value: string): Locale {
  const language = value.trim().toLowerCase();
  return ["en", "en-us", "en-gb", "english", "英文", "英語"].includes(language) ? "en" : "zh";
}

export function researchPath(article: { slug: string; language: Locale }) {
  return `/${article.language}/research/${article.slug}`;
}

export function researchAlternates(article: { slug: string; language: Locale }): NonNullable<Metadata["alternates"]> {
  // Changing navigation language does not translate the Notion body.
  // Do not advertise these copies as translated versions with hreflang.
  return { canonical: researchPath(article) };
}

export function researchLanguageTag(language: Locale) {
  return language === "zh" ? "zh-Hant" : "en";
}
