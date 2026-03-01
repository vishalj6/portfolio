"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { projects } from "@/data/projects";

const accentColors = ["#E8002D", "#0052CC"];

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section
      id="projects"
      ref={ref}
      className="border-b-4 border-[#1a1a1a]"
      style={{ background: "#1a1a1a" }}
    >
      {/* Header */}
      <div className="bg-[#FFE600] border-b-4 border-[#1a1a1a] px-6 py-3 flex items-center gap-4">
        <span className="font-heading text-[#1a1a1a] text-3xl uppercase tracking-wider">Chapter IV</span>
        <span className="font-heading text-[#E8002D] text-lg uppercase tracking-widest">— Featured Projects</span>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 space-y-10">
        {projects.map((project, index) => {
          const accent = accentColors[index % accentColors.length];
          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="comic-panel relative overflow-hidden"
            >
              {/* Top accent bar */}
              <div className="h-3" style={{ background: accent }} />

              <div className="p-6 md:p-8">
                {/* Issue badge */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span
                      className="font-heading text-xs uppercase tracking-widest px-3 py-0.5 border-2 border-[#1a1a1a] shadow-[2px_2px_0_#1a1a1a] inline-block mb-3"
                      style={{ background: accent, color: accent === "#E8002D" ? "#fff" : "#fff" }}
                    >
                      Issue #{String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-heading text-3xl md:text-4xl text-[#1a1a1a] uppercase leading-none">
                      {project.title}
                    </h3>
                    <p className="font-comic text-sm italic mt-1" style={{ color: accent }}>
                      {project.tagline}
                    </p>
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="comic-btn text-xs py-1.5 px-3"
                      style={{
                        background: "#1a1a1a",
                        color: "#FFE600",
                        border: "2px solid #1a1a1a",
                        boxShadow: "3px 3px 0 #555",
                      }}
                    >
                      GitHub
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="comic-btn text-xs py-1.5 px-3"
                        style={{ background: accent, color: "#fff", border: "2px solid #1a1a1a", boxShadow: "3px 3px 0 #1a1a1a" }}
                      >
                        Live
                      </a>
                    )}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-1 mb-4" style={{ background: accent }} />

                {/* Description */}
                <p className="font-comic text-[#1a1a1a] text-sm md:text-base leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Highlights */}
                <div className="grid sm:grid-cols-2 gap-2 mb-5">
                  {project.highlights.map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.2 + i * 0.08 }}
                      className="flex items-start gap-2"
                    >
                      <span className="font-heading text-base mt-0.5 shrink-0" style={{ color: accent }}>✦</span>
                      <span className="font-comic text-sm text-[#333]">{h}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="font-comic text-[10px] uppercase tracking-wider px-2.5 py-1 font-bold"
                      style={{
                        background: "#FFE600",
                        color: "#1a1a1a",
                        border: "2px solid #1a1a1a",
                        boxShadow: "2px 2px 0 #1a1a1a",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
