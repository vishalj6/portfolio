"use client";

import { useInView } from "react-intersection-observer";
import { experiences } from "@/data/experience";

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="experience" ref={ref} className="border-t border-[#1F1F1F] py-24 px-5 sm:px-8 md:px-16">
      <div className="max-w-5xl mx-auto">

        {/* Section header */}
        <div className="flex items-baseline gap-6 mb-16">
          <span className="text-[#F5FF82]/50 text-xs font-mono tracking-widest">03</span>
          <span className="section-label">Experience</span>
          <div className="section-line" />
        </div>

        <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

          {/* Root node: company */}
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 border border-[#F5FF82]/30 bg-[#111] flex items-center justify-center shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F5FF82" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9,22 9,12 15,12 15,22" />
              </svg>
            </div>
            <div>
              <p className="text-[#D0D0D0] text-sm font-semibold">Glitchover</p>
              <p className="text-[#3A3A3A] text-[10px] font-mono tracking-wide">Aug 2024 – Present</p>
            </div>
          </div>

          {/* Tree trunk + branches */}
          <div className="ml-[15px] border-l border-dashed border-[#252525]">
            {experiences.map((exp, i) => (
              <div key={i} style={{ transitionDelay: `${i * 150 + 100}ms` }}>
                <div className="flex items-start">

                  {/* Branch arm: horizontal line + dot */}
                  <div className="shrink-0 flex items-center mt-8 mr-1 sm:mr-4">
                    <div className="w-0 -ml-1.5 sm:ml-auto sm:w-7 h-px bg-[#252525]" />
                    <div className={`w-3 h-3 rounded-full border-2 shrink-0 ${exp.current
                      ? "bg-[#f5ff8245] border-[#f5ff82ce] shadow-[0_0_10px_rgba(245,255,130,0.25)]"
                      : "bg-[#161616] border-[#2E2E2E]"
                      }`} />
                  </div>

                  {/* Card */}
                  <div className="group flex-1 my-4 border border-[#1A1A1A] bg-[#0F0F0F] hover:border-[#2A2A2A] hover:bg-[#111] transition-all duration-300 card-glow">

                    {/* Card header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-5 pt-4 pb-3 border-b border-[#161616]">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-0.5">
                          <h3 className="text-[#E0E0E0] text-sm font-semibold">{exp.role}</h3>
                          {exp.current && (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#F5FF82]/10 border border-[#F5FF82]/20 text-[#F5FF82] text-[9px] font-mono tracking-widest">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
                              CURRENT
                            </span>
                          )}
                        </div>
                        <span className="text-[#555] text-[10px] font-mono">{exp.type}</span>
                      </div>
                      <span className="shrink-0 self-start sm:self-auto text-[#3A3A3A] text-[10px] font-mono border border-[#1E1E1E] px-2.5 py-1 bg-[#0A0A0A]">
                        {exp.period}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="px-5 py-3.5 text-[#5E5E5E] text-xs leading-relaxed border-b border-[#141414]">{exp.description}</p>

                    {/* Achievements */}
                    <div className="px-5 py-4">
                      <p className="text-[#2A2A2A] text-[9px] font-mono tracking-widest uppercase mb-3">Key Contributions</p>
                      <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                        {exp.achievements.map((a, j) => (
                          <li key={j} className="flex items-start gap-2 text-[11px] text-[#5A5A5A] leading-relaxed">
                            <span className="shrink-0 mt-[9px] text-[#F5FF82]/40 font-mono text-sm leading-0">›</span>
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Start cap */}
            <div className="flex items-center gap-2 mt-5">
              <div className="w-4 h-px bg-[#1E1E1E]" />
              <span className="text-[#252525] text-[9px] font-mono tracking-widest">Start</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
