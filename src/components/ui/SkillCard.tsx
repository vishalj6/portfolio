"use client";

import { motion } from "framer-motion";

interface SkillCardProps {
  skill: string;
  index: number;
}

export default function SkillCard({ skill, index }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 0 25px #00f0ff44, 0 0 50px #00f0ff11",
      }}
      className="relative px-4 py-2.5 rounded-lg border border-card-border bg-card/60 backdrop-blur-sm cursor-default
                 transition-colors duration-300 hover:border-cyan/40 hover:bg-card-hover group"
    >
      <span className="text-sm text-foreground/90 group-hover:text-cyan transition-colors duration-300">
        {skill}
      </span>
    </motion.div>
  );
}
