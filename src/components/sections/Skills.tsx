"use client";

import { motion } from "framer-motion";
import MotionWrapper from "@/components/ui/MotionWrapper";
import SkillCard from "@/components/ui/SkillCard";
import { skillCategories } from "@/data/skills";
import { staggerContainer, fadeUp } from "@/lib/animations";

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32 px-4 bg-section/50">
      {/* Section accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-purple/20 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <MotionWrapper className="mb-16">
          <p className="text-cyan text-sm tracking-[0.3em] uppercase mb-3">
            02. Skills
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">Tech Arsenal</h2>
        </MotionWrapper>

        {/* Skill categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-4"
            >
              {/* Category header */}
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
                <span className="text-xl">{category.icon}</span>
                <h3 className="text-lg font-semibold text-foreground">
                  {category.title}
                </h3>
                <div className="flex-1 h-px bg-card-border" />
              </motion.div>

              {/* Skill pills */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIdx) => (
                  <SkillCard
                    key={skill}
                    skill={skill}
                    index={catIdx * 2 + skillIdx}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
