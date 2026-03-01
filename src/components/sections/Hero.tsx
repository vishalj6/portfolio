'use client';

import { socials } from '@/data/socials';

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center px-5 sm:px-8 md:px-16 py-24 md:py-28 max-w-5xl mx-auto w-full"
    >
      <div className="w-full fade-up grid md:grid-cols-[1fr_340px] gap-10 md:gap-16 items-start">

        {/* ── LEFT: Identity ────────────────────────────── */}
        <div className="flex flex-col gap-6">

          {/* Availability */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
            <span className="section-label">Available for new opportunities</span>
          </div>

          {/* Name */}
          <div>
            <h1 className="text-[#F2F2F0] font-bold tracking-tight leading-[1.05] text-[clamp(2.4rem,6.5vw,4.5rem)]">
              Vishal Jadeja<span className="text-[#F5FF82]">.</span>
            </h1>
            <p className="text-[#8C8C8C] text-sm font-mono mt-3 tracking-wide">
              Full Stack Developer&nbsp;&nbsp;·&nbsp;&nbsp;Node.js &amp; React&nbsp;&nbsp;·&nbsp;&nbsp;Mumbai
            </p>
          </div>

          {/* Bio */}
          <p className="text-[#9A9A9A] text-sm leading-relaxed max-w-[460px]">
            I build scalable back-end systems and clean front-end interfaces.
            1+ year shipping real-time products at Glitchover — from WebSocket
            infra to payment integrations.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-3 flex-wrap">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-[#F5FF82] text-[#0C0C0C] text-xs font-bold tracking-widest uppercase hover:bg-[#eef572] transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Download Resume
            </a>
            <a
              href="#contact"
              className="px-5 py-2.5 border border-[#333] text-[#8C8C8C] text-xs tracking-wide hover:border-[#555] hover:text-[#D0D0D0] transition-all"
            >
              Get in touch
            </a>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-5 pt-2">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="text-[#555] hover:text-[#F5FF82] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={s.icon} />
                </svg>
              </a>
            ))}
          </div>

        </div>

        {/* ── RIGHT: Resume card ────────────────────────── */}
        <div className="border border-[#1F1F1F] bg-[#111111] p-6 flex flex-col gap-5">

          {/* Card label */}
          <div className="flex items-center justify-between">
            <span className="section-label">Resume</span>
            <span className="text-[#F5FF82] text-[9px] font-mono tracking-widest">PDF</span>
          </div>

          <div className="border-t border-[#1A1A1A]" />

          {/* Experience line */}
          <div>
            <p className="text-[#6B6B6B] text-[9px] font-mono tracking-widest uppercase mb-2">Experience</p>
            <p className="text-[#E0E0E0] text-xs font-semibold">Full Stack Developer</p>
            <p className="text-[#F5FF82] text-[11px]">Glitchover</p>
            <p className="text-[#555] text-[10px] font-mono mt-0.5">2024 – Present · Full-time</p>
          </div>

          {/* Education */}
          <div>
            <p className="text-[#6B6B6B] text-[9px] font-mono tracking-widest uppercase mb-2">Education</p>
            <p className="text-[#E0E0E0] text-xs font-semibold">B.Tech — Computer Engineering</p>
            <p className="text-[#555] text-[10px] font-mono mt-0.5">2021 – 2025</p>
          </div>

          {/* Skills */}
          <div>
            <p className="text-[#6B6B6B] text-[9px] font-mono tracking-widest uppercase mb-2">Skills</p>
            <div className="flex flex-wrap gap-1.5">
              {['TypeScript', 'Node.js', 'React.js', 'Next.js', 'MongoDB', 'WebSockets', 'REST APIs', 'Docker'].map((s) => (
                <span key={s} className="text-[10px] text-[#8C8C8C] border border-[#272727] px-1.5 py-0.5 font-mono">{s}</span>
              ))}
            </div>
          </div>

          <div className="border-t border-[#1A1A1A]" />

          {/* Open PDF */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between text-[#F5FF82] text-[10px] font-mono tracking-widest uppercase hover:opacity-70 transition-opacity group"
          >
            Open full PDF
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="group-hover:translate-x-0.5 transition-transform">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
