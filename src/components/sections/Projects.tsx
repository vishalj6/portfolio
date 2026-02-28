"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { projects } from "@/data/projects";

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-28 md:py-36 px-4 scene-transition"
    >
      <div className="max-w-5xl mx-auto">
        {/* Mission briefing cards */}
        <div className="space-y-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: index * 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="relative border border-card-border bg-card/20 backdrop-blur-sm
                         hover:border-cyan/15 transition-all duration-700 group overflow-hidden"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-cyan/20 to-transparent" />

              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-cyan/25" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-cyan/25" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-cyan/25" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-cyan/25" />

              {/* Scanning light animation */}
              <motion.div
                initial={{ left: "-30%" }}
                animate={inView ? { left: "130%" } : {}}
                transition={{
                  duration: 2,
                  delay: 0.8 + index * 0.3,
                  ease: "easeInOut",
                }}
                className="absolute top-0 w-[15%] h-full bg-linear-to-r from-transparent via-cyan/3 to-transparent pointer-events-none"
              />

              <div className="p-6 md:p-8">
                {/* Mission header */}
                <div className="flex items-start justify-between mb-6 gap-4">
                  <div>
                    {/* Classification tag */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[9px] font-mono text-gold/50 tracking-[0.3em] uppercase px-2 py-0.5 border border-gold/20">
                        Mission {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="w-8 h-px bg-card-border" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-cyan transition-colors duration-500">
                      {project.title}
                    </h3>
                    <p className="text-cyan/50 text-sm mt-1 font-mono">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3 shrink-0">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 border border-card-border hover:border-cyan/30 text-muted hover:text-cyan transition-all duration-300"
                      aria-label="Source Code"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                      </svg>
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 border border-card-border hover:border-cyan/30 text-muted hover:text-cyan transition-all duration-300"
                        aria-label="Live Demo"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-card-border mb-6" />

                {/* Description */}
                <p className="text-muted text-sm md:text-base leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Highlights — briefing style */}
                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  {project.highlights.map((highlight, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -15 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.8 + index * 0.3 + i * 0.1 }}
                      className="flex items-start gap-2 text-sm"
                    >
                      <span className="text-cyan/50 mt-0.5 shrink-0 font-mono text-[10px]">▸</span>
                      <span className="text-foreground/70">{highlight}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] px-2 py-1 border border-purple/15 text-purple/60 font-mono uppercase tracking-wider
                                 hover:border-purple/30 hover:text-purple/80 transition-colors duration-300"
                    >
                      {tech}
                    </span>
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
