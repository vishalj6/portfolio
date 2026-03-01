"use client";

import { motion } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";

export default function Hero() {
  const { displayText } = useTypewriter({
    strings: [
      "I Build Scalable Backend Systems.",
      "I Architect Real-Time Solutions.",
      "I Engineer High-Performance APIs.",
    ],
    typeSpeed: 60,
    deleteSpeed: 35,
    delayBetween: 2500,
    loop: true,
  });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: "#FFE600",
        backgroundImage: "radial-gradient(circle, #e6c800 1.5px, transparent 1.5px)",
        backgroundSize: "20px 20px",
      }}
    >
      {/* Speed lines radiating from center */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          background: "repeating-conic-gradient(#000 0deg 1deg, transparent 1deg 8deg)",
          backgroundSize: "100% 100%",
          backgroundPosition: "50% 50%",
        }}
      />

      {/* Top panel border */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-[#1a1a1a]" />
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#1a1a1a]" />

      {/* POW starburst — top left */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: -12 }}
        transition={{ delay: 0.6, duration: 0.5, type: "spring", bounce: 0.5 }}
        className="absolute top-12 left-6 md:left-16 select-none pointer-events-none"
      >
        <div
          className="w-20 h-20 md:w-28 md:h-28 bg-[#E8002D] flex items-center justify-center"
          style={{
            clipPath:
              "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
          }}
        >
          <span className="font-heading text-white text-lg md:text-2xl rotate-[-12deg] leading-none">
            POW!
          </span>
        </div>
      </motion.div>

      {/* ZAP starburst — bottom right */}
      <motion.div
        initial={{ scale: 0, rotate: 10 }}
        animate={{ scale: 1, rotate: 8 }}
        transition={{ delay: 0.8, duration: 0.5, type: "spring", bounce: 0.5 }}
        className="absolute bottom-16 right-6 md:right-16 select-none pointer-events-none"
      >
        <div
          className="w-16 h-16 md:w-24 md:h-24 bg-[#0052CC] flex items-center justify-center"
          style={{
            clipPath:
              "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
          }}
        >
          <span className="font-heading text-white text-base md:text-xl rotate-[8deg] leading-none">
            ZAP!
          </span>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 pt-16">
        {/* Issue tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mb-4"
        >
          <span className="inline-block bg-[#E8002D] text-white font-heading text-sm px-4 py-1 border-2 border-[#1a1a1a] shadow-[2px_2px_0_#1a1a1a] uppercase tracking-widest">
            Issue #001 — Origin Story
          </span>
        </motion.div>

        {/* Main Name */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="font-heading uppercase leading-none mb-2"
          style={{
            fontSize: "clamp(3.5rem, 12vw, 9rem)",
            color: "#1a1a1a",
            WebkitTextStroke: "0px",
            textShadow: "6px 6px 0 rgba(0,0,0,0.15)",
            letterSpacing: "0.03em",
          }}
        >
          VISHAL
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="font-heading uppercase leading-none mb-6"
          style={{
            fontSize: "clamp(3.5rem, 12vw, 9rem)",
            color: "#E8002D",
            WebkitTextStroke: "3px #1a1a1a",
            paintOrder: "stroke fill",
            textShadow: "6px 6px 0 rgba(0,0,0,0.2)",
            letterSpacing: "0.03em",
          }}
        >
          JADEJA
        </motion.h1>

        {/* Speech bubble with role */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.55, duration: 0.4 }}
          className="inline-block relative mb-8"
        >
          <div className="bg-white border-3 border-[#1a1a1a] rounded-2xl px-6 py-3 shadow-[4px_4px_0_#1a1a1a] relative" style={{ border: "3px solid #1a1a1a" }}>
            <span className="font-heading text-[#1a1a1a] text-xl md:text-2xl uppercase tracking-wider">
              Full Stack Developer
            </span>
          </div>
          {/* Bubble tail */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0"
            style={{
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderTop: "16px solid #1a1a1a",
            }}
          />
          <div className="absolute -bottom-[13px] left-1/2 -translate-x-1/2 w-0 h-0 z-10"
            style={{
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: "13px solid #fff",
            }}
          />
        </motion.div>

        {/* Typewriter subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-8 mb-8 h-10 flex items-center justify-center"
        >
          <div className="bg-[#1a1a1a] text-[#FFE600] font-heading text-base md:text-xl px-5 py-2 tracking-wider uppercase">
            {displayText}
            <span
              className="inline-block w-0.5 h-[0.9em] bg-[#FFE600] ml-1 align-middle"
              style={{ animation: "typewriter-cursor 0.8s step-end infinite" }}
            />
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.4 }}
          className="flex flex-wrap gap-4 justify-center mt-4"
        >
          <a
            href="#projects"
            className="comic-btn text-base"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            See My Work →
          </a>
          <a
            href="#contact"
            className="comic-btn comic-btn-red text-base"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Hire Me!
          </a>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="mt-14 flex flex-wrap justify-center gap-4"
        >
          {[
            { val: "1500+", label: "Concurrent Users" },
            { val: "60%", label: "Polling Load Cut" },
            { val: "45%", label: "Latency Reduced" },
            { val: "400+", label: "LeetCode Solved" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-[#1a1a1a] text-white px-4 py-2 min-w-[100px] border-2 border-[#1a1a1a] shadow-[3px_3px_0_#555]"
            >
              <div className="font-heading text-[#FFE600] text-2xl leading-tight">{s.val}</div>
              <div className="font-comic text-[10px] text-gray-300 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
