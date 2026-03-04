"use client";

type EventParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(eventName: string, params?: EventParams): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, params);
}

export function trackCtaClick(ctaId: string, label: string, destination: string): void {
  trackEvent("cta_click", {
    cta_id: ctaId,
    cta_label: label,
    cta_destination: destination
  });
}
