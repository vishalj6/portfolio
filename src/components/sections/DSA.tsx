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
      className="border-t-4 border-b-4 border-black"
      style={{ background: "#FFE600" }}
    >
      {/* Header bar */}
      <div className="bg-black border-b-4 border-black px-6 py-3 flex items-center gap-4">
        <span className="font-heading text-[#FFE600] text-3xl uppercase tracking-wider">Chapter VI</span>
        <span className="font-heading text-white text-xl uppercase tracking-widest">— Problem Solver</span>
      </div>

      <div className="max-w-4xl mx-auto px-5 py-14 md:py-20 text-center">

        {/* Starburst badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={inView ? { opacity: 1, scale: 1, rotate: -5 } : {}}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          className="flex justify-center mb-12"
        >
          <div className="relative inline-block w-52 h-52 md:w-64 md:h-64">
            {/* Shadow layer */}
            <div
              className="absolute inset-0 bg-black"
              style={{
                clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
                transform: "translate(8px, 8px)",
              }}
            />
            {/* Red outer star */}
            <div
              className="absolute inset-0 bg-[#E8002D]"
              style={{
                clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
              }}
            />
            {/* Yellow inner star */}
            <div
              className="absolute inset-0 bg-[#FFE600] flex flex-col items-center justify-center"
              style={{
                clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
                transform: "scale(0.85) rotate(5deg)",
              }}
            >
              <span className="font-heading text-black text-5xl md:text-6xl leading-none">400+</span>
              <span className="font-mono text-black text-[10px] font-bold uppercase tracking-wide leading-tight mt-1">
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
          className="inline-block mb-10"
        >
          <div
            className="bg-white px-6 py-4 shadow-[5px_5px_0_#111]"
            style={{ border: "3px solid #111" }}
          >
            <p className="font-sans text-black text-sm md:text-base max-w-lg font-medium leading-relaxed">
              Strong foundation in data structures &amp; algorithms — every system I build is backed by algorithmic thinking,
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
              className="font-heading text-sm uppercase tracking-widest px-3 py-1.5 bg-black text-[#FFE600] shadow-[3px_3px_0_#555]"
              style={{ border: "2px solid #111" }}
            >
              {cat}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
