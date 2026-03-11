import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

const ogImagePath = "/images/og-image.svg";

const defaultKeywords = [
  "Imperial Valley Student Health Initiative",
  "IVSHI",
  "Imperial Valley",
  "student health",
  "public health",
  "mentorship",
  "health education",
  "volunteering"
];

function absoluteUrl(pathname: string): string {
  return new URL(pathname, siteConfig.url).toString();
}

type PageMetadataParams = {
  title: string;
  description: string;
  pathname: string;
  keywords?: string[];
};

export function buildPageMetadata({
  title,
  description,
  pathname,
  keywords = []
}: PageMetadataParams): Metadata {
  const pageUrl = absoluteUrl(pathname);
  const allKeywords = Array.from(new Set([...defaultKeywords, ...keywords]));

  return {
    title,
    description,
    keywords: allKeywords,
    alternates: { canonical: pathname },
    openGraph: {
      type: "website",
      url: pageUrl,
      title,
      description,
      siteName: siteConfig.shortName,
      locale: "en_US",
      images: [
        {
          url: ogImagePath,
          width: 1200,
          height: 630,
          alt: siteConfig.name
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImagePath]
    }
  };
}

export function getSiteJsonLd() {
  const socialProfiles = siteConfig.socialLinks.map((link) => link.href);

  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      email: siteConfig.contactEmail,
      sameAs: socialProfiles,
      logo: absoluteUrl("/images/logo/logo-512.webp")
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
      inLanguage: "en-US"
    }
  ];
}
