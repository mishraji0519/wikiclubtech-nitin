'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Archive, ArrowDown, ArrowUp, Crown, Users } from 'lucide-react';
import TeamMemberCard from '@/components/team/TeamMemberCard';
import {
  currentTeamDemoMembers,
  currentTeamMembers,
  founderDemoMembers,
  previousTeamMembers,
} from '@/data/team_data/teamMembers';
import { Button } from '@/components/ui/button';
import WikimediaBackground from '@/components/team/WikimediaBackground';
import CursorGlow from '@/components/team/CursorGlow';
import Image from 'next/image';

type RoleFilter = 'mentor' | 'envoy' | 'lead' | 'volunteer';

const roleLabels: Record<RoleFilter, string> = {
  mentor: 'Mentors',
  envoy: 'Campus Envoys',
  lead: 'Team Leads',
  volunteer: 'Volunteers',
};

const sectionOrder: RoleFilter[] = [
  'envoy',
  'mentor',
  'lead',
  'volunteer',
];

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '/wikiclubtech-nitin';
const assetPath = (src: string) =>
  src.startsWith('http') || src.startsWith('data:') || src.startsWith(BASE_PATH)
    ? src
    : `${BASE_PATH}${src.startsWith('/') ? src : `/${src}`}`;

const groupMembersByRole = (
  members: typeof currentTeamDemoMembers
): Record<RoleFilter, typeof currentTeamDemoMembers> =>
  members.reduce(
    (acc, member) => {
      const role = member.roleType.trim().toLowerCase() as RoleFilter;
      if (role in acc) acc[role].push(member);
      return acc;
    },
    {
      mentor: [],
      envoy: [],
      lead: [],
      volunteer: [],
    } as Record<RoleFilter, typeof currentTeamDemoMembers>
  );

const TeamSections = ({
  members,
  idPrefix,
}: {
  members: typeof currentTeamDemoMembers;
  idPrefix: string;
}) => {
  const membersByRole = useMemo(() => groupMembersByRole(members), [members]);

  return (
    <div className='space-y-24'>
      {sectionOrder.map((role) => {
        const roleMembers = membersByRole[role];
        if (!roleMembers?.length) return null;

        const gridClass =
          role === 'mentor'
            ? 'mx-auto max-w-5xl space-y-6'
            : role === 'envoy'
              ? 'mx-auto grid max-w-6xl grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3'
              : role === 'volunteer'
                ? 'mx-auto grid max-w-7xl grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5'
                : 'grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3';

        return (
          <section
            key={`${idPrefix}-${role}`}
            id={`${idPrefix}-${role}`}
            className='scroll-mt-32'
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className='mb-10 text-center'
            >
              <p className='mb-2 text-xs font-bold uppercase tracking-[0.24em] text-primary'>
                {roleMembers.length} {roleMembers.length === 1 ? 'member' : 'members'}
              </p>
              <h2 className='text-3xl font-bold md:text-4xl'>{roleLabels[role]}</h2>
            </motion.div>

            <motion.div className={gridClass}>
              {roleMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{
                    duration: 0.5,
                    delay: Math.min(index * 0.08, 0.32),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={role === 'envoy' ? 'w-full max-w-sm' : 'w-full'}
                >
                  <TeamMemberCard
                    {...member}
                    demo={member.id.startsWith('demo-')}
                  />
                </motion.div>
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
  members: typeof currentTeamDemoMembers;
  activeSection: RoleFilter;
  onNavigate: (id: string) => void;
  idPrefix: string;
}) => {
  const membersByRole = useMemo(() => groupMembersByRole(members), [members]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='sticky top-16 z-40 mb-16 flex flex-wrap justify-center gap-3 rounded-2xl border border-white/30 bg-white/80 px-4 py-4 shadow-lg backdrop-blur-xl'
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
                  ? 'scale-105 border-0 bg-gradient-to-r from-blue-400 to-cyan-500 text-white shadow-xl'
                  : 'bg-white hover:scale-105 hover:text-primary'
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

const FoundersSection = () => {
  const projectCoordinator = previousTeamMembers.find(
    (member) => member.roleType === 'coordinator'
  );

  return (
    <section aria-labelledby='founders-heading' className='mb-28'>
      <div className='mx-auto mb-10 max-w-3xl text-center'>
        <div className='mb-4 inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-bold text-amber-700 ring-1 ring-amber-200'>
          <Crown className='h-4 w-4' />
          The Beginning
        </div>
        <h2 id='founders-heading' className='text-4xl font-black tracking-tight md:text-5xl'>
          Our Founders
        </h2>
        <p className='mt-4 text-muted-foreground'>
          The people who started the journey and helped shape the vision of Wikiclubtech-UU.
        </p>
      </div>

      <div className='mx-auto max-w-5xl space-y-6'>
        {founderDemoMembers.map((member) => (
          <TeamMemberCard key={member.id} {...member} demo />
        ))}
      </div>

      {projectCoordinator && (
        <>
          <div className='mx-auto my-12 max-w-4xl text-center'>
            <h3 className='text-2xl font-black tracking-tight text-slate-900 md:text-3xl'>
              Wikiclub Tech India (Part of OKI-IIITH)
            </h3>
          </div>
          <div className='mx-auto max-w-5xl'>
            <TeamMemberCard {...projectCoordinator} />
          </div>
        </>
      )}
    </section>
  );
};

const Index = () => {
  const [showPreviousTeam, setShowPreviousTeam] = useState(false);
  const displayedCurrentMembers = (
    currentTeamMembers.length > 0 ? currentTeamMembers : currentTeamDemoMembers
  ).filter((member) => member.roleType !== 'coordinator');
  const displayedPreviousMembers = previousTeamMembers.filter(
    (member) => member.roleType !== 'coordinator'
  );

  const [activeSection, setActiveSection] = useState<RoleFilter>('envoy');
  const [activePreviousSection, setActivePreviousSection] =
    useState<RoleFilter>('envoy');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const headerOffset = 120;
    const offsetPosition =
      element.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
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
      { rootMargin: '-140px 0px -55% 0px', threshold: [0.1, 0.25, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [displayedCurrentMembers.length]);

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
      { rootMargin: '-140px 0px -55% 0px', threshold: [0.1, 0.25, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [showPreviousTeam]);

  const handlePreviousTeamToggle = () => {
    const next = !showPreviousTeam;
    setShowPreviousTeam(next);

    if (next) {
      window.setTimeout(() => {
        document.getElementById('previous-team')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 80);
    }
  };

  return (
    <div className='min-h-screen bg-background'>
      <CursorGlow />
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
                  src={assetPath('/borderless_logo.svg')}
                  width={80}
                  height={80}
                  alt='Wikimedia Logo'
                  className='absolute h-20 w-20 object-contain'
                />
                <motion.img
                  src={assetPath('/logo.svg')}
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
              Wikiclubtech-UU • 2026–27
            </p>
            <h1 className='mb-6 text-5xl font-black tracking-tight text-black drop-shadow-lg md:text-7xl'>
              Our Mission, Our People
            </h1>
            <p className='mx-auto max-w-3xl text-xl font-medium text-black/95 drop-shadow md:text-2xl'>
              More than a team page — discover the people, story, and community
              behind Wikiclubtech-UU.
            </p>
          </motion.div>
        </div>
      </header>

      <main className='container mx-auto max-w-7xl px-6 py-16'>
        <FoundersSection />

        <section aria-labelledby='current-team-heading' className='scroll-mt-32'>
          <div className='mx-auto mb-12 max-w-3xl text-center'>
            <div className='mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-bold text-primary'>
              <Users className='h-4 w-4' />
              Current Team • 2026–27
            </div>
            <h2 id='current-team-heading' className='text-4xl font-black tracking-tight md:text-5xl'>
              The Team Behind Wikiclubtech-UU
            </h2>
            <p className='mt-4 text-muted-foreground'>
              Every role below currently shows a demo profile until the real
              2026–27 roster is supplied.
            </p>
          </div>

          <RoleNavigation
            members={displayedCurrentMembers}
            activeSection={activeSection}
            onNavigate={scrollToSection}
            idPrefix='current'
          />
          <TeamSections members={displayedCurrentMembers} idPrefix='current' />
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
              Wikiclubtech-UU 2025-26
            </h2>
            <p className='mt-4 text-muted-foreground'>
              Explore the people who contributed to Wikiclubtech-UU before the current team.
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
                  Hide Wikiclubtech-UU 2025-26
                  <ArrowUp className='ml-2 h-4 w-4' />
                </>
              ) : (
                <>
                  View Wikiclubtech-UU 2025-26
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
                  members={displayedPreviousMembers}
                  activeSection={activePreviousSection}
                  onNavigate={scrollToSection}
                  idPrefix='previous'
                />
                <TeamSections members={displayedPreviousMembers} idPrefix='previous' />
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
};

export default Index;
