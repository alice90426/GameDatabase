import type { ResearchArticle } from "@/lib/notion";

const RELATED_COUNT = 3;

export function getResearchNeighbors(article: ResearchArticle, all: ResearchArticle[]) {
  const sameLanguage = all.filter((item) => item.language === article.language);
  const index = sameLanguage.findIndex((item) => item.id === article.id);

  const related = sameLanguage
    .filter((item) => item.id !== article.id)
    .map((item) => ({
      item,
      score:
        item.tags.filter((tag) => article.tags.includes(tag)).length * 2 +
        (item.category && item.category === article.category ? 1 : 0)
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, RELATED_COUNT)
    .map(({ item }) => item);

  return {
    previous: index > 0 ? sameLanguage[index - 1] : null,
    next: index >= 0 && index < sameLanguage.length - 1 ? sameLanguage[index + 1] : null,
    related
  };
}
