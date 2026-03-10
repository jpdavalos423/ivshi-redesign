import { CtaLinkButton } from "@/components/common/cta-link";
import type { CtaLink, PillarLink } from "@/types/content";

type PillarCardProps = {
  pillar: PillarLink;
};

export function PillarCard({ pillar }: PillarCardProps) {
  const hasLink = pillar.notionUrl.trim().length > 0;

  const cta: CtaLink = {
    id: `pillar_${pillar.id}_open_notion`,
    label: hasLink ? pillar.ctaLabel : "Coming soon",
    href: hasLink ? pillar.notionUrl : "#",
    external: true,
    eventName: `cta_pillar_${pillar.id}_click`
  };

  return (
    <article className="flex h-full flex-col rounded-2xl border border-brand-100 bg-brand-50 p-6 shadow-card">
      <h3 className="font-display text-2xl text-brand-900">{pillar.title}</h3>
      <p className="mt-3 flex-1 text-base leading-relaxed text-brand-900/80">{pillar.description}</p>
      <div className="mt-6">
        <CtaLinkButton cta={cta} variant="ghost" disabled={!hasLink} className="w-full" />
      </div>
    </article>
  );
}
