import type { SiteConfig } from "@/types/content";

const defaultBaseUrl = "https://ivshi.vercel.app";

export const siteConfig: SiteConfig = {
  name: "Imperial Valley Student Health Initiative",
  shortName: "IVSHI",
  description:
    "IVSHI connects students with mentorship, education, and public health opportunities across the Imperial Valley.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? defaultBaseUrl,
  contactEmail: "ivstudenthealthinitiative@gmail.com",
  navLinks: [
    { label: "About", href: "/about" },
    { label: "Team", href: "/team" },
    { label: "Programs", href: "/programs" },
    { label: "Get Involved", href: "/get-involved" }
  ],
  socialLinks: [
    { label: "Instagram", href: "https://www.instagram.com/ivstudenthealthinitiative/" },
    // { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61564060259826&mibextid=wwXIfr&mibextid=wwXIfr" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/imperial-valley-student-health-initiative"
    }
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
      href: "https://docs.google.com/forms/d/e/1FAIpQLSfU20Jg0XlmdFKrphwyqLENUDTGS8dDPIuf1UYLgcUhhTt5vQ/viewform",
      external: true,
      eventName: "cta_join_ivshi_click"
    },
    mentorshipSignup: {
      id: "get_involved_mentorship_signup",
      label: "Mentorship Signup",
      href: "https://docs.google.com/forms/d/e/1FAIpQLScuVtmXwTMGDQCOJOWpeSsSRlrrO5yUR0X49SNNlviODe-w_g/viewform",
      external: true,
      eventName: "cta_mentorship_signup_click"
    },
    hsRepApplication: {
      id: "get_involved_hs_rep_application",
      label: "High School Rep Application",
      href: "https://docs.google.com/forms/d/e/1FAIpQLSdPZGm5Jid_XfAx8dNSijBdEjU1gk7S_EkjAqZ8yfwrR81qqw/viewform?usp=sf_link",
      external: true,
      eventName: "cta_hs_rep_application_click"
    },
    pathwayToSuccessProgram: {
      id: "get_involved_pathway_to_success_program",
      label: "Pathway to Success Program",
      href: "https://forms.gle/zKHxT99giYjzb2Uv8",
      external: true,
      eventName: "cta_pathway_to_success_program_click"
    },
    pathwayToSuccessMoreInformation: {
      id: "get_involved_pathway_to_success_more_information",
      label: "More Information",
      href: "https://docs.google.com/document/d/1QfBJkWIo00BFPRPJA67Kj2BLpk_uEj1GkUo6KCPrOQU/edit?usp=sharing",
      external: true,
      eventName: "cta_pathway_to_success_more_information_click"
    }
  }
};
