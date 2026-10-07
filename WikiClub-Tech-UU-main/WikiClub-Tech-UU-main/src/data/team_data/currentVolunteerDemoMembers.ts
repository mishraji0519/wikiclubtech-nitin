import type { TeamMember } from './teamMembers';

export const currentVolunteerDemoMembers: TeamMember[] = Array.from({ length: 25 }, (_, index) => ({
  id: `demo-volunteer-${String(index + 1).padStart(2, '0')}`,
  name: `Demo Volunteer ${index + 1}`,
  role: 'Volunteer',
  roleType: 'volunteer',
  image: '',
  email: 'demo@example.com',
  bio: 'Demo content — replace this volunteer with the real 2026–27 team member details.',
}));
