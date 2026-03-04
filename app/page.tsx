import type { Metadata } from "next";
import Image from "next/image";
import { CtaLinkButton } from "@/components/common/cta-link";
import { PageHero } from "@/components/common/page-hero";
import { Section } from "@/components/common/section";
import { ImpactStats } from "@/components/home/impact-stats";
import { InstagramCarousel } from "@/components/home/instagram-carousel";
import { PillarCard } from "@/components/programs/pillar-card";
import { fallbackInstagramPosts } from "@/content/instagram";
import { impactStats } from "@/content/impact";
import { involvementOptions } from "@/content/get-involved";
import { programPillars } from "@/content/pillars";
import { siteConfig } from "@/content/site";
import { getInstagramPosts } from "@/lib/instagram";

export const metadata: Metadata = {
  title: "Home",
  description:
    "IVSHI connects Imperial Valley students and families to mentorship, education, and public health opportunities.",
  alternates: { canonical: "/" }
};

export default async function HomePage() {
  const instagram = await getInstagramPosts(fallbackInstagramPosts);

  return (
    <>
      <Section className="pt-12 sm:pt-16">
        <PageHero
          title={siteConfig.name}
          description="Building student leaders for healthier Imperial Valley communities."
          titleClassName="max-w-4xl text-4xl tracking-tight sm:text-5xl lg:text-6xl"
          descriptionClassName="max-w-3xl text-lg text-brand-900/85 sm:text-2xl"
          primaryCta={siteConfig.ctas.homePrimary}
          secondaryCta={siteConfig.ctas.homeSecondary}
          rightVisual={
            <Image
              src="/images/logo/logo-1024.webp"
              alt="Imperial Valley Student Health Initiative logo"
              width={1024}
              height={1024}
              className="h-auto w-full"
              priority
            />
          }
        />
      </Section>

      <Section id="impact" className="pt-4">
        <div className="mb-5">
          <h2 className="font-display text-3xl text-brand-900">Community Impact</h2>
          <p className="mt-2 max-w-2xl text-brand-900/75">
            IVSHI programs support student growth while strengthening community health education and outreach.
          </p>
        </div>
        <ImpactStats stats={impactStats} />
      </Section>

      <Section id="program-pillars" className="pt-4">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl text-brand-900">Program Pillars</h2>
            <p className="mt-2 max-w-2xl text-brand-900/75">
              Explore the core service areas that shape IVSHI opportunities for students and local families.
            </p>
          </div>
          <CtaLinkButton cta={siteConfig.ctas.homeSecondary} variant="ghost" className="hidden sm:inline-flex" />
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {programPillars.map((pillar) => (
            <PillarCard key={pillar.id} pillar={pillar} />
          ))}
        </div>
      </Section>

      <Section id="get-involved" className="pt-4">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl text-brand-900">Get Involved</h2>
            <p className="mt-2 max-w-2xl text-brand-900/75">
              Choose how you want to participate and make an impact through IVSHI programs.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {involvementOptions.map((option) => (
            <article key={option.id} className="rounded-2xl border border-brand-100 bg-brand-50 p-6 shadow-card">
              <h3 className="font-display text-2xl text-brand-900">{option.title}</h3>
              <p className="mt-2 text-sm text-brand-900/80">{option.description}</p>
              <div className="mt-5">
                <CtaLinkButton cta={option.cta} variant="secondary" />
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section id="instagram" className="pt-4 pb-16">
        <InstagramCarousel posts={instagram.posts} source={instagram.source} />
      </Section>
    </>
  );
}
