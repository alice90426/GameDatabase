import type { ResearchArticle } from "@/lib/notion";

// Picked by analysis volume (text length); falls back to the newest notes.
const featuredResearchTitles = [
  "野狼DISCO (CQ9)",
  "King Kong Cash (Blueprint)",
  "Blazing X (Bally)"
];

export function pickFeaturedResearch(articles: ResearchArticle[]) {
  const pinned = featuredResearchTitles
    .map((title) => articles.find((article) => article.title.trim() === title))
    .filter((article): article is ResearchArticle => Boolean(article));

  return pinned.length === featuredResearchTitles.length
    ? pinned
    : articles.slice(0, featuredResearchTitles.length);
}
