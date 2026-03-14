'use client';

import { socials } from '@/data/socials';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center bg-bg px-5 sm:px-8 md:px-16 pt-28 pb-16 md:pt-32"
    >
      <div className="w-full max-w-6xl mx-auto">

        {/* ── Availability sticker ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-block"
        >
          <span className="sticker-badge">
            <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
            Available for new opportunities
          </span>
        </motion.div>

        {/* ── Main grid ── */}
        <div className="grid md:grid-cols-[1fr_380px] gap-10 md:gap-14 items-start">

          {/* LEFT: Identity */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-7"
          >

            {/* Name */}
            <div>
              <h1 className="font-heading text-text-main text-[clamp(3rem,11vw,6rem)] leading-none tracking-wide uppercase">
                Vishal
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10">Jadeja</span>
                  <span className="dark:hidden absolute bottom-1 left-0 w-full h-5 md:h-7 bg-[#FFE600] -z-0" aria-hidden="true" />
                </span>
              </h1>
              <p className="font-mono text-sm text-text-muted mt-4 border-l-4 border-border-main dark:border-accent pl-3">
                Software Engineer
              </p>
            </div>

            {/* Bio */}
            <p className="text-text-muted text-base leading-relaxed max-w-[600px] font-medium">
              I build scalable back-end systems and clean front-end interfaces.
              1+ year shipping real-time products at Glitchover from WebSocket
              infra to payment integrations.
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-4 flex-wrap">
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="brutal-btn">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                Download Resume
              </a>
              <a href="#contact" className="brutal-btn-outline">
                Get in touch
              </a>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3 pt-1">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="p-2 border-2 border-border-main bg-surface dark:bg-card hover:bg-accent dark:hover:bg-accent hover:border-black dark:hover:border-black transition-colors duration-100 shadow-[2px_2px_0_#111] dark:shadow-[2px_2px_0_#FFE600] hover:shadow-[1px_1px_0_#111] hover:translate-x-px hover:translate-y-px"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="stroke-black dark:stroke-[#A0A09A]">
                    <path d={s.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Resume card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="brutal-card p-0 overflow-hidden"
          >
            {/* Card header */}
            <div className="bg-black dark:bg-[#111111] px-5 py-3 flex items-center justify-between">
              <span className="font-heading text-[#FFE600] text-xl tracking-widest">RESUME</span>
              <span className="font-mono text-[#FFE600] text-[9px] tracking-widest border border-[#FFE600] px-2 py-0.5">PDF</span>
            </div>

            <div className="p-5 flex flex-col gap-5">
              {/* Experience */}
              <div className="border-l-4 border-[#FFE600] pl-3">
                <p className="font-mono text-[9px] tracking-widest uppercase text-text-muted mb-1">Experience</p>
                <p className="text-text-main text-sm font-semibold">Software Engineer</p>
                <p className="font-heading text-text-main text-lg tracking-wide">Glitchover</p>
                <p className="font-mono text-[10px] text-text-muted mt-0.5">2024 – Present · Full-time</p>
              </div>

              {/* Education */}
              <div className="border-l-4 border-border-main dark:border-[#444] pl-3">
                <p className="font-mono text-[9px] tracking-widest uppercase text-text-muted mb-1">Education</p>
                <p className="text-text-main text-sm font-semibold">B.Tech — Computer Engineering</p>
                <p className="font-mono text-[10px] text-text-muted mt-0.5">2021 – 2025</p>
              </div>

              {/* Skills */}
              <div>
                <p className="font-mono text-[9px] tracking-widest uppercase text-text-muted mb-2">Top Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {['TypeScript', 'Node.js', 'React.js', 'Next.js', 'MongoDB', 'WebSockets', 'Docker'].map((s) => (
                    <span key={s} className="skill-tag text-[10px]">{s}</span>
                  ))}
                </div>
              </div>

              {/* Open PDF */}
              <div className="border-t-2 border-border-main pt-4">
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="brutal-btn w-full justify-center text-center">
                  Open full PDF
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
