import { NextResponse } from "next/server";
import { fetchLiveInstagramPosts } from "@/lib/instagram-live";

export const revalidate = 900;
export const runtime = "edge";

export async function GET() {
  const posts = await fetchLiveInstagramPosts();

  if (posts.length === 0) {
    return NextResponse.json({ error: "Instagram upstream request failed.", posts: [] }, { status: 502 });
  }

  return NextResponse.json({ posts, source: "live" }, { status: 200 });
}
