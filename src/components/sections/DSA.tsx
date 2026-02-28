"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

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
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      id="dsa"
      ref={ref}
      className="relative py-28 md:py-36 px-4 scene-transition"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Training montage — big dramatic counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-12"
        >
          <div className="inline-flex flex-col items-center p-8 md:p-10 border border-card-border bg-card/20 backdrop-blur-sm relative overflow-hidden">
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-cyan/25" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-cyan/25" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-cyan/25" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-cyan/25" />

            {/* Label */}
            <span className="text-[9px] font-mono text-gold/40 tracking-[0.4em] uppercase mb-4">
              Training Record
            </span>

            <div className="text-6xl md:text-8xl font-bold text-cyan text-glow-cyan mb-3 font-mono">
              <AnimatedCounter target={400} suffix="+" duration={2500} />
            </div>
            <p className="text-muted/60 text-xs uppercase tracking-[0.3em] font-mono">
              LeetCode Problems Conquered
            </p>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-10"
        >
          <p className="text-muted max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
            Strong foundation in data structures and algorithms with a focus on{" "}
            <span className="text-foreground">backend problem-solving</span>.
            Every system I architect is backed by algorithmic thinking — from
            choosing the right data structure for caching to optimizing database
            query patterns.
          </p>
        </motion.div>

        {/* Category badges — training disciplines */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {dsaCategories.map((cat, i) => (
            <motion.span
              key={cat}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.06 }}
              className="px-3 py-1.5 border border-purple/15 text-purple/60 text-xs font-mono uppercase tracking-wider
                         hover:border-purple/30 hover:text-purple/80 hover:bg-purple/5 transition-all duration-300 cursor-default"
            >
              {cat}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
