import { NextResponse } from "next/server";
import { fetchLiveInstagramPosts } from "@/lib/instagram-live";

export const revalidate = 900;
export const runtime = "edge";
const CACHE_CONTROL = "public, max-age=300, s-maxage=900, stale-while-revalidate=86400";

export async function GET() {
  const posts = await fetchLiveInstagramPosts();

  if (posts.length === 0) {
    return NextResponse.json(
      { error: "Instagram upstream request failed.", posts: [] },
      { status: 502, headers: { "Cache-Control": "public, max-age=60, s-maxage=60" } }
    );
  }

  return NextResponse.json({ posts, source: "live" }, { status: 200, headers: { "Cache-Control": CACHE_CONTROL } });
}
