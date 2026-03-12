"use client";

import Image from "next/image";
import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CtaLinkButton } from "@/components/common/cta-link";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navHeight, setNavHeight] = useState(64);
  const isHome = pathname === "/";
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const navContactCta = {
    id: "nav_contact_us",
    label: "Contact Us",
    href: `mailto:${siteConfig.contactEmail}`,
    external: true,
    eventName: "cta_nav_contact_us_click"
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const updateNavHeight = () => {
      if (navRef.current) {
        setNavHeight(navRef.current.getBoundingClientRect().height);
      }
    };

    updateNavHeight();

    if (!navRef.current || typeof ResizeObserver === "undefined") {
      return;
    }

    const resizeObserver = new ResizeObserver(updateNavHeight);
    resizeObserver.observe(navRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className={cn(
        "z-50 w-full border-b backdrop-blur-md",
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

        <div
          className={cn("relative md:hidden", isHome && "animate-fade-in-up")}
          style={isHome ? { animationDelay: "300ms" } : undefined}
        >
          <button
            type="button"
            className={cn(
              "rounded-full border px-3 py-2 transition-colors duration-200 ease-out motion-reduce:transition-none",
              isHome ? "border-white/35 text-white" : "border-brand-200 text-brand-800"
            )}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
          >
            <span className="sr-only">{isMobileMenuOpen ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" className="flex flex-col gap-1">
              <span
                className={cn(
                  "block h-0.5 w-5 rounded transition-all duration-200 ease-out motion-reduce:transition-none",
                  isHome ? "bg-white" : "bg-brand-800",
                  isMobileMenuOpen && "translate-y-[6px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-5 rounded transition-all duration-200 ease-out motion-reduce:transition-none",
                  isHome ? "bg-white" : "bg-brand-800",
                  isMobileMenuOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-5 rounded transition-all duration-200 ease-out motion-reduce:transition-none",
                  isHome ? "bg-white" : "bg-brand-800",
                  isMobileMenuOpen && "-translate-y-[6px] -rotate-45"
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <div className="md:hidden">
        <button
          type="button"
          aria-label="Close navigation menu"
          aria-hidden={!isMobileMenuOpen}
          tabIndex={isMobileMenuOpen ? 0 : -1}
          onClick={closeMobileMenu}
          style={{ top: navHeight }}
          className={cn(
            "fixed inset-x-0 bottom-0 z-40 bg-black/45 transition-opacity duration-200 ease-out motion-reduce:transition-none",
            isMobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          )}
        />

        <div
          className={cn(
            "fixed right-0 top-0 z-50 h-dvh w-[min(22rem,90vw)] overflow-hidden",
            isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
          )}
          aria-hidden={!isMobileMenuOpen}
          inert={!isMobileMenuOpen}
        >
          <aside
            id="mobile-navigation-drawer"
            className={cn(
              "flex h-full w-full flex-col border-l p-4 shadow-card",
              "transition-all duration-200 ease-out motion-reduce:transition-none",
              isHome ? "border-white/25 bg-black/90 backdrop-blur-md" : "border-brand-100 bg-brand-50",
              isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            )}
          >
            <div className="flex items-center justify-between gap-4">
              <p className={cn("font-display text-lg", isHome ? "text-white" : "text-brand-900")}>Menu</p>
              <button
                type="button"
                onClick={closeMobileMenu}
                className={cn(
                  "inline-flex rounded-full border p-2 transition-colors duration-200 ease-out motion-reduce:transition-none",
                  isHome
                    ? "border-white/35 text-white hover:bg-white/15"
                    : "border-brand-200 text-brand-800 hover:bg-brand-100"
                )}
                aria-label="Close navigation menu"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 flex flex-1 flex-col">
              <div className="space-y-1">
                {siteConfig.navLinks.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={cn(
                        "block rounded-xl px-3 py-2.5 text-base font-medium transition-colors duration-200 ease-out motion-reduce:transition-none",
                        isHome
                          ? isActive
                            ? "bg-white/20 text-white"
                            : "text-white hover:bg-white/15"
                          : isActive
                            ? "bg-brand-100 text-brand-900"
                            : "text-brand-800 hover:bg-brand-100"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <div className={cn("mt-auto border-t pt-4", isHome ? "border-white/20" : "border-brand-100")}>
                <CtaLinkButton
                  cta={navContactCta}
                  variant={isHome ? "ghost" : "secondary"}
                  onClick={closeMobileMenu}
                  className={cn(
                    "w-full",
                    isHome && "!bg-white/10 !text-white !ring-white/35 hover:!bg-white/20 hover:!text-white"
                  )}
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </nav>
  );
}
