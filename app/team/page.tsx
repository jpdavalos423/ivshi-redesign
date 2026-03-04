import Image from "next/image";
import type { Metadata } from "next";
import { PageHero } from "@/components/common/page-hero";
import { Section } from "@/components/common/section";
import { siteConfig } from "@/content/site";
import { teamMembers } from "@/content/team";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the student leaders and coordinators behind IVSHI.",
  alternates: { canonical: "/team" }
};

export default function TeamPage() {
  return (
    <>
      <Section className="pt-12 sm:pt-16">
        <PageHero
          eyebrow="Team"
          title="The people moving IVSHI forward"
          description="Our leadership and program coordinators work with students, schools, and community partners to expand health-focused opportunities."
          primaryCta={siteConfig.ctas.teamPrimary}
        />
      </Section>

      <Section className="pt-4 pb-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <article key={member.name} className="overflow-hidden rounded-2xl border border-brand-100 bg-brand-50 shadow-card">
              <div className="relative h-52 w-full bg-brand-100">
                <Image
                  src={member.photoUrl ?? "/images/team/team-placeholder.svg"}
                  alt={`${member.name} photo`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h2 className="font-display text-2xl text-brand-900">{member.name}</h2>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.08em] text-brand-700">{member.role}</p>
                {member.bio ? <p className="mt-3 text-sm text-brand-900/80">{member.bio}</p> : null}
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
