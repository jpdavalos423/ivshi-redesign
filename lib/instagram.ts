import type { InstagramPost } from "@/types/content";

type UnknownRecord = Record<string, unknown>;

function toStringOrUndefined(value: unknown): string | undefined {
  if (typeof value === "string" && value.trim().length > 0) {
    return value;
  }

  return undefined;
}

function normalizePost(entry: UnknownRecord): InstagramPost | null {
  const id = toStringOrUndefined(entry.id) ?? toStringOrUndefined(entry.pk);
  const imageUrl =
    toStringOrUndefined(entry.imageUrl) ??
    toStringOrUndefined(entry.image_url) ??
    toStringOrUndefined(entry.media_url);
  const postUrl =
    toStringOrUndefined(entry.postUrl) ??
    toStringOrUndefined(entry.post_url) ??
    toStringOrUndefined(entry.permalink);

  if (!id || !imageUrl || !postUrl) {
    return null;
  }

  return {
    id,
    imageUrl,
    postUrl,
    caption: toStringOrUndefined(entry.caption),
    publishedAt:
      toStringOrUndefined(entry.publishedAt) ??
      toStringOrUndefined(entry.published_at) ??
      toStringOrUndefined(entry.timestamp)
  };
}

function parseFeedPayload(payload: unknown): InstagramPost[] {
  if (!payload || typeof payload !== "object") {
    return [];
  }

  const root = payload as UnknownRecord;
  const collection =
    (Array.isArray(root.posts) && root.posts) ||
    (Array.isArray(root.data) && root.data) ||
    (Array.isArray(root.items) && root.items) ||
    [];

  return collection
    .filter((entry): entry is UnknownRecord => Boolean(entry && typeof entry === "object"))
    .map(normalizePost)
    .filter((entry): entry is InstagramPost => entry !== null)
    .slice(0, 8);
}

export async function getInstagramPosts(
  fallbackPosts: InstagramPost[]
): Promise<{ posts: InstagramPost[]; source: "live" | "fallback" }> {
  const feedUrl = process.env.NEXT_PUBLIC_INSTAGRAM_FEED_URL;

  if (!feedUrl) {
    return { posts: fallbackPosts.slice(0, 8), source: "fallback" };
  }

  try {
    const response = await fetch(feedUrl, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      return { posts: fallbackPosts.slice(0, 8), source: "fallback" };
    }

    const payload = (await response.json()) as unknown;
    const parsed = parseFeedPayload(payload);

    if (parsed.length === 0) {
      return { posts: fallbackPosts.slice(0, 8), source: "fallback" };
    }

    return { posts: parsed, source: "live" };
  } catch {
    return { posts: fallbackPosts.slice(0, 8), source: "fallback" };
  }
}
