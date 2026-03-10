import { NextResponse } from "next/server";

type UnknownRecord = Record<string, unknown>;

type ApiPost = {
  id: string;
  imageUrl: string;
  postUrl: string;
  caption?: string;
  publishedAt?: string;
};

const INSTAGRAM_APP_ID = "936619743392459";
const MAX_POSTS = 8;
const REVALIDATE_SECONDS = 900;

export const revalidate = REVALIDATE_SECONDS;

function toStringOrUndefined(value: unknown): string | undefined {
  if (typeof value === "string" && value.trim().length > 0) {
    return value;
  }

  return undefined;
}

function extractUsername(profileUrl: string): string | null {
  try {
    const parsed = new URL(profileUrl);
    const segments = parsed.pathname.split("/").filter(Boolean);
    const firstSegment = segments[0];

    if (!firstSegment) {
      return null;
    }

    return firstSegment.replace(/^@/, "");
  } catch {
    return null;
  }
}

function normalizeNode(entry: UnknownRecord): ApiPost | null {
  const id = toStringOrUndefined(entry.id);
  const shortcode = toStringOrUndefined(entry.shortcode);
  const imageUrl =
    toStringOrUndefined(entry.display_url) ??
    toStringOrUndefined(entry.thumbnail_src) ??
    toStringOrUndefined(entry.image_url) ??
    toStringOrUndefined(entry.media_url);

  if (!id || !shortcode || !imageUrl) {
    return null;
  }

  const captionRoot = entry.edge_media_to_caption as UnknownRecord | undefined;
  const captionEdges = Array.isArray(captionRoot?.edges) ? captionRoot.edges : [];
  const firstCaption = captionEdges[0] as UnknownRecord | undefined;
  const captionNode = firstCaption?.node as UnknownRecord | undefined;
  const caption = toStringOrUndefined(captionNode?.text);
  const takenAtTimestamp = typeof entry.taken_at_timestamp === "number" ? entry.taken_at_timestamp : undefined;

  return {
    id,
    imageUrl,
    postUrl: `https://www.instagram.com/p/${shortcode}/`,
    caption,
    publishedAt: takenAtTimestamp ? new Date(takenAtTimestamp * 1000).toISOString() : undefined
  };
}

function parseInstagramPayload(payload: unknown): ApiPost[] {
  if (!payload || typeof payload !== "object") {
    return [];
  }

  const root = payload as UnknownRecord;
  const data = root.data as UnknownRecord | undefined;
  const user = data?.user as UnknownRecord | undefined;
  const timeline = user?.edge_owner_to_timeline_media as UnknownRecord | undefined;
  const edges = Array.isArray(timeline?.edges) ? timeline.edges : [];

  const seen = new Set<string>();

  return edges
    .map((edge) => (edge && typeof edge === "object" ? (edge as UnknownRecord).node : null))
    .filter((node): node is UnknownRecord => Boolean(node && typeof node === "object"))
    .map(normalizeNode)
    .filter((node): node is ApiPost => node !== null)
    .filter((node) => {
      if (seen.has(node.id)) {
        return false;
      }

      seen.add(node.id);
      return true;
    })
    .slice(0, MAX_POSTS);
}

export async function GET() {
  const profileUrl = process.env.INSTAGRAM_PROFILE_URL;

  if (!profileUrl) {
    return NextResponse.json(
      { error: "Missing INSTAGRAM_PROFILE_URL environment variable.", posts: [] },
      { status: 500 }
    );
  }

  const username = extractUsername(profileUrl);

  if (!username) {
    return NextResponse.json(
      { error: "INSTAGRAM_PROFILE_URL must include a valid Instagram username path.", posts: [] },
      { status: 500 }
    );
  }

  const upstreamUrl = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(username)}`;

  try {
    const response = await fetch(upstreamUrl, {
      headers: {
        Accept: "application/json",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        "X-IG-App-ID": INSTAGRAM_APP_ID,
        Referer: `https://www.instagram.com/${username}/`
      },
      next: { revalidate: REVALIDATE_SECONDS }
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Instagram upstream request failed with status ${response.status}.`, posts: [] },
        { status: 502 }
      );
    }

    const payload = (await response.json()) as unknown;
    const posts = parseInstagramPayload(payload);

    if (posts.length === 0) {
      return NextResponse.json(
        { error: "Instagram response did not contain parseable posts.", posts: [] },
        { status: 502 }
      );
    }

    return NextResponse.json({ posts, source: "live" }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Instagram upstream request failed.", posts: [] }, { status: 502 });
  }
}
