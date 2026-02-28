"use client";

import MotionWrapper from "@/components/ui/MotionWrapper";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-32 px-4">
      {/* Section accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-cyan/20 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <MotionWrapper className="mb-16">
          <p className="text-cyan text-sm tracking-[0.3em] uppercase mb-3">
            03. Projects
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">
            The Engineering Work
          </h2>
        </MotionWrapper>

        {/* Project cards */}
        <div className="grid md:grid-cols-2 gap-8" style={{ perspective: "1000px" }}>
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
