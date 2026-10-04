import React, { useState } from 'react';
import type { ComponentType } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';
import Image from 'next/image';

interface TeamMemberCardProps {
  name: string;
  role: string;
  roleType: 'founder' | 'coordinator' | 'envoy' | 'lead' | 'mentor' | 'volunteer';
  image: string;
  email?: string;
  linkedin?: string;
  github?: string;
  bio?: string;
  demo?: boolean;
}

type SocialLinkProps = {
  href: string;
  icon: ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
};

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '/wikiclubtech-nitin';

const assetPath = (src: string) =>
  src.startsWith('http') || src.startsWith('data:') || src.startsWith(BASE_PATH)
    ? src
    : `${BASE_PATH}${src.startsWith('/') ? src : `/${src}`}`;

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon: Icon, label }) => (
  <motion.a
    href={href}
    target='_blank'
    rel='noopener noreferrer'
    aria-label={label}
    whileHover={{ scale: 1.12, y: -2 }}
    className='flex h-9 w-9 items-center justify-center rounded-full bg-black/5 transition-colors hover:bg-black/10'
    onClick={(e) => e.stopPropagation()}
  >
    <Icon className='h-4 w-4' />
  </motion.a>
);

const TeamMemberCard = ({
  name,
  role,
  roleType,
  image,
  email,
  linkedin,
  github,
  bio,
  demo = false,
}: TeamMemberCardProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const isFeatureCard = roleType === 'founder' || roleType === 'coordinator';
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 260, damping: 24, mass: 0.25 });
  const rotateY = useSpring(tiltY, { stiffness: 260, damping: 24, mass: 0.25 });

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    tiltY.set(x * 5);
    tiltX.set(y * -5);
  };

  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const socialLinks = (
    <div className='flex flex-wrap gap-2'>
      {email && <SocialLink href={`mailto:${email}`} icon={Mail} label='Email' />}
      {linkedin && <SocialLink href={linkedin} icon={Linkedin} label='LinkedIn' />}
      {github && <SocialLink href={github} icon={Github} label='GitHub' />}
    </div>
  );

  const imageBlock = (
    <div className='relative h-56 w-full shrink-0 overflow-hidden bg-gradient-to-br from-slate-200 via-slate-300 to-slate-500 sm:h-64 sm:w-2/5'>
      {image ? (
        <Image
          src={assetPath(image)}
          alt={name}
          fill
          unoptimized
          sizes='(max-width: 640px) 100vw, 40vw'
          className='object-cover transition-transform duration-700 ease-out group-hover:scale-105'
        />
      ) : (
        <div className='flex h-full w-full items-center justify-center'>
          <span className='text-6xl font-black text-white/80'>
            {name.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );

  if (isFeatureCard) {
    return (
      <>
        <motion.article
          layoutId={`card-${name}`}
          whileHover={{ y: -6, scale: 1.008 }}
          whileTap={{ scale: 0.995 }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          style={{ rotateX, rotateY, transformPerspective: 900 }}
          onPointerMove={handlePointerMove}
          onPointerLeave={resetTilt}
          className='group cursor-pointer overflow-hidden rounded-3xl bg-white shadow-[0_12px_45px_rgba(15,23,42,0.10)] ring-1 ring-black/5'
          onClick={() => setModalOpen(true)}
        >
          <div className='flex flex-col sm:flex-row'>
            {imageBlock}
            <div className='flex min-h-56 flex-1 flex-col justify-center p-6 sm:min-h-64 sm:p-8'>
              <div className='mb-3 flex flex-wrap items-center gap-2'>
                <span className='rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-700'>
                  {role}
                </span>
                {demo && (
                  <span className='rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800'>
                    Demo
                  </span>
                )}
              </div>
              <h3 className='text-2xl font-black tracking-tight text-slate-900 sm:text-3xl'>
                {name}
              </h3>
              {bio && (
                <p className='mt-3 line-clamp-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base'>
                  {bio}
                </p>
              )}
              <div className='mt-5'>{socialLinks}</div>
            </div>
          </div>
        </motion.article>

        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm'
              onClick={() => setModalOpen(false)}
            >
              <motion.div
                layoutId={`card-${name}`}
                className='max-h-[90vh] w-full max-w-3xl overflow-auto rounded-3xl bg-white shadow-2xl'
                onClick={(e) => e.stopPropagation()}
              >
                <div className='flex flex-col sm:flex-row'>
                  <div className='relative h-64 shrink-0 bg-slate-200 sm:h-auto sm:w-2/5'>
                    {image ? (
                      <Image src={assetPath(image)} alt={name} fill unoptimized sizes='40vw' className='object-cover transition-transform duration-700 ease-out group-hover:scale-105' />
                    ) : (
                      <div className='flex h-full min-h-64 items-center justify-center bg-gradient-to-br from-slate-200 to-slate-500'>
                        <span className='text-7xl font-black text-white/80'>{name.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                  <div className='p-7 sm:p-9'>
                    <span className='rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-700'>{role}</span>
                    <h2 className='mt-4 text-3xl font-black text-slate-900'>{name}</h2>
                    {bio && <p className='mt-5 leading-7 text-slate-600'>{bio}</p>}
                    <div className='mt-7'>{socialLinks}</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <>
      <motion.article
        layoutId={`card-${name}`}
        whileHover={{ y: -7, scale: 1.012 }}
        whileTap={{ scale: 0.992 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        className='group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-[0_10px_35px_rgba(15,23,42,0.08)] ring-1 ring-black/5'
        onClick={() => setModalOpen(true)}
      >
        <div className='relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-200 to-slate-500'>
          {image ? (
            <Image src={assetPath(image)} alt={name} fill unoptimized sizes='(max-width: 768px) 100vw, 33vw' className='object-cover transition-transform duration-700 ease-out group-hover:scale-105' />
          ) : (
            <div className='flex h-full items-center justify-center'>
              <span className='text-6xl font-black text-white/80'>{name.charAt(0).toUpperCase()}</span>
            </div>
          )}
        </div>
        <div className='p-5'>
          <div className='flex flex-wrap items-center gap-2'>
            <span className='rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700'>{role}</span>
            {demo && <span className='rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800'>Demo</span>}
          </div>
          <h3 className='mt-3 text-xl font-black text-slate-900'>{name}</h3>
          {bio && <p className='mt-2 line-clamp-2 text-sm leading-6 text-slate-600'>{bio}</p>}
          <div className='mt-4 border-t border-slate-200 pt-4'>{socialLinks}</div>
        </div>
      </motion.article>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm'
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              layoutId={`card-${name}`}
              className='max-h-[90vh] w-full max-w-lg overflow-auto rounded-3xl bg-white p-8 shadow-2xl'
              onClick={(e) => e.stopPropagation()}
            >
              <div className='relative mx-auto h-48 w-48 overflow-hidden rounded-2xl bg-slate-200'>
                {image ? (
                  <Image src={assetPath(image)} alt={name} fill unoptimized sizes='192px' className='object-cover' />
                ) : (
                  <div className='flex h-full items-center justify-center bg-gradient-to-br from-slate-200 to-slate-500'>
                    <span className='text-6xl font-black text-white/80'>{name.charAt(0)}</span>
                  </div>
                )}
              </div>
              <div className='mt-6 text-center'>
                <span className='rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700'>{role}</span>
                <h2 className='mt-3 text-3xl font-black text-slate-900'>{name}</h2>
                {bio && <p className='mt-4 leading-7 text-slate-600'>{bio}</p>}
                <div className='mt-6 flex justify-center'>{socialLinks}</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TeamMemberCard;
