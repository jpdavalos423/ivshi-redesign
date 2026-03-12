import type { Metadata } from "next";
import { CtaLinkButton } from "@/components/common/cta-link";
import { PageHero } from "@/components/common/page-hero";
import { Section } from "@/components/common/section";
import { involvementOptions } from "@/content/get-involved";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Get Involved",
  description:
    "Apply, join mentorship, represent your school, or become a member through IVSHI.",
  pathname: "/get-involved",
  keywords: [
    "join IVSHI",
    "mentorship signup",
    "high school representative application",
    "pathway to success program"
  ]
});

export default function GetInvolvedPage() {
  return (
    <>
      <Section className="pt-12 sm:pt-16">
        <PageHero
          eyebrow="Get Involved"
          title="Take your next step with IVSHI"
          description="Whether you want to join as a member, sign up for mentorship, represent your school, or participate in the Pathway to Success Program, you can start from this page."
        />
      </Section>

      <Section className="pt-4 pb-16">
        <div className="grid gap-4">
          {involvementOptions.map((option) => (
            <article key={option.id} className="rounded-2xl border border-brand-100 bg-brand-50 p-6 shadow-card">
              <h2 className="font-display text-2xl text-brand-900">{option.title}</h2>
              <p className="mt-2 text-base leading-relaxed text-brand-900/80">{option.description}</p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <CtaLinkButton cta={option.cta} variant="primary" />
                {option.secondaryCta ? <CtaLinkButton cta={option.secondaryCta} variant="ghost" /> : null}
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
