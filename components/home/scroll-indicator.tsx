"use client";

import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { motion } from "motion/react";

type ScrollIndicatorProps = {
  href: string;
  delay?: number;
};

export function ScrollIndicator({ href, delay = 0.9 }: ScrollIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: "easeOut" }}
      className="pointer-events-none absolute inset-x-0 bottom-5 z-10 flex justify-center sm:bottom-10"
    >
      <div className="pointer-events-auto">
        <Link
          href={href}
          aria-label="Scroll down"
          className="inline-flex size-12 items-center justify-center rounded-full border border-white/50 bg-black/20 text-white backdrop-blur-sm transition duration-200 transform-gpu will-change-transform hover:-translate-y-px hover:bg-black/30 hover:shadow-[0_0_8px_rgba(255,255,255,0.24)]"
        >
          <ChevronDownIcon className="size-6 text-white" />
        </Link>
      </div>
    </motion.div>
  );
}
