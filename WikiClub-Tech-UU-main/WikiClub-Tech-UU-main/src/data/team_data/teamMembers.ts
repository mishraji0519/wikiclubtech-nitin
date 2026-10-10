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

export const founderDemoMembers: TeamMember[] = [
  {
    id: "founder-anshuman-rai",
    name: "Anshuman Rai",
    role: "Founder",
    roleType: "founder",
    image: "/team/Anshuman Rai Founder.jpg",
    email: "anshuman.wikiclubtech@gmail.com",
    linkedin: "https://www.linkedin.com/in/anshuman-rai-0433032b9",
    github: "https://github.com/Anshuman-Rai-1004",
    bio: "Anshuman Rai is the Founder of WikiClub Tech UU, driven by a vision to build a collaborative technology community around open knowledge, open-source, and innovation. He has been actively involved in organizing technical events, hackathons, workshops, and community initiatives that help students learn, build, and contribute beyond the classroom.\n\nThrough WikiClub Tech UU, he focuses on creating opportunities for students to explore technology, collaborate on real-world projects, and contribute to the wider open-knowledge ecosystem.",
  },
  {
    id: "demo-founder-2",
    name: "Founder Name",
    role: "Founder",
    roleType: "founder",
    image: "",
    email: "cofounder@example.com",
    bio: "Demo founder profile — replace with the real founder's name, story, links, and photo.",
  },
];

export const teamMembers = previousTeamMembers;
