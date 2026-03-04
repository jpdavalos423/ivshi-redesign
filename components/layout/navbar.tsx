"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CtaLinkButton } from "@/components/common/cta-link";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-brand-100/80 bg-brand-50/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo/logo-256.webp"
            alt="IVSHI logo"
            width={36}
            height={36}
            priority
            className="h-9 w-9 rounded-full object-cover"
          />
          <span className="font-display text-lg text-brand-900">IVSHI</span>
        </Link>

        <ul className="hidden items-center gap-5 md:flex">
          {siteConfig.navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition",
                    isActive ? "text-brand-800" : "text-brand-700/80 hover:text-brand-900"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:block">
          <CtaLinkButton cta={siteConfig.ctas.navPrimary} variant="secondary" className="px-4 py-2" />
        </div>

        <details className="group relative md:hidden">
          <summary className="list-none rounded-full border border-brand-200 px-3 py-2 text-sm font-semibold text-brand-800 marker:content-none">
            Menu
          </summary>
          <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-brand-100 bg-brand-50 p-2 shadow-card">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-xl px-3 py-2 text-sm text-brand-800 hover:bg-brand-100"
              >
                {link.label}
              </Link>
            ))}
            <div className="px-2 py-2">
              <CtaLinkButton cta={siteConfig.ctas.navPrimary} variant="secondary" className="w-full" />
            </div>
          </div>
        </details>
      </div>
    </nav>
  );
}
