import type { TeamMember } from './teamMembers';
import { founderDemoMembers } from './teamMembers';

// Both people in the founders section are founders; there is no co-founder role.
if (founderDemoMembers[1]) {
  founderDemoMembers[1].role = 'Founder';
  founderDemoMembers[1].bio = 'Demo founder profile — replace with the real founder\'s name, story, links, and photo.';
}

export const facultyCoordinator: TeamMember = {
  id: 'faculty-coordinator',
  name: 'Naveen Kumar Gupta',
  role: 'Faculty Coordinator',
  roleType: 'coordinator',
  image: '',
  bio: 'Faculty Coordinator of WikiClub Tech-UU, supporting the community and its student-led initiatives.',
};
