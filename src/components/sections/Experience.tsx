"use client";

import { motion } from "framer-motion";
import MotionWrapper from "@/components/ui/MotionWrapper";
import { experiences } from "@/data/experience";
import { fadeUp } from "@/lib/animations";

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-24 md:py-32 px-4 bg-section/50"
    >
      {/* Section accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-purple/20 to-transparent" />

      <div className="max-w-4xl mx-auto">
        {/* Section heading */}
        <MotionWrapper className="mb-16">
          <p className="text-cyan text-sm tracking-[0.3em] uppercase mb-3">
            04. Experience
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">The Journey</h2>
        </MotionWrapper>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-linear-to-b from-cyan/50 via-purple/30 to-transparent" />

          {experiences.map((exp, expIdx) => (
            <motion.div
              key={expIdx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="relative pl-12 md:pl-20 pb-12 last:pb-0"
            >
              {/* Timeline dot */}
              <div className="absolute left-2.5 md:left-6.5 top-1 w-3 h-3 rounded-full bg-cyan border-2 border-background glow-cyan" />

              {/* Pulse ring */}
              <div className="absolute left-1.5 md:left-5.5 top-0 w-5 h-5 rounded-full border border-cyan/30 animate-pulse-ring" />

              {/* Content */}
              <motion.div variants={fadeUp} className="space-y-4">
                {/* Header */}
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground">
                    {exp.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="text-cyan font-medium">{exp.company}</span>
                    <span className="text-muted">•</span>
                    <span className="text-muted text-sm">{exp.period}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full border border-cyan/30 text-cyan/80 bg-cyan/5">
                      {exp.type}
                    </span>
                  </div>
                </div>

                {/* Achievements */}
                <div className="space-y-3">
                  {exp.achievements.map((achievement, achIdx) => (
                    <motion.div
                      key={achIdx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: achIdx * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-cyan mt-1.5 shrink-0 text-xs">
                        ▹
                      </span>
                      <p className="text-muted text-sm leading-relaxed">
                        {achievement}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
