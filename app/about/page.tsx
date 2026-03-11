import type { Metadata } from "next";
import { PageHero } from "@/components/common/page-hero";
import { Section } from "@/components/common/section";
import { aboutContent } from "@/content/about";
import { siteConfig } from "@/content/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About",
  description: "Learn about IVSHI's mission, story, goals, and the communities it serves.",
  pathname: "/about",
  keywords: ["about IVSHI", "mission", "community outreach"]
});

export default function AboutPage() {
  return (
    <>
      <Section className="pt-12 sm:pt-16">
        <PageHero
          eyebrow="About IVSHI"
          title="Student-led health education and service for Imperial Valley"
          description={aboutContent.story}
          primaryCta={siteConfig.ctas.aboutPrimary}
        />
      </Section>

      <Section className="pt-4 pb-16">
        <div className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-2xl border border-brand-100 bg-brand-50 p-6 shadow-card">
            <h2 className="font-display text-2xl text-brand-900">Our Mission</h2>
            <p className="mt-3 text-base leading-relaxed text-brand-900/80">{aboutContent.mission}</p>
          </article>
          <article className="rounded-2xl border border-brand-100 bg-brand-50 p-6 shadow-card">
            <h2 className="font-display text-2xl text-brand-900">Communities We Serve</h2>
            <p className="mt-3 text-base leading-relaxed text-brand-900/80">{aboutContent.communitiesServed}</p>
          </article>
        </div>

        <article className="mt-4 rounded-2xl border border-brand-100 bg-brand-50 p-6 shadow-card">
          <h2 className="font-display text-2xl text-brand-900">Core Goals</h2>
          <ul className="mt-4 space-y-3 text-base text-brand-900/80">
            {aboutContent.goals.map((goal) => (
              <li key={goal} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-brand-500" aria-hidden="true" />
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </article>
      </Section>
    </>
  );
}
