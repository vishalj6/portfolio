"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experiences } from "@/data/experience";

export default function Experience() {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({ 0: true });

  return (
    <section id="experience" className="py-16 px-5 sm:px-8 bg-bg">
      <div className="max-w-[840px] mx-auto">

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="font-bold text-text-main text-2xl mb-8"
        >
          Work Experience
        </motion.h2>

        <div className="flex flex-col">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              {/* Entry row */}
              <button
                onClick={() => setExpanded((prev) => ({ ...prev, [i]: !prev[i] }))}
                className="w-full flex items-center justify-between gap-4 py-4 text-left group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Company icon */}
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
                    className="w-8 h-8 rounded-full border border-[var(--glass-border)] flex items-center justify-center shrink-0 bg-[var(--theme-card)]"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted">
                      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                      <polyline points="9,22 9,12 15,12 15,22" />
                    </svg>
                  </motion.div>
                  <span className="font-bold text-text-main text-base group-hover:opacity-80 transition-opacity truncate">
                    {exp.company}
                  </span>
                  <span className="font-mono text-text-muted text-sm shrink-0">
                    / {exp.role}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-text-muted text-xs">{exp.period}</span>
                  <svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className={`text-text-muted transition-transform duration-200 ${expanded[i] ? 'rotate-180' : ''}`}
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Expandable content */}
              <AnimatePresence initial={false}>
                {expanded[i] && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <ul className="flex flex-col gap-2 pb-5 pl-11">
                      {exp.achievements.map((a, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.25, delay: j * 0.05 }}
                          className="flex items-start gap-2.5 text-sm text-text-muted leading-relaxed"
                        >
                          <span className="shrink-0 mt-[7px] w-1.5 h-1.5 rounded-full bg-[var(--theme-border-main)]" />
                          {a}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Divider — hatch between entries */}
              {i < experiences.length - 1 && (
                <div className="hatch-bg h-px my-1" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
