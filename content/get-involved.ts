import { siteConfig } from "@/content/site";
import type { InvolvementOption } from "@/types/content";

export const involvementOptions: InvolvementOption[] = [
  {
    id: "join",
    title: "Join IVSHI",
    description:
      "Please fill out this form to be added to our general member/volunteer database, our slack channel, and email list where we communicate any information pertaining to our organization! Information will include volunteer opportunities, open project descriptions, application review, and more. General members can join committee(s) based on interests.",
    cta: siteConfig.ctas.joinIvshi
  },
  {
    id: "mentorship",
    title: "Mentorship Signup",
    description:
      "Get connected with an established member of Imperial Valley Student Health Initiative that is further in the path you'd like to take! Mentors can offer you courses, application, extracurricular, professional, and opportunity advice (& more) to help get you on the right track.",
    cta: siteConfig.ctas.mentorshipSignup
  },
  {
    id: "high-school-rep",
    title: "High School Rep Application",
    description:
      "Want leadership experience? Our high school representatives act as a liaison between our executive team and interested students at high schools across the Imperial Valley.",
    cta: siteConfig.ctas.hsRepApplication
  },
  {
    id: "pathway-to-success-program",
    title: "Pathway to Success Program",
    description:
      "The IVSHI Pathway to Success Program is a low-commitment support program running from March 1st to December 1st (applicants accepted on a rolling basis). Our goal is to share everything we've learned from our experiences in high school and college to help high school students succeed. We want to build close, supportive relationships with each student so we can find opportunities that fit their goals and guide them through applications that will help them reach their full potential. With workshops, guided assignments, one-on-one mentorship, and other insights we hope to best prepare students for their higher education journey.",
    cta: siteConfig.ctas.pathwayToSuccessProgram,
    secondaryCta: siteConfig.ctas.pathwayToSuccessMoreInformation
  }
];

export const homeInvolvementOptions: InvolvementOption[] = [
  {
    id: "join",
    title: "Join IVSHI",
    description:
      "Join as a general member and stay updated on volunteer opportunities, projects, and committees.",
    cta: siteConfig.ctas.joinIvshi
  },
  {
    id: "mentorship",
    title: "Mentorship Signup",
    description:
      "Connect with an experienced IVSHI member for guidance on academics, applications, and opportunities.",
    cta: siteConfig.ctas.mentorshipSignup
  },
  {
    id: "high-school-rep",
    title: "High School Rep Application",
    description:
      "Serve as a campus liaison and help connect Imperial Valley students with IVSHI opportunities.",
    cta: siteConfig.ctas.hsRepApplication
  },
  {
    id: "pathway-to-success-program",
    title: "Pathway to Success Program",
    description:
      "Join a low-commitment support program with workshops, guided assignments, and one-on-one mentorship.",
    cta: siteConfig.ctas.pathwayToSuccessProgram,
    secondaryCta: siteConfig.ctas.pathwayToSuccessMoreInformation
  }
];
