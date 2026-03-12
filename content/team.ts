import type { TeamMember } from "@/types/content";

export const teamMembers: TeamMember[] = [
  {
    name: "Natalie Botello",
    role: "Co President and Founder",
    photoUrl: "/images/team/natalie-botello.webp",
    order: 2
  },
  {
    name: "Leilani Pradis",
    role: "Co President and Founder",
    photoUrl: "/images/team/leilani-pradis.webp",
    photoPositionClassName: "object-[center_10%]",
    order: 1
  },
  {
    name: "Brianna Meza",
    role: "Board Member",
    photoUrl: "/images/team/brianna-meza.webp",
    order: 3
  },
  {
    name: "Edward Sundahl",
    role: "Board Member",
    photoUrl: "/images/team/edward-sundahl.webp",
    photoPositionClassName: "object-[center_32%]",
    order: 4
  }
].sort((a, b) => a.order - b.order);
