"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useRef } from "react";
import { trackEvent } from "@/lib/analytics";
import type { InstagramPost } from "@/types/content";

type InstagramCarouselProps = {
  posts: InstagramPost[];
  source: "live" | "fallback";
};

export function InstagramCarousel({ posts, source }: InstagramCarouselProps) {
  const trackId = useId();
  const sliderRef = useRef<HTMLDivElement>(null);

  if (posts.length === 0) {
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
      source,
      track_id: trackId
    });
  };

  return (
    <div className="rounded-3xl border border-brand-100 bg-brand-50 p-6 shadow-card sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl text-brand-900 sm:text-3xl">Latest on Instagram</h2>
          <p className="mt-1 text-sm text-brand-900/75">
            {source === "live"
              ? "Live feed from IVSHI Instagram posts"
              : "Curated posts shown while live feed is unavailable"}
          </p>
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
        {posts.map((post) => (
          <article
            key={post.id}
            data-instagram-card="true"
            className="w-full min-w-full snap-start overflow-hidden rounded-2xl border border-brand-100 bg-brand-50 sm:min-w-[calc(50%-0.5rem)] lg:min-w-[calc(33.333%-0.67rem)]"
          >
            <Image
              src={post.imageUrl}
              alt={post.caption ? `Instagram post: ${post.caption}` : "Instagram post"}
              width={640}
              height={640}
              className="h-52 w-full object-cover"
            />
            <div className="space-y-3 p-4">
              {post.caption ? (
                <p className="max-h-16 overflow-hidden text-sm text-brand-900/85">{post.caption}</p>
              ) : (
                <p className="text-sm text-brand-900/70">IVSHI Instagram update</p>
              )}
              {post.publishedAt ? (
                <p className="text-xs uppercase tracking-[0.08em] text-brand-700">
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
                className="inline-flex rounded-full bg-brand-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-brand-800 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                onClick={() => {
                  trackEvent("instagram_post_click", {
                    post_id: post.id,
                    source,
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
