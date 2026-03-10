import Image from "next/image";
import Link from "next/link";
import { CtaLinkButton } from "@/components/common/cta-link";
import { siteConfig } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-brand-100 bg-brand-50/85">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:gap-10 lg:px-8">
        <div className="flex justify-end lg:self-center">
          <Link href="/" className="inline-flex">
            <Image
              src="/images/logo/logo-256.webp"
              alt="IVSHI logo"
              width={120}
              height={120}
              className="h-28 w-28 rounded-full object-cover sm:h-32 sm:w-32"
            />
          </Link>
        </div>

        <div>
          <h2 className="font-display text-2xl text-brand-900">{siteConfig.shortName}</h2>
          <p className="mt-2 text-sm text-brand-900/75">{siteConfig.description}</p>
          <p className="mt-3 text-sm text-brand-900/75">{siteConfig.contactEmail}</p>
        </div>

        <div>
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
