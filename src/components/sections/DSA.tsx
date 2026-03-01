"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const dsaCategories = [
  "Trees", "Graphs", "Dynamic Programming", "Arrays", "Strings",
  "Linked Lists", "Binary Search", "Stack & Queue", "Greedy", "Backtracking",
];

export default function DSA() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section
      id="dsa"
      ref={ref}
      className="border-b-4 border-[#1a1a1a]"
      style={{ background: "#FFE600" }}
    >
      {/* Header */}
      <div className="bg-[#1a1a1a] border-b-4 border-[#1a1a1a] px-6 py-3 flex items-center gap-4">
        <span className="font-heading text-[#FFE600] text-3xl uppercase tracking-wider">Chapter VI</span>
        <span className="font-heading text-white text-lg uppercase tracking-widest">— Problem Solver</span>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16 text-center">
        {/* Big number starburst */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={inView ? { opacity: 1, scale: 1, rotate: -5 } : {}}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          className="flex justify-center mb-10"
        >
          <div className="relative inline-block">
            {/* Starburst outer */}
            <div
              className="w-52 h-52 md:w-64 md:h-64 bg-[#E8002D] flex items-center justify-center absolute inset-0 m-auto"
              style={{
                clipPath:
                  "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
              }}
            />
            <div
              className="w-52 h-52 md:w-64 md:h-64 bg-[#FFE600] flex flex-col items-center justify-center relative"
              style={{
                clipPath:
                  "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
                transform: "scale(0.88) rotate(5deg)",
              }}
            >
              <span className="font-heading text-[#1a1a1a] text-5xl md:text-6xl leading-none">400+</span>
              <span className="font-comic text-[#1a1a1a] text-xs font-bold uppercase tracking-wide leading-tight mt-1">
                LeetCode<br />Solved!
              </span>
            </div>
          </div>
        </motion.div>

        {/* Speech bubble */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="inline-block mb-8"
        >
          <div className="bg-white border-3 border-[#1a1a1a] rounded-2xl px-6 py-3 shadow-[4px_4px_0_#1a1a1a]" style={{ border: "3px solid #1a1a1a" }}>
            <p className="font-comic text-[#1a1a1a] text-sm md:text-base max-w-lg">
              Strong foundation in data structures & algorithms — every system I build is backed by algorithmic thinking,
              from choosing the right cache structure to optimizing database query patterns.
            </p>
          </div>
        </motion.div>

        {/* Category badges */}
        <div className="flex flex-wrap justify-center gap-2.5">
          {dsaCategories.map((cat, i) => (
            <motion.span
              key={cat}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.25, delay: 0.4 + i * 0.06 }}
              className="font-heading text-sm uppercase tracking-widest px-3 py-1.5 bg-[#1a1a1a] text-[#FFE600] border-2 border-[#1a1a1a] shadow-[2px_2px_0_#555]"
            >
              {cat}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
