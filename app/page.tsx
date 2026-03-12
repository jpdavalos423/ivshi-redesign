import type { Metadata } from "next";
import { CtaLinkButton } from "@/components/common/cta-link";
import { Section } from "@/components/common/section";
import { HomeHero } from "@/components/home/home-hero";
import { ImpactStats } from "@/components/home/impact-stats";
import { LazyInstagramCarousel } from "@/components/home/lazy-instagram-carousel";
import { fallbackInstagramPosts } from "@/content/instagram";
import { impactStats } from "@/content/impact";
import { involvementOptions } from "@/content/get-involved";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Imperial Valley Student Health Initiative",
  description:
    "IVSHI connects Imperial Valley students and families to mentorship, education, and public health opportunities.",
  pathname: "/",
  keywords: ["community health", "student leadership", "Imperial County"]
});

export const revalidate = 900;

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <Section id="impact" className="scroll-mt-20 pt-8 sm:scroll-mt-24">
        <div className="mb-5">
          <h2 className="font-display text-3xl text-brand-900">Community Impact</h2>
          <p className="mt-2 max-w-2xl text-brand-900/75">
            IVSHI programs support student growth while strengthening community health education and outreach.
          </p>
        </div>
        <ImpactStats stats={impactStats} />
      </Section>

      <Section id="get-involved" className="defer-render pt-4">
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
              <p className="mt-2 text-base text-brand-900/80">{option.description}</p>
              <div className="mt-5">
                <CtaLinkButton cta={option.cta} variant="secondary" />
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section id="instagram" className="defer-render pt-4 pb-16">
        <LazyInstagramCarousel posts={fallbackInstagramPosts} source="fallback" />
      </Section>
    </>
  );
}
