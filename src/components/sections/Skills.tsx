"use client";

import { useInView } from "react-intersection-observer";
import { skillCategories } from "@/data/skills";

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="skills" ref={ref} className="border-t border-[#1F1F1F] py-24 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="flex items-baseline gap-6 mb-16">
          <span className="text-[#F5FF82]/50 text-xs font-mono tracking-widest">02</span>
          <span className="section-label">Skills</span>
          <div className="section-line" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((cat, ci) => (
            <div
              key={cat.title}
              className={`transition-all duration-600 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
              style={{ transitionDelay: `${ci * 80}ms` }}
            >
              <h3 className="text-[#F2F2F0] text-sm font-semibold tracking-wide mb-4">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, si) => (
                  <span
                    key={skill}
                    className={`skill-tag transition-all duration-400 ${inView ? "opacity-100" : "opacity-0"}`}
                    style={{ transitionDelay: `${ci * 80 + si * 40}ms` }}
                  >{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
