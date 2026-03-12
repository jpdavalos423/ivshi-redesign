"use client";

import Link from "next/link";
import { trackCtaClick, trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { CtaLink } from "@/types/content";

type CtaLinkProps = {
  cta: CtaLink;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  onClick?: () => void;
};

const variantStyles: Record<NonNullable<CtaLinkProps["variant"]>, string> = {
  primary:
    "bg-brand-700 text-white hover:bg-brand-800 hover:text-white focus-visible:outline-brand-700",
  secondary:
    "bg-brand-500 text-white hover:bg-brand-600 hover:text-white focus-visible:outline-brand-700",
  ghost:
    "bg-transparent text-brand-800 ring-1 ring-brand-400 hover:bg-brand-100 focus-visible:outline-brand-700"
};

export function CtaLinkButton({
  cta,
  className,
  variant = "primary",
  disabled = false,
  onClick
}: CtaLinkProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    disabled ? "cursor-not-allowed bg-brand-200 text-brand-700/60" : variantStyles[variant],
    className
  );

  if (disabled) {
    return (
      <span aria-disabled="true" className={classes}>
        {cta.label}
      </span>
    );
  }

  const linkProps = cta.external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Link
      href={cta.href}
      className={classes}
      onClick={() => {
        trackCtaClick(cta.id, cta.label, cta.href);
        trackEvent(cta.eventName, {
          cta_id: cta.id,
          cta_label: cta.label,
          cta_destination: cta.href
        });
        onClick?.();
      }}
      {...linkProps}
    >
      {cta.label}
    </Link>
  );
}
