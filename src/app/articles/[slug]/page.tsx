import { permanentRedirect } from "next/navigation";

export default async function ArticleEntryPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  permanentRedirect(`/en/articles/${slug}`);
}
