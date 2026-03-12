"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CtaLinkButton } from "@/components/common/cta-link";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const navContactCta = {
    id: "nav_contact_us",
    label: "Contact Us",
    href: `mailto:${siteConfig.contactEmail}`,
    external: true,
    eventName: "cta_nav_contact_us_click"
  };

  return (
    <nav
      className={cn(
        "z-50 border-b backdrop-blur-md",
        isHome ? "fixed inset-x-0 top-0" : "sticky top-0",
        isHome ? "border-white/15 bg-black/20" : "border-brand-100/80 bg-brand-50/90"
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className={cn(isHome && "animate-fade-in-up")} style={isHome ? { animationDelay: "120ms" } : undefined}>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo/logo-256.webp"
              alt="IVSHI logo"
              width={36}
              height={36}
              priority
              className="h-9 w-9 rounded-full object-cover"
            />
            <span className={cn("font-display text-lg", isHome ? "text-white" : "text-brand-900")}>IVSHI</span>
          </Link>
        </div>

        <ul className="hidden items-center gap-5 md:flex">
          {siteConfig.navLinks.map((link, index) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <li
                key={link.href}
                className={cn(isHome && "animate-fade-in-up")}
                style={isHome ? { animationDelay: `${200 + index * 80}ms` } : undefined}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition",
                    isHome
                      ? isActive
                        ? "text-white"
                        : "text-white/80 hover:text-white"
                      : isActive
                        ? "text-brand-800"
                        : "text-brand-700/80 hover:text-brand-900"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div
          className={cn("hidden md:block", isHome && "animate-fade-in-up")}
          style={isHome ? { animationDelay: "660ms" } : undefined}
        >
          <CtaLinkButton
            cta={navContactCta}
            variant={isHome ? "ghost" : "secondary"}
            className={cn(
              "px-4 py-2",
              isHome && "!bg-white/10 !text-white !ring-white/35 hover:!bg-white/20 hover:!text-white"
            )}
          />
        </div>

        <details
          className={cn("group relative md:hidden", isHome && "animate-fade-in-up")}
          style={isHome ? { animationDelay: "300ms" } : undefined}
        >
          <summary
            className={cn(
              "list-none rounded-full border px-3 py-2 marker:content-none",
              isHome ? "border-white/35 text-white" : "border-brand-200 text-brand-800"
            )}
            aria-label="Open navigation menu"
          >
            <span className="sr-only">Open menu</span>
            <span aria-hidden="true" className="flex flex-col gap-1">
              <span className={cn("block h-0.5 w-5 rounded", isHome ? "bg-white" : "bg-brand-800")} />
              <span className={cn("block h-0.5 w-5 rounded", isHome ? "bg-white" : "bg-brand-800")} />
              <span className={cn("block h-0.5 w-5 rounded", isHome ? "bg-white" : "bg-brand-800")} />
            </span>
          </summary>
          <div
            className={cn(
              "absolute right-0 mt-2 w-56 rounded-2xl border p-2 shadow-card",
              isHome ? "border-white/25 bg-black/70 backdrop-blur-md" : "border-brand-100 bg-brand-50"
            )}
          >
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block rounded-xl px-3 py-2 text-sm",
                  isHome ? "text-white hover:bg-white/20" : "text-brand-800 hover:bg-brand-100"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-2 py-2">
              <CtaLinkButton
                cta={navContactCta}
                variant={isHome ? "ghost" : "secondary"}
                className={cn(
                  "w-full",
                  isHome && "!bg-white/10 !text-white !ring-white/35 hover:!bg-white/20 hover:!text-white"
                )}
              />
            </div>
          </div>
        </details>
      </div>
    </nav>
  );
}
