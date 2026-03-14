"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="border-t-4 border-border-main py-24 px-5 sm:px-8 md:px-16 bg-bg">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="flex items-center gap-4 mb-14">
          <span className="section-num">03</span>
          <h2 className="font-heading text-text-main text-4xl md:text-5xl tracking-wider uppercase">Projects</h2>
          <div className="flex-1 h-1 bg-text-main dark:bg-accent ml-2" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              key={project.title}
              className={`brutal-card flex flex-col h-full ${projects.length % 2 !== 0 && i === projects.length - 1
                  ? "md:col-span-2 md:max-w-[50%] md:mx-auto w-full"
                  : ""
                }`}
            >
              {/* Project image */}
              {project.imageUrl && (
                <div className="relative w-full h-52 overflow-hidden shrink-0" style={{ borderBottom: "3px solid #111" }}>
                  <Image
                    src={project.imageUrl}
                    alt={`${project.title} screenshot`}
                    fill
                    className="object-cover object-start"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                  />
                  {/* Number badge */}
                  <div className="absolute top-3 left-3 bg-accent border-2 border-black px-2 py-0.5 shadow-[2px_2px_0_#111]">
                    <span className="font-heading text-black text-xl leading-none">0{i + 1}</span>
                  </div>
                </div>
              )}

              {/* Card content */}
              <div className="flex flex-col gap-4 p-6 flex-1">

                {/* Title row */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-heading text-text-main text-3xl tracking-wider uppercase leading-none">{project.title}</h3>
                    <p className="font-mono text-xs text-text-muted mt-1 font-bold">{project.tagline}</p>
                  </div>
                  {/* Links */}
                  <div className="flex gap-2 shrink-0">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="p-2 border-2 border-border-main bg-card hover:bg-accent dark:hover:bg-accent hover:border-black dark:hover:border-black transition-colors duration-100 shadow-[2px_2px_0_#111] dark:shadow-[2px_2px_0_var(--color-accent)] hover:shadow-[1px_1px_0_#111] hover:translate-x-px hover:translate-y-px"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="stroke-black dark:stroke-text-muted">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                      </svg>
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Live"
                        className="p-2 border-2 border-border-main bg-card hover:bg-accent dark:hover:bg-accent hover:border-black dark:hover:border-black transition-colors duration-100 shadow-[2px_2px_0_#111] dark:shadow-[2px_2px_0_var(--color-accent)] hover:shadow-[1px_1px_0_#111] hover:translate-x-px hover:translate-y-px"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="stroke-black dark:stroke-text-muted">
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-text-muted text-sm leading-relaxed flex-1">{project.description}</p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 pt-2 border-t-2 border-border-main">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="skill-tag">{tech}</span>
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
