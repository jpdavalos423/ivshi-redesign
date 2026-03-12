import Image from "next/image";
import { CtaLinkButton } from "@/components/common/cta-link";
import { ScrollIndicator } from "@/components/home/scroll-indicator";
import { siteConfig } from "@/content/site";

const homeScrollCta = {
  ...siteConfig.ctas.homeSecondary,
  id: "home_secondary_scroll_programs",
  href: "#program-pillars",
  eventName: "cta_home_secondary_scroll_programs_click"
};

export function HomeHero() {
  return (
    <header className="relative isolate min-h-[100svh] overflow-hidden">
      <Image
        src="/images/home/hero-students.webp"
        alt="Students and farmland in Imperial Valley"
        fill
        sizes="100vw"
        quality={68}
        className="object-cover object-[50%_46%]"
        priority
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,15,10,0.36)_0%,rgba(9,15,10,0.22)_42%,rgba(9,15,10,0.48)_100%)]" />

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col px-4 pb-32 pt-32 sm:px-6 sm:pb-28 sm:pt-32 lg:px-8">
        <div className="animate-fade-in-up max-w-4xl" style={{ animationDelay: "150ms" }}>
          <h1 className="max-w-[20ch] font-display text-[clamp(2.7rem,9vw,4.75rem)] leading-[1.02] text-white">
            Imperial Valley Student Health Initiative
          </h1>
        </div>

        <div className="animate-fade-in-up mt-auto flex justify-end" style={{ animationDelay: "700ms" }}>
          <section className="w-full max-w-[360px] rounded-2xl text-right sm:max-w-[430px]">
            <h2 className="font-display text-3xl tracking-tight text-white sm:text-[2.1rem]">Make a Difference</h2>
            <div className="mt-2 flex justify-end">
              <p className="max-w-[33ch] text-base text-white/85">
                Join us in creating healthier futures for students across the Imperial Valley.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <CtaLinkButton
                cta={siteConfig.ctas.homePrimary}
                className="!rounded-lg !bg-white !px-4 !py-2 !text-base !font-semibold !text-slate-900 hover:!bg-white/90"
              />
              <CtaLinkButton
                cta={homeScrollCta}
                variant="ghost"
                className="!rounded-lg !bg-transparent !px-4 !py-2 !text-base !font-semibold !text-white !ring-white/90 hover:!bg-white/15 hover:!text-white"
              />
            </div>
          </section>
        </div>
      </div>
      <ScrollIndicator href="#impact" delay={1.2} />
    </header>
  );
}
