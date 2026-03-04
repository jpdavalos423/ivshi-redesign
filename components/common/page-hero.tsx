import { CtaLinkButton } from "@/components/common/cta-link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import type { CtaLink } from "@/types/content";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  rightVisual?: ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  className,
  titleClassName,
  descriptionClassName,
  rightVisual
}: PageHeroProps) {
  return (
    <header className={cn("rounded-3xl bg-brand-50/85 p-8 shadow-card backdrop-blur-sm sm:p-12", className)}>
      <div className={cn("grid gap-8", rightVisual ? "items-center lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-10" : "")}>
        <div>
          {eyebrow ? (
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">{eyebrow}</p>
          ) : null}
          <h1 className={cn("max-w-3xl font-display text-3xl leading-tight text-brand-900 sm:text-5xl", titleClassName)}>
            {title}
          </h1>
          <p className={cn("mt-4 max-w-3xl text-base text-brand-900/80 sm:text-lg", descriptionClassName)}>
            {description}
          </p>
          {primaryCta || secondaryCta ? (
            <div className="mt-7 flex flex-wrap gap-3">
              {primaryCta ? <CtaLinkButton cta={primaryCta} variant="primary" /> : null}
              {secondaryCta ? <CtaLinkButton cta={secondaryCta} variant="secondary" /> : null}
            </div>
          ) : null}
        </div>
        {rightVisual ? (
          <div className="mx-auto w-full max-w-[250px] sm:max-w-[320px] lg:mx-0 lg:max-w-[380px]">{rightVisual}</div>
        ) : null}
      </div>
    </header>
  );
}
