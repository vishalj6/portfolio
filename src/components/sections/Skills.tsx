"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { skillCategories } from "@/data/skills";

const panelColors = [
  { bg: "#FFE600", border: "#1a1a1a", text: "#1a1a1a", accent: "#E8002D" },
  { bg: "#fff", border: "#1a1a1a", text: "#1a1a1a", accent: "#0052CC" },
  { bg: "#0052CC", border: "#1a1a1a", text: "#fff", accent: "#FFE600" },
  { bg: "#E8002D", border: "#1a1a1a", text: "#fff", accent: "#FFE600" },
  { bg: "#1a1a1a", border: "#FFE600", text: "#fff", accent: "#FFE600" },
  { bg: "#fff", border: "#1a1a1a", text: "#1a1a1a", accent: "#E8002D" },
];

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section
      id="skills"
      ref={ref}
      className="border-b-4 border-[#1a1a1a]"
      style={{ background: "#FFFBF0" }}
    >
      {/* Header */}
      <div className="bg-[#E8002D] border-b-4 border-[#1a1a1a] px-6 py-3 flex items-center gap-4">
        <span className="font-heading text-white text-3xl uppercase tracking-wider">Chapter III</span>
        <span className="font-heading text-[#FFE600] text-lg uppercase tracking-widest">— Tech Arsenal</span>
      </div>

      {/* Comic grid of skill panels */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 border-l-4 border-[#1a1a1a]">
        {skillCategories.map((cat, i) => {
          const palette = panelColors[i % panelColors.length];
          return (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="border-r-4 border-b-4 border-[#1a1a1a] p-6 relative overflow-hidden"
              style={{ background: palette.bg }}
            >
              {/* Halftone pattern */}
              <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
                  backgroundSize: "8px 8px",
                }}
              />

              {/* Category header */}
              <div className="relative flex items-center gap-3 mb-4">
                <span className="text-2xl">{cat.icon}</span>
                <div
                  className="font-heading text-xl uppercase tracking-wider"
                  style={{ color: i % 2 === 0 ? palette.accent : palette.text }}
                >
                  {cat.title}
                </div>
              </div>

              {/* Skill pills */}
              <div className="relative flex flex-wrap gap-2">
                {cat.skills.map((skill, si) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.25, delay: 0.3 + i * 0.06 + si * 0.04 }}
                    className="font-comic text-xs px-2.5 py-1 font-bold uppercase tracking-wide"
                    style={{
                      background: palette.accent,
                      color: palette.accent === "#FFE600" ? "#1a1a1a" : "#fff",
                      border: `2px solid ${palette.border}`,
                      boxShadow: `2px 2px 0 ${palette.border}`,
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
