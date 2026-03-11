import type { Metadata, Viewport } from "next";
import { Merriweather, Source_Sans_3 } from "next/font/google";
import type { ReactNode } from "react";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { siteConfig } from "@/content/site";
import { getSiteJsonLd } from "@/lib/seo";
import "./globals.css";

const display = Merriweather({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["700", "900"]
});

const body = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "IVSHI | Imperial Valley Student Health Initiative",
    template: "%s | IVSHI"
  },
  description: siteConfig.description,
  applicationName: siteConfig.shortName,
  referrer: "origin-when-cross-origin",
  keywords: [
    "Imperial Valley Student Health Initiative",
    "IVSHI",
    "student health",
    "public health",
    "mentorship",
    "health education",
    "volunteering"
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon/favicon-64x64.png", type: "image/png", sizes: "64x64" }
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }]
  },
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    title: "Imperial Valley Student Health Initiative",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "IVSHI",
    locale: "en_US",
    images: [
      {
        url: "/images/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Imperial Valley Student Health Initiative"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Imperial Valley Student Health Initiative",
    description: siteConfig.description,
    images: ["/images/og-image.svg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

export const viewport: Viewport = {
  themeColor: "#477742"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  const jsonLd = getSiteJsonLd();

  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-body text-brand-900 antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
