import type { Metadata } from "next";
import { CtaLinkButton } from "@/components/common/cta-link";
import { PageHero } from "@/components/common/page-hero";
import { Section } from "@/components/common/section";
import { involvementOptions } from "@/content/get-involved";

export const metadata: Metadata = {
  title: "Get Involved",
  description: "Apply, volunteer, or join mentorship opportunities through IVSHI.",
  alternates: { canonical: "/get-involved" }
};

export default function GetInvolvedPage() {
  return (
    <>
      <Section className="pt-12 sm:pt-16">
        <PageHero
          eyebrow="Get Involved"
          title="Take your next step with IVSHI"
          description="Whether you want to join, mentor, represent your school, or volunteer, you can start from this page."
        />
      </Section>

      <Section className="pt-4 pb-16">
        <div className="grid gap-4 sm:grid-cols-2">
          {involvementOptions.map((option) => (
            <article key={option.id} className="rounded-2xl border border-brand-100 bg-brand-50 p-6 shadow-card">
              <h2 className="font-display text-2xl text-brand-900">{option.title}</h2>
              <p className="mt-2 text-base leading-relaxed text-brand-900/80">{option.description}</p>
              <div className="mt-5">
                <CtaLinkButton cta={option.cta} variant="primary" />
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
