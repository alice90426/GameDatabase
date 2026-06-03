import { NextResponse } from "next/server";
import { getResearchCoverByPageId } from "@/lib/notion";

export const revalidate = 3600;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ pageId: string }> }
) {
  const { pageId } = await params;
  const cover = await getResearchCoverByPageId(pageId);

  if (!cover) {
    return new Response(null, {
      status: 404,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400"
      }
    });
  }

  return NextResponse.redirect(cover, {
    status: 307,
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400"
    }
  });
}
