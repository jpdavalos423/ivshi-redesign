import type { InstagramPost } from "@/types/content";
import { fetchLiveInstagramPosts } from "@/lib/instagram-live";

type UnknownRecord = Record<string, unknown>;
const REVALIDATE_SECONDS = 900;

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

function shouldUseConfiguredFeedUrl(configuredFeedUrl?: string): configuredFeedUrl is string {
  if (!configuredFeedUrl || configuredFeedUrl.includes("instagram.com/")) {
    return false;
  }

  const isLocalhostFeed = configuredFeedUrl.includes("://localhost") || configuredFeedUrl.includes("://127.0.0.1");

  return !(process.env.NODE_ENV === "production" && isLocalhostFeed);
}

export async function getInstagramPosts(
  fallbackPosts: InstagramPost[]
): Promise<{ posts: InstagramPost[]; source: "live" | "fallback" }> {
  const direct = await fetchLiveInstagramPosts();
  if (direct.length > 0) {
    return { posts: direct, source: "live" };
  }

  const configuredFeedUrl = process.env.NEXT_PUBLIC_INSTAGRAM_FEED_URL;
  if (!shouldUseConfiguredFeedUrl(configuredFeedUrl)) {
    return { posts: fallbackPosts.slice(0, 8), source: "fallback" };
  }

  try {
    const response = await fetch(configuredFeedUrl, {
      headers: { Accept: "application/json" },
      next: { revalidate: REVALIDATE_SECONDS }
    });

    if (response.ok) {
      const payload = (await response.json()) as unknown;
      const parsed = parseFeedPayload(payload);

      if (parsed.length > 0) {
        return { posts: parsed, source: "live" };
      }
    }
  } catch {
    // Fall through to direct fetch fallback.
  }

  return { posts: fallbackPosts.slice(0, 8), source: "fallback" };
}
