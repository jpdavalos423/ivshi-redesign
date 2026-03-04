import type { Metadata } from "next";
import { PageHero } from "@/components/common/page-hero";
import { Section } from "@/components/common/section";
import { PillarCard } from "@/components/programs/pillar-card";
import { programPillars } from "@/content/pillars";

export const metadata: Metadata = {
  title: "Programs",
  description: "Explore IVSHI's Service, Education, and Public Health program pillars.",
  alternates: { canonical: "/programs" }
};

export default function ProgramsPage() {
  return (
    <>
      <Section className="pt-12 sm:pt-16">
        <PageHero
          eyebrow="Programs"
          title="Three pillars that guide IVSHI impact"
          description="Each IVSHI pillar links to dedicated Notion resources with program details, opportunities, and updates."
        />
      </Section>

      <Section className="pt-4 pb-16">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {programPillars.map((pillar) => (
            <PillarCard key={pillar.id} pillar={pillar} />
          ))}
        </div>
      </Section>
    </>
  );
}
