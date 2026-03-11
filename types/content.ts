export type PillarId = "volunteering" | "education" | "public-health";

export type NavLink = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type CtaLink = {
  id: string;
  label: string;
  href: string;
  external: boolean;
  eventName: string;
};

export type PillarLink = {
  id: PillarId;
  title: string;
  description: string;
  notionUrl: string;
  ctaLabel: string;
};

export type InstagramPost = {
  id: string;
  imageUrl: string;
  postUrl: string;
  caption?: string;
  publishedAt?: string;
};

export type TeamMember = {
  name: string;
  role: string;
  photoUrl?: string;
  bio?: string;
  order: number;
};

export type ImpactStat = {
  label: string;
  value: string;
  description: string;
};

export type InvolvementOption = {
  id: string;
  title: string;
  description: string;
  cta: CtaLink;
};

export type SiteConfig = {
  name: string;
  shortName: string;
  description: string;
  url: string;
  contactEmail: string;
  navLinks: NavLink[];
  socialLinks: SocialLink[];
  ctas: Record<string, CtaLink>;
};
