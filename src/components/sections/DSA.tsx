"use client";

import { motion } from "framer-motion";
import MotionWrapper from "@/components/ui/MotionWrapper";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { staggerContainer, fadeUp, scaleIn } from "@/lib/animations";

const dsaCategories = [
  "Trees",
  "Graphs",
  "Dynamic Programming",
  "Arrays",
  "Strings",
  "Linked Lists",
  "Binary Search",
  "Stack & Queue",
  "Greedy",
  "Backtracking",
];

export default function DSA() {
  return (
    <section id="dsa" className="relative py-24 md:py-32 px-4">
      {/* Section accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-cyan/20 to-transparent" />

      <div className="max-w-4xl mx-auto text-center">
        {/* Section heading */}
        <MotionWrapper className="mb-16">
          <p className="text-cyan text-sm tracking-[0.3em] uppercase mb-3">
            05. Problem Solving
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">
            DSA & Engineering Mindset
          </h2>
        </MotionWrapper>

        {/* Big counter */}
        <MotionWrapper variants={scaleIn} className="mb-12">
          <div className="inline-flex flex-col items-center p-8 rounded-2xl border border-card-border bg-card/50 backdrop-blur-sm glow-cyan">
            <div className="text-6xl md:text-8xl font-bold text-cyan text-glow-cyan mb-2">
              <AnimatedCounter target={400} suffix="+" duration={2500} />
            </div>
            <p className="text-muted text-sm uppercase tracking-wider">
              LeetCode Problems Solved
            </p>
          </div>
        </MotionWrapper>

        {/* Tagline */}
        <MotionWrapper className="mb-10">
          <p className="text-muted max-w-2xl mx-auto leading-relaxed">
            Strong foundation in data structures and algorithms with a focus on{" "}
            <span className="text-foreground">backend problem-solving</span>.
            Every system I architect is backed by algorithmic thinking — from
            choosing the right data structure for caching to optimizing database
            query patterns.
          </p>
        </MotionWrapper>

        {/* Category badges */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {dsaCategories.map((cat) => (
            <motion.span
              key={cat}
              variants={fadeUp}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px #a855f733",
              }}
              className="px-4 py-2 rounded-lg border border-purple/20 text-purple/80 text-sm bg-purple/5
                         hover:border-purple/40 hover:text-purple transition-colors cursor-default"
            >
              {cat}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
