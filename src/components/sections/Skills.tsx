"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/data/skills";

export default function Skills() {
  return (
    <section id="skills" className="border-t-4 border-border-main py-24 px-5 sm:px-8 md:px-16 bg-bg">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="flex items-center gap-4 mb-14">
          <span className="section-num">04</span>
          <h2 className="font-heading text-text-main text-4xl md:text-5xl tracking-wider uppercase">Skills</h2>
          <div className="flex-1 h-1 bg-text-main dark:bg-accent ml-2" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((cat, ci) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: ci * 0.1 }}
              key={cat.title}
            >
              {/* Category heading */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-accent border-2 border-border-main dark:border-[#111] shrink-0" />
                <h3 className="font-heading text-text-main text-2xl tracking-wider uppercase">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, si) => (
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: ci * 0.1 + si * 0.05 }}
                    key={skill}
                    className="skill-tag"
                  >{skill}</motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
