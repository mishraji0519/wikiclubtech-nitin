'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Archive, ArrowDown, ArrowUp, Users } from 'lucide-react';
import TeamMemberCard from '@/components/team/TeamMemberCard';
import {
  currentTeamMembers,
  previousTeamMembers,
} from '@/data/team_data/teamMembers';
import { Button } from '@/components/ui/button';
import WikimediaBackground from '@/components/team/WikimediaBackground';
import Image from 'next/image';

type RoleFilter =
  | 'coordinator'
  | 'mentor'
  | 'envoy'
  | 'lead'
  | 'volunteer';

const roleLabels: Record<RoleFilter, string> = {
  coordinator: 'Project Coordinators',
  mentor: 'Mentors',
  envoy: 'Campus Envoys',
  lead: 'Team Leads',
  volunteer: 'Volunteers',
};

const sectionOrder: RoleFilter[] = [
  'coordinator',
  'mentor',
  'envoy',
  'lead',
  'volunteer',
];

const groupMembersByRole = (
  members: typeof currentTeamMembers
): Record<RoleFilter, typeof currentTeamMembers> =>
  members.reduce(
    (acc, member) => {
      const role = member.roleType.trim().toLowerCase() as RoleFilter;
      if (!acc[role]) {
        acc[role] = [];
      }
      acc[role].push(member);
      return acc;
    },
    {
      coordinator: [],
      mentor: [],
      envoy: [],
      lead: [],
      volunteer: [],
    } as Record<RoleFilter, typeof currentTeamMembers>
  );

const TeamSections = ({
  members,
  idPrefix,
  emptyMessage,
}: {
  members: typeof currentTeamMembers;
  idPrefix: string;
  emptyMessage?: string;
}) => {
  const membersByRole = useMemo(() => groupMembersByRole(members), [members]);

  if (members.length === 0 && emptyMessage) {
    return (
      <div className='rounded-3xl border border-dashed border-border/60 bg-muted/30 px-6 py-14 text-center'>
        <Users className='mx-auto mb-4 h-10 w-10 text-muted-foreground' />
        <h3 className='text-xl font-bold'>Current team roster is ready to be added</h3>
        <p className='mx-auto mt-2 max-w-xl text-sm text-muted-foreground'>
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className='space-y-24'>
      {sectionOrder.map((role) => {
        const roleMembers = membersByRole[role];
        if (!roleMembers || roleMembers.length === 0) return null;

        return (
          <section key={`${idPrefix}-${role}`} id={`${idPrefix}-${role}`} className='scroll-mt-32'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className='mb-12 text-center'
            >
              <p className='mb-2 text-xs font-bold uppercase tracking-[0.24em] text-primary'>
                {roleMembers.length} {roleMembers.length === 1 ? 'member' : 'members'}
              </p>
              <h2 className='text-3xl font-bold md:text-4xl'>
                {roleLabels[role]}
              </h2>
            </motion.div>

            <motion.div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
              {roleMembers.map((member) => (
                <TeamMemberCard key={member.id} {...member} />
              ))}
            </motion.div>
          </section>
        );
      })}
    </div>
  );
};

const RoleNavigation = ({
  members,
  activeSection,
  onNavigate,
  idPrefix,
}: {
  members: typeof currentTeamMembers;
  activeSection: RoleFilter;
  onNavigate: (id: string) => void;
  idPrefix: string;
}) => {
  const membersByRole = useMemo(() => groupMembersByRole(members), [members]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className='sticky top-16 z-40 mb-16 flex flex-wrap justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-lg'
    >
      {sectionOrder.map((role, index) => {
        if (!membersByRole[role]?.length) return null;

        return (
          <motion.div
            key={role}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.08 }}
          >
            <Button
              onClick={() => onNavigate(`${idPrefix}-${role}`)}
              variant={activeSection === role ? 'default' : 'outline'}
              className={`rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 ${
                activeSection === role
                  ? 'scale-105 border-0 bg-gradient-to-r from-blue-300 to-cyan-500 text-white shadow-xl'
                  : 'hover:text-primary hover:scale-105'
              }`}
            >
              {roleLabels[role]}
            </Button>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

const Index = () => {
  const [showPreviousTeam, setShowPreviousTeam] = useState(false);
  const [activeSection, setActiveSection] = useState<RoleFilter>(
    sectionOrder[0]
  );
  const [activePreviousSection, setActivePreviousSection] =
    useState<RoleFilter>(sectionOrder[0]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (!element) return;

    const headerOffset = 120;
    const offsetPosition =
      element.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const sections = sectionOrder
      .map((role) => document.getElementById(`current-${role}`))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection) {
          setActiveSection(
            visibleSection.target.id.replace('current-', '') as RoleFilter
          );
        }
      },
      {
        rootMargin: '-140px 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [currentTeamMembers.length]);

  useEffect(() => {
    if (!showPreviousTeam) return;

    const sections = sectionOrder
      .map((role) => document.getElementById(`previous-${role}`))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection) {
          setActivePreviousSection(
            visibleSection.target.id.replace('previous-', '') as RoleFilter
          );
        }
      },
      {
        rootMargin: '-140px 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [showPreviousTeam]);

  const handlePreviousTeamToggle = () => {
    setShowPreviousTeam((current) => !current);

    if (!showPreviousTeam) {
      window.setTimeout(() => {
        document.getElementById('previous-team')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 50);
    }
  };

  return (
    <div className='min-h-screen bg-background'>
      <header className='relative overflow-hidden px-6 py-24 [mask-image:linear-gradient(to_bottom,black_75%,transparent)]'>
        <div className='absolute inset-0 bg-gradient-to-br from-blue-100 via-green-100 to-red-100' />

        <WikimediaBackground />

        <div className='container relative z-10 mx-auto max-w-6xl'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center'
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              className='mb-8 inline-block'
            >
              <div className='relative flex h-24 w-24 items-center justify-center rounded-3xl'>
                <Image
                  src='/borderless_logo.svg'
                  width={80}
                  height={80}
                  alt='Wikimedia Logo'
                  className='absolute h-20 w-20 object-contain'
                />
                <motion.img
                  src='/logo.svg'
                  alt='Rotating Ring'
                  className='absolute h-20 w-20 object-contain'
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  style={{
                    maskImage:
                      'radial-gradient(circle, transparent 60%, black 61%)',
                  }}
                />
              </div>
            </motion.div>

            <p className='mb-4 text-sm font-bold uppercase tracking-[0.28em] text-black/70'>
              WikiClub Tech • 2026–27
            </p>
            <h1 className='mb-6 text-5xl font-black tracking-tight text-black drop-shadow-lg md:text-7xl'>
              Our Mission, Our People
            </h1>
            <p className='mx-auto max-w-3xl text-xl font-medium text-black/95 drop-shadow md:text-2xl'>
              Meet the people building the next chapter of WikiClub and making
              knowledge accessible to everyone.
            </p>
          </motion.div>
        </div>
      </header>

      <main className='container mx-auto max-w-7xl px-6 py-16'>
        <section aria-labelledby='current-team-heading' className='scroll-mt-32'>
          <div className='mx-auto mb-12 max-w-3xl text-center'>
            <div className='mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-bold text-primary'>
              <Users className='h-4 w-4' />
              Current Team • 2026–27
            </div>
            <h2 id='current-team-heading' className='text-4xl font-black tracking-tight md:text-5xl'>
              The Team Behind WikiClub
            </h2>
            <p className='mt-4 text-muted-foreground'>
              Meet the current contributors, coordinators, mentors, envoys, and
              leads shaping WikiClub today.
            </p>
          </div>

          {currentTeamMembers.length > 0 ? (
            <>
              <RoleNavigation
                members={currentTeamMembers}
                activeSection={activeSection}
                onNavigate={scrollToSection}
                idPrefix='current'
              />
              <TeamSections members={currentTeamMembers} idPrefix='current' />
            </>
          ) : (
            <TeamSections
              members={currentTeamMembers}
              idPrefix='current'
              emptyMessage='The new roster has not been added to the repository yet. Once the current members are supplied, they will appear here by default without changing the archived team.'
            />
          )}
        </section>

        <section
          aria-labelledby='previous-team-heading'
          className='mt-28 border-t border-border/60 pt-20'
        >
          <div className='mx-auto max-w-3xl text-center'>
            <div className='mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-4 py-2 text-sm font-bold text-muted-foreground'>
              <Archive className='h-4 w-4' />
              Team Archive
            </div>
            <h2 id='previous-team-heading' className='text-3xl font-black tracking-tight md:text-4xl'>
              Previous Team
            </h2>
            <p className='mt-4 text-muted-foreground'>
              Explore the people who contributed to WikiClub before the current
              team.
            </p>

            <Button
              type='button'
              onClick={handlePreviousTeamToggle}
              aria-expanded={showPreviousTeam}
              aria-controls='previous-team'
              className='mt-7 rounded-full px-7 py-3 font-bold shadow-lg'
            >
              {showPreviousTeam ? (
                <>
                  Hide Previous Team
                  <ArrowUp className='ml-2 h-4 w-4' />
                </>
              ) : (
                <>
                  View Previous Team
                  <ArrowDown className='ml-2 h-4 w-4' />
                </>
              )}
            </Button>
          </div>

          <AnimatePresence initial={false}>
            {showPreviousTeam && (
              <motion.div
                id='previous-team'
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                className='mt-16 overflow-hidden'
              >
                <RoleNavigation
                  members={previousTeamMembers}
                  activeSection={activePreviousSection}
                  onNavigate={scrollToSection}
                  idPrefix='previous'
                />
                <TeamSections
                  members={previousTeamMembers}
                  idPrefix='previous'
                />
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
};

export default Index;
