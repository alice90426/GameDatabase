import { NextResponse } from "next/server";
import { getResearchCoverByPageId } from "@/lib/notion";

// Notion-hosted file URLs are signed and expire after ~1 hour, so this redirect
// must be cached for much less than that (and never served stale for long).
export const dynamic = "force-dynamic";

const CACHE_CONTROL = "public, max-age=60, s-maxage=300, stale-while-revalidate=300";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ pageId: string }> }
) {
  const { pageId } = await params;
  const cover = await getResearchCoverByPageId(pageId);

  if (!cover) {
    return new Response(null, {
      status: 404,
      headers: { "Cache-Control": "public, s-maxage=300" }
    });
  }

  return NextResponse.redirect(cover, {
    status: 307,
    headers: { "Cache-Control": CACHE_CONTROL }
  });
}
