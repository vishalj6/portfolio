"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="bg-surface border-t-4 border-border-main py-24 px-5 sm:px-8 md:px-16">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="flex items-center gap-4 mb-14">
          <span className="section-num">02</span>
          <h2 className="font-heading text-text-main text-4xl md:text-5xl tracking-wider uppercase">Experience</h2>
          <div className="flex-1 h-1 bg-text-main dark:bg-accent ml-2" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >

          {/* ── Root node: company ── */}
          <div className="flex items-center gap-3 mb-1">
            <div
              className="w-10 h-10 border-[3px] border-border-main dark:border-accent bg-accent flex items-center justify-center shrink-0 shadow-[3px_3px_0_#111] dark:shadow-[3px_3px_0_#FFE600]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9,22 9,12 15,12 15,22" />
              </svg>
            </div>
            <div>
              <p className="text-text-main font-bold text-base font-heading tracking-widest uppercase">Glitchover</p>
              <p className="font-mono text-text-muted text-[10px] tracking-wide">Aug 2024 – Present</p>
            </div>
          </div>

          {/* ── Tree trunk + branches ── */}
          <div className="ml-[8px] sm:ml-[19px] border-l-[3px] border-dashed border-border-main dark:border-accent/40">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex items-start"
              >
                {/* Branch arm: horizontal + node dot */}
                <div className="shrink-0 flex items-center mt-7 mr-1 sm:mr-5">
                  <div className="w-1 sm:w-8 h-[3px] -ml-[3px] bg-text-main dark:bg-accent/40" />
                  <div
                    className={`w-3 sm:w-4 h-3 sm:h-4 border-[3px] shrink-0 ${exp.current
                      ? "bg-accent border-border-main dark:border-accent shadow-[2px_2px_0_#111] dark:shadow-[2px_2px_0_#FFE600]"
                      : "bg-surface dark:bg-[#252525] border-border-main dark:border-[#444] shadow-[2px_2px_0_#111] dark:shadow-[2px_2px_0_#444]"
                      }`}
                  />
                </div>

                {/* Card */}
                <div className="flex-1 my-4 brutal-card overflow-hidden">

                  {/* Card header */}
                  <div
                    className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-5 pt-4 pb-3 ${exp.current
                      ? "bg-accent"
                      : "bg-card"
                      }`}
                    style={{ borderBottom: "3px solid" }}
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <h3 className={`font-heading text-2xl tracking-wider uppercase ${exp.current ? "text-black" : "text-text-main"}`}>{exp.role}</h3>
                        {exp.current && (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-black text-accent text-[9px] font-mono tracking-widest" style={{ border: "2px solid #111" }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                            CURRENT
                          </span>
                        )}
                      </div>
                      <span className="font-mono dark:text-text-muted text-[10px] text-text-main/60 font-bold uppercase tracking-wide">{exp.type}</span>
                    </div>
                    <span className="shrink-0 self-start sm:self-auto font-mono text-xs border-2 border-border-main px-3 py-1 bg-surface font-bold shadow-[2px_2px_0_#111]">
                      {exp.period}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="px-5 py-3.5 text-text-muted text-sm leading-relaxed" style={{ borderBottom: "2px solid var(--desc-border, #eee)" }}>
                    {exp.description}
                  </p>

                  {/* Key contributions */}
                  <div className="px-5 py-4">
                    <p className="font-mono text-[9px] uppercase tracking-widest text-text-muted font-bold mb-3">Key Contributions</p>
                    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                      {exp.achievements.map((a, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-text-main leading-relaxed">
                          <span className="shrink-0 mt-0.5 font-bold text-accent text-lg leading-none" style={{ WebkitTextStroke: "1px #111" }}>›</span>
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Start cap */}
            <div className="flex items-center gap-2 mt-3 mb-1">
              <div className="w-5 h-[3px] -ml-[3px] bg-text-main dark:bg-accent/40" />
              <span className="font-mono text-text-muted text-[9px] tracking-widest uppercase">Start</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
