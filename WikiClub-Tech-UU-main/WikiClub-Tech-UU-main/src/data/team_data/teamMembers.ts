export interface TeamMember {
  id: string;
  name: string;
  role: string;
  roleType: "founder" | "coordinator" | "envoy" | "lead" | "mentor" | "volunteer";
  image: string;
  email?: string;
  linkedin?: string;
  github?: string;
  bio?: string;
}

export const previousTeamMembers: TeamMember[] = [];
export const currentTeamMembers: TeamMember[] = [];
export const currentTeamDemoMembers: TeamMember[] = [];
export const founderDemoMembers: TeamMember[] = [];
export const teamMembers = previousTeamMembers;
