"use client";

import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { projects } from "@/data/projects";

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="projects" ref={ref} className="border-t border-[#1F1F1F] py-24 px-6 md:px-16 bg-[#0F0F0F]">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="flex items-baseline gap-6 mb-16">
          <span className="text-[#F5FF82]/50 text-xs font-mono tracking-widest">04</span>
          <span className="section-label">Projects</span>
          <div className="section-line" />
        </div>

        <div
          className={`grid md:grid-cols-2 gap-px border border-[#1F1F1F] transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          {projects.map((project, i) => (
            <div
              key={project.title}
              className={`bg-[#0C0C0C] flex flex-col group h-full card-glow ${projects.length % 2 !== 0 && i === projects.length - 1
                ? "md:col-span-2 md:max-w-[50%] md:mx-auto w-full"
                : ""
                }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Project image */}
              {project.imageUrl && (
                <div className="relative w-full h-60 overflow-hidden border-b border-[#1A1A1A] shrink-0">
                  <Image
                    src={project.imageUrl}
                    alt={`${project.title} screenshot`}
                    fill
                    className="object-cover object-start opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0C0C0C]" />
                </div>
              )}

              {/* Card content */}
              <div className="flex flex-col gap-5 p-8 flex-1 h-full">

                {/* Number + title */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="section-label mb-2 block">0{i + 1}</span>
                    <h3 className="text-[#F2F2F0] text-xl font-semibold">{project.title}</h3>
                    <p className="text-[#F5FF82] text-xs mt-1">{project.tagline}</p>
                  </div>
                  {/* Links */}
                  <div className="flex gap-3 shrink-0 ml-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#6B6B6B] hover:text-[#F5FF82] transition-colors"
                      aria-label="GitHub"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                      </svg>
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#6B6B6B] hover:text-[#F5FF82] transition-colors"
                        aria-label="Live"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-[#6B6B6B] text-sm leading-relaxed flex-1">{project.description}</p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="skill-tag">{tech}</span>
                  ))}
                </div>
              </div>{/* end card content */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
