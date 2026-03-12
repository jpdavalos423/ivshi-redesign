import Image from "next/image";
import Link from "next/link";
import { CtaLinkButton } from "@/components/common/cta-link";
import { siteConfig } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-brand-100 bg-brand-50/85">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:gap-10 lg:px-8">
        <div className="flex items-center justify-end lg:justify-end lg:self-center">
          <Link href="/" className="inline-flex">
            <Image
              src="/images/logo/logo-256.webp"
              alt="IVSHI logo"
              width={120}
              height={120}
              className="h-20 w-20 rounded-full object-cover sm:h-24 sm:w-24 lg:h-32 lg:w-32"
            />
          </Link>
        </div>

        <div className="min-w-0">
          <h2 className="font-display text-2xl text-brand-900">{siteConfig.shortName}</h2>
          <p className="mt-2 text-sm text-brand-900/75">{siteConfig.description}</p>
        </div>

        <div className="text-right lg:text-left">
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-700">Navigation</h3>
          <ul className="mt-3 space-y-2">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-brand-900/80 hover:text-brand-900">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-700">Connect</h3>
          <ul className="mt-3 space-y-2">
            {siteConfig.socialLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-brand-900/80 hover:text-brand-900"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-5">
            <CtaLinkButton cta={siteConfig.ctas.footerContact} variant="ghost" />
          </div>
        </div>
      </div>
    </footer>
  );
}
