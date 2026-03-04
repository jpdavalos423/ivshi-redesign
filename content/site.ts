import type { SiteConfig } from "@/types/content";

const defaultBaseUrl = "https://ivshi.vercel.app";

export const siteConfig: SiteConfig = {
  name: "Imperial Valley Student Health Initiative",
  shortName: "IVSHI",
  description:
    "IVSHI connects students and families with mentorship, education, and public health opportunities across Imperial Valley.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? defaultBaseUrl,
  contactEmail: "ivstudenthealthinitiative@gmail.com",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Programs", href: "/programs" },
    { label: "Team", href: "/team" },
    { label: "Get Involved", href: "/get-involved" }
  ],
  socialLinks: [
    { label: "Instagram", href: "https://www.instagram.com/ivstudenthealthinitiative/" },
    { label: "Facebook", href: "https://www.facebook.com" },
    { label: "LinkedIn", href: "https://www.linkedin.com" }
  ],
  ctas: {
    homePrimary: {
      id: "home_primary_get_involved",
      label: "Get Involved",
      href: "/get-involved",
      external: false,
      eventName: "cta_home_primary_click"
    },
    homeSecondary: {
      id: "home_secondary_explore_programs",
      label: "Explore Programs",
      href: "/programs",
      external: false,
      eventName: "cta_home_secondary_click"
    },
    aboutPrimary: {
      id: "about_primary_meet_team",
      label: "Meet the Team",
      href: "/team",
      external: false,
      eventName: "cta_about_primary_click"
    },
    teamPrimary: {
      id: "team_primary_join_ivshi",
      label: "Join IVSHI",
      href: "/get-involved",
      external: false,
      eventName: "cta_team_primary_click"
    },
    footerContact: {
      id: "footer_contact_ivshi",
      label: "Contact IVSHI",
      href: "mailto:ivstudenthealthinitiative@gmail.com",
      external: true,
      eventName: "cta_footer_contact_click"
    },
    navPrimary: {
      id: "nav_primary_get_involved",
      label: "Get Involved",
      href: "/get-involved",
      external: false,
      eventName: "cta_nav_primary_click"
    },
    joinIvshi: {
      id: "get_involved_join_ivshi",
      label: "Join IVSHI",
      href: "https://forms.gle/replace-with-join-link",
      external: true,
      eventName: "cta_join_ivshi_click"
    },
    mentorshipSignup: {
      id: "get_involved_mentorship_signup",
      label: "Mentorship Signup",
      href: "https://forms.gle/replace-with-mentorship-link",
      external: true,
      eventName: "cta_mentorship_signup_click"
    },
    hsRepApplication: {
      id: "get_involved_hs_rep_application",
      label: "High School Rep Application",
      href: "https://forms.gle/replace-with-hs-rep-link",
      external: true,
      eventName: "cta_hs_rep_application_click"
    },
    volunteer: {
      id: "get_involved_volunteer",
      label: "Volunteer",
      href: "https://forms.gle/replace-with-volunteer-link",
      external: true,
      eventName: "cta_volunteer_click"
    }
  }
};
