import { CtaLinkButton } from "@/components/common/cta-link";
import { Section } from "@/components/common/section";
import { siteConfig } from "@/content/site";

export default function NotFound() {
  return (
    <Section className="py-24">
      <div className="rounded-3xl border border-brand-100 bg-brand-50 p-10 text-center shadow-card">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-700">404</p>
        <h1 className="mt-2 font-display text-4xl text-brand-900">Page not found</h1>
        <p className="mx-auto mt-3 max-w-xl text-brand-900/75">
          The page you requested does not exist. Use the links below to continue exploring IVSHI.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <CtaLinkButton cta={siteConfig.ctas.homeSecondary} variant="ghost" />
          <CtaLinkButton cta={siteConfig.ctas.homePrimary} variant="secondary" />
        </div>
      </div>
    </Section>
  );
}
