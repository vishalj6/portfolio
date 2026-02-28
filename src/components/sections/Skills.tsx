"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { skillCategories } from "@/data/skills";

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-28 md:py-36 px-4 scene-transition"
    >
      <div className="max-w-6xl mx-auto">
        {/* Skill categories — HUD style grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: catIdx * 0.12,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="relative p-5 border border-card-border bg-card/20 backdrop-blur-sm
                         hover:border-cyan/20 transition-all duration-500 group overflow-hidden"
            >
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-cyan/20 group-hover:border-cyan/40 transition-colors duration-500" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-cyan/20 group-hover:border-cyan/40 transition-colors duration-500" />

              {/* Scanning line */}
              <motion.div
                initial={{ left: "-20%" }}
                animate={inView ? { left: "120%" } : {}}
                transition={{
                  duration: 1.5,
                  delay: 0.5 + catIdx * 0.15,
                  ease: "easeInOut",
                }}
                className="absolute top-0 w-[10%] h-full bg-linear-to-r from-transparent via-cyan/5 to-transparent pointer-events-none"
              />

              {/* Category header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-lg">{category.icon}</span>
                <h3 className="text-sm font-mono font-semibold text-foreground uppercase tracking-wider">
                  {category.title}
                </h3>
              </div>

              {/* Skill pills */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIdx) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.3,
                      delay: 0.3 + catIdx * 0.1 + skillIdx * 0.05,
                    }}
                    className="text-xs px-2.5 py-1.5 border border-card-border text-muted/80 font-mono
                               hover:border-cyan/30 hover:text-cyan/80 hover:bg-cyan/5 transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>

              {/* Status indicator */}
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-card-border/50">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan/60 animate-pulse" />
                <span className="text-[9px] font-mono text-muted/40 uppercase tracking-wider">
                  Active
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
