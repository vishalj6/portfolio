"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { experiences } from "@/data/experience";

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="experience"
      ref={ref}
      className="relative py-28 md:py-36 px-4 scene-transition"
    >
      <div className="max-w-4xl mx-auto">
        {/* Timeline — cinematic flashback */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-linear-to-b from-cyan/30 via-purple/20 to-transparent" />

          {experiences.map((exp, expIdx) => (
            <motion.div
              key={expIdx}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="relative pl-14 md:pl-20 pb-12 last:pb-0"
            >
              {/* Timeline dot — pulsing beacon */}
              <div className="absolute left-2.5 md:left-4.5 top-1 w-3 h-3 rounded-full bg-cyan border-2 border-background">
                <div className="absolute inset-0 rounded-full bg-cyan/40 animate-pulse-ring" />
              </div>

              {/* Flashback label */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-4"
              >
                <span className="text-[9px] font-mono text-gold/40 tracking-[0.3em] uppercase px-2 py-0.5 border border-gold/15">
                  Flashback
                </span>
              </motion.div>

              {/* Content card */}
              <div className="relative p-5 md:p-6 border border-card-border bg-card/20 backdrop-blur-sm">
                {/* Corner brackets */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-purple/20" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-purple/20" />

                {/* Header */}
                <div className="mb-5">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground">
                    {exp.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <span className="text-cyan font-mono text-sm">{exp.company}</span>
                    <span className="text-card-border">|</span>
                    <span className="text-muted/60 text-xs font-mono">{exp.period}</span>
                    <span className="text-[9px] px-2 py-0.5 border border-cyan/20 text-cyan/60 font-mono uppercase tracking-wider">
                      {exp.type}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-card-border mb-5" />

                {/* Achievements — mission log entries */}
                <div className="space-y-3">
                  {exp.achievements.map((achievement, achIdx) => (
                    <motion.div
                      key={achIdx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: 0.4,
                        delay: 0.5 + achIdx * 0.08,
                      }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-cyan/40 mt-1 shrink-0 font-mono text-[10px]">
                        [{String(achIdx + 1).padStart(2, "0")}]
                      </span>
                      <p className="text-muted text-sm leading-relaxed">
                        {achievement}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
