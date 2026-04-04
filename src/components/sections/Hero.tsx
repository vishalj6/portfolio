'use client';

import Image from 'next/image';
import { socials } from '@/data/socials';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import MagneticElement from '@/components/MagneticElement';

const GITHUB_AVATAR = 'https://avatars.githubusercontent.com/vishal-jadeja';

function ViewCounterHero() {
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    fetch("/api/views?page=/")
      .then((r) => r.json())
      .then((data) => setCount(data.count))
      .catch(() => { });
  }, []);
  if (count === null) return null;
  return (
    <div className="flex items-center gap-1.5 ml-2 text-text-muted font-mono text-xs border border-[var(--glass-border)] rounded-full px-3 py-1.5 hover:text-text-main transition-colors">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      ⁓{count.toLocaleString()}
    </div>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="pt-28 pb-16 px-5 sm:px-8 bg-bg">
      <div className="max-w-[840px] mx-auto">

        {/* Profile row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-5 mb-5"
        >
          <motion.div
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="w-28 h-28 rounded-full overflow-hidden border border-[var(--glass-border)] shrink-0"
          >
            <Image
              src={GITHUB_AVATAR}
              alt="Vishal Jadeja"
              width={110}
              height={110}
              className="object-cover w-full h-full"
              priority
              unoptimized
            />
          </motion.div>
          <div>
            <h1 className="font-bold text-text-main text-4xl sm:text-5xl leading-tight tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
              Vishal Jadeja
            </h1>
            <p className="text-text-muted text-sm mt-1 font-mono">
              1.5 yrs &nbsp;·&nbsp; Backend &nbsp;·&nbsp; Full Stack &nbsp;·&nbsp; Builder
            </p>
          </div>
        </motion.div>

        {/* Social icons */}
        <motion.div
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.15 } } }}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-2 mb-7"
        >
          {socials.map((s) => (
            <MagneticElement key={s.name} strength={0.25}>
              <motion.a
                variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0 } }}
                whileHover={{ scale: 1.15, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-[var(--glass-border)] text-text-muted hover:text-text-main hover:border-[rgba(255,255,255,0.2)] transition-colors duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d={s.icon} />
                </svg>
              </motion.a>
            </MagneticElement>
          ))}
          {/* View Counter inside Hero */}
          <ViewCounterHero />
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-text-muted text-base leading-relaxed mb-7 max-w-lg font-mono"
        >
          Building scalable back-end systems and clean front-end interfaces.
          Shipping real-time products at Glitchover — from WebSocket infra to
          payment integrations.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.28 }}
          className="flex items-center gap-3 flex-wrap"
        >
          <MagneticElement strength={0.3}>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="modern-btn text-sm px-5 py-2">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Resume
            </a>
          </MagneticElement>
          <MagneticElement strength={0.3}>
            <a href="#contact" className="modern-btn-outline text-sm px-5 py-2">
              Get in touch
            </a>
          </MagneticElement>
        </motion.div>
      </div>
    </section>
  );
}
