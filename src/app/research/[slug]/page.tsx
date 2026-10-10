import { notFound, permanentRedirect } from "next/navigation";
import { researchPath } from "@/lib/research-language";
import { getResearchArticleBySlug } from "@/lib/notion";

export default async function ResearchArticleEntryPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getResearchArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Notes live under the locale that matches their language.
  permanentRedirect(researchPath(article));
}
