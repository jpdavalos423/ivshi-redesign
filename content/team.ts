import type { TeamMember } from "@/types/content";

export const teamMembers: TeamMember[] = [
  {
    name: "IVSHI Leadership",
    role: "Executive Team",
    photoUrl: "/images/team/team-1.svg",
    bio: "Leads strategy, partnerships, and student program direction across IVSHI initiatives.",
    order: 1
  },
  {
    name: "Program Coordination",
    role: "Programs and Mentorship",
    photoUrl: "/images/team/team-2.svg",
    bio: "Coordinates outreach, mentorship cohorts, and student-facing educational opportunities.",
    order: 2
  },
  {
    name: "Community Outreach",
    role: "Public Health Initiatives",
    photoUrl: "/images/team/team-3.svg",
    bio: "Connects IVSHI services with local schools and community partners in Imperial Valley.",
    order: 3
  }
].sort((a, b) => a.order - b.order);
