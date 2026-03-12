import Image from "next/image";
import type { Metadata } from "next";
import { PageHero } from "@/components/common/page-hero";
import { Section } from "@/components/common/section";
import { siteConfig } from "@/content/site";
import { teamMembers } from "@/content/team";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Board",
  description: "The IVSHI board guides strategy, student leadership, and community partnerships.",
  pathname: "/team",
  keywords: ["IVSHI board", "student leadership", "Imperial Valley"]
});

export default function TeamPage() {
  return (
    <>
      <Section className="pt-12 sm:pt-16">
        <PageHero
          eyebrow="Board"
          title="Meet the IVSHI Board"
          description="The IVSHI board guides strategy, student leadership, and community partnerships."
          descriptionClassName="text-balance"
          primaryCta={siteConfig.ctas.teamPrimary}
        />
      </Section>

      <Section className="pt-4 pb-16">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 md:grid-cols-2">
          {teamMembers.map((member) => (
            // Future enhancement: make each card open a short member bio.
            <article key={member.name} className="w-full overflow-hidden rounded-2xl border border-brand-100 bg-brand-50 shadow-card">
              <div className="w-full bg-brand-100">
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-xl">
                  <Image
                    src={member.photoUrl ?? "/images/team/team-placeholder.svg"}
                    alt={`${member.name} photo`}
                    fill
                    className={`object-cover ${member.photoPositionClassName ?? ""}`}
                  />
                </div>
              </div>
              <div className="p-5">
                <h2 className="font-display text-2xl text-brand-900">{member.name}</h2>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.12em] text-brand-700">{member.role}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
