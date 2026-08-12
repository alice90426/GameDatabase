import { NextResponse } from "next/server";
import { getResearchImageByBlockId } from "@/lib/notion";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ blockId: string }> }
) {
  const { blockId } = await params;
  const imageUrl = await getResearchImageByBlockId(blockId);

  if (!imageUrl) {
    return new Response(null, {
      status: 404,
      headers: { "Cache-Control": "no-store" }
    });
  }

  return NextResponse.redirect(imageUrl, {
    status: 307,
    headers: {
      "Cache-Control": "public, max-age=300, s-maxage=300"
    }
  });
}
