"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { InstagramPost } from "@/types/content";

const InstagramCarousel = dynamic(
  () => import("@/components/home/instagram-carousel").then((module) => module.InstagramCarousel),
  { ssr: false }
);

type LazyInstagramCarouselProps = {
  posts: InstagramPost[];
  source: "live" | "fallback";
};

export function LazyInstagramCarousel({ posts, source }: LazyInstagramCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldRenderCarousel, setShouldRenderCarousel] = useState(false);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) {
          return;
        }

        setShouldRenderCarousel(true);
        observer.disconnect();
      },
      {
        rootMargin: "300px 0px"
      }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
      {shouldRenderCarousel ? (
        <InstagramCarousel posts={posts} source={source} />
      ) : (
        <div className="rounded-3xl border border-brand-100 bg-brand-50 p-6 shadow-card sm:p-8">
          <h2 className="font-display text-2xl text-brand-900 sm:text-3xl">Latest on Instagram</h2>
          <p className="mt-4 text-brand-900/75">Loading posts...</p>
        </div>
      )}
    </div>
  );
}
