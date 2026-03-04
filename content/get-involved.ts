import { siteConfig } from "@/content/site";
import type { InvolvementOption } from "@/types/content";

export const involvementOptions: InvolvementOption[] = [
  {
    id: "join",
    title: "Join IVSHI",
    description:
      "Become a member and collaborate on community-centered student health projects.",
    cta: siteConfig.ctas.joinIvshi
  },
  {
    id: "mentorship",
    title: "Mentorship Signup",
    description:
      "Join as a mentor or mentee in programs designed for future healthcare leaders.",
    cta: siteConfig.ctas.mentorshipSignup
  },
  {
    id: "high-school-rep",
    title: "High School Rep Application",
    description:
      "Apply to represent your campus and help expand student health opportunities locally.",
    cta: siteConfig.ctas.hsRepApplication
  },
  {
    id: "volunteer",
    title: "Volunteer",
    description:
      "Support outreach events, workshops, and health education activities in the community.",
    cta: siteConfig.ctas.volunteer
  }
];
