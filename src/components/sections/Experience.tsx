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
      className="border-b-4 border-[#1a1a1a]"
      style={{ background: "#fff" }}
    >
      {/* Header */}
      <div className="bg-[#0052CC] border-b-4 border-[#1a1a1a] px-6 py-3 flex items-center gap-4">
        <span className="font-heading text-white text-3xl uppercase tracking-wider">Chapter V</span>
        <span className="font-heading text-[#FFE600] text-lg uppercase tracking-widest">— Origin Story</span>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        {experiences.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="comic-panel overflow-hidden"
          >
            {/* Blue accent top */}
            <div className="h-3 bg-[#0052CC]" />

            <div className="p-6 md:p-8">
              {/* Header block */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                <div>
                  <h3 className="font-heading text-3xl md:text-4xl text-[#1a1a1a] uppercase leading-none">
                    {exp.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <span className="font-heading text-[#E8002D] text-xl">{exp.company}</span>
                    <span
                      className="font-heading text-xs uppercase px-3 py-0.5 bg-[#FFE600] border-2 border-[#1a1a1a] shadow-[2px_2px_0_#1a1a1a]"
                    >
                      {exp.type}
                    </span>
                  </div>
                </div>
                <div
                  className="font-heading text-lg bg-[#1a1a1a] text-[#FFE600] px-4 py-1"
                >
                  {exp.period}
                </div>
              </div>

              {/* Divider */}
              <div className="h-1 bg-[#1a1a1a] mb-5" />

              {/* Achievements */}
              <div className="space-y-3">
                {exp.achievements.map((ach, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.07 }}
                    className="flex items-start gap-3 comic-panel p-3"
                    style={{ background: i % 2 === 0 ? "#FFFBF0" : "#fff" }}
                  >
                    <span className="font-heading text-[#E8002D] text-lg mt-0 shrink-0">▶</span>
                    <p className="font-comic text-sm text-[#333] leading-relaxed">{ach}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
