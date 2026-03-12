import { NextResponse } from "next/server";
import { fallbackInstagramPosts } from "@/content/instagram";
import { fetchLiveInstagramPostsResult } from "@/lib/instagram-live";

export const revalidate = 900;
export const runtime = "edge";
const CACHE_CONTROL = "public, max-age=300, s-maxage=900, stale-while-revalidate=86400";

export async function GET() {
  const { posts, failureReason } = await fetchLiveInstagramPostsResult();

  if (posts.length > 0) {
    console.info(`[instagram-api] source=live posts=${posts.length}`);
    return NextResponse.json({ posts, source: "live" }, { status: 200, headers: { "Cache-Control": CACHE_CONTROL } });
  }

  const fallbackPosts = fallbackInstagramPosts.slice(0, 8);
  const reason = failureReason ?? "parse_empty";

  console.warn(`[instagram-api] source=fallback reason=${reason} posts=${fallbackPosts.length}`);

  return NextResponse.json(
    { posts: fallbackPosts, source: "fallback" },
    { status: 200, headers: { "Cache-Control": CACHE_CONTROL } }
  );
}
