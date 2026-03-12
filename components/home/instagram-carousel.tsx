"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import type { InstagramPost } from "@/types/content";

type InstagramCarouselProps = {
  posts: InstagramPost[];
  source: "live" | "fallback";
};

const IMAGE_FALLBACK_SRC = "/images/instagram/post-1.svg";

export function InstagramCarousel({ posts, source }: InstagramCarouselProps) {
  const trackId = useId();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [carouselPosts, setCarouselPosts] = useState(posts);
  const [dataSource, setDataSource] = useState(source);
  const [failedImageIds, setFailedImageIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    let isCanceled = false;

    async function hydrateLivePosts() {
      try {
        const response = await fetch("/api/instagram", {
          headers: { Accept: "application/json" }
        });

        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as { posts?: InstagramPost[]; source?: "live" | "fallback" };
        const nextPosts = Array.isArray(payload.posts) ? payload.posts : [];

        if (isCanceled || nextPosts.length === 0) {
          return;
        }

        setCarouselPosts(nextPosts.slice(0, 8));
        setDataSource(payload.source === "live" ? "live" : "fallback");
        setFailedImageIds(new Set());
      } catch {
        // Keep initial fallback posts when the feed request fails.
      }
    }

    hydrateLivePosts();

    return () => {
      isCanceled = true;
    };
  }, []);

  if (carouselPosts.length === 0) {
    return null;
  }

  const scrollByCardWidth = (direction: "next" | "prev") => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    const firstCard = slider.querySelector<HTMLElement>("[data-instagram-card='true']");
    const cardWidth = firstCard ? firstCard.offsetWidth : slider.offsetWidth;
    const amount = direction === "next" ? cardWidth : -cardWidth;

    slider.scrollBy({ left: amount, behavior: "smooth" });

    trackEvent("instagram_carousel_navigate", {
      direction,
      source: dataSource,
      track_id: trackId
    });
  };

  return (
    <div className="rounded-3xl border border-brand-100 bg-brand-50 p-6 shadow-card sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl text-brand-900 sm:text-3xl">Latest on Instagram</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByCardWidth("prev")}
            className="rounded-full border border-brand-200 px-3 py-2 text-sm font-semibold text-brand-800 transition hover:bg-brand-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            aria-label="Scroll Instagram posts backward"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => scrollByCardWidth("next")}
            className="rounded-full border border-brand-200 px-3 py-2 text-sm font-semibold text-brand-800 transition hover:bg-brand-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            aria-label="Scroll Instagram posts forward"
          >
            Next
          </button>
        </div>
      </div>

      <div
        id="instagram-carousel-track"
        ref={sliderRef}
        className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
        role="region"
        aria-label="Instagram post carousel"
      >
        {carouselPosts.map((post) => (
          <article
            key={post.id}
            data-instagram-card="true"
            className="w-full min-w-full snap-start overflow-hidden rounded-2xl border border-brand-100 bg-brand-50 sm:min-w-[calc(50%-0.5rem)] lg:min-w-[calc(33.333%-0.67rem)]"
          >
            <Image
              src={failedImageIds.has(post.id) ? IMAGE_FALLBACK_SRC : post.imageUrl}
              alt={post.caption ? `Instagram post: ${post.caption}` : "Instagram post"}
              width={640}
              height={640}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              quality={62}
              // Cloudflare/OpenNext returns 404 for /_next/image when the source is an internal API URL.
              // These images are already normalized by /api/instagram/image, so bypass optimizer here.
              unoptimized
              className="h-56 w-full object-cover"
              onError={() => {
                setFailedImageIds((previous) => {
                  if (previous.has(post.id)) {
                    return previous;
                  }

                  const next = new Set(previous);
                  next.add(post.id);
                  return next;
                });
              }}
            />
            <div className="space-y-4 p-4 pb-5">
              {post.caption ? (
                <p className="line-clamp-4 text-base leading-relaxed text-brand-900/85">{post.caption}</p>
              ) : (
                <p className="text-base text-brand-900/70">IVSHI Instagram update</p>
              )}
              {post.publishedAt ? (
                <p className="text-xs uppercase tracking-[0.12em] text-brand-700">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  })}
                </p>
              ) : null}
              <Link
                href={post.postUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full bg-brand-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-brand-800 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                onClick={() => {
                  trackEvent("instagram_post_click", {
                    post_id: post.id,
                    source: dataSource,
                    destination: post.postUrl
                  });
                }}
              >
                View on Instagram
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
