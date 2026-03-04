export {};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (
      command: "config" | "event" | "js",
      eventOrDate: string | Date,
      params?: Record<string, string | number | boolean | undefined>
    ) => void;
  }
}
