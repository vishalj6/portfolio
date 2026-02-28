"use client";

import { motion } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";
import { staggerContainer, fadeUp } from "@/lib/animations";

export default function Hero() {
  const { displayText } = useTypewriter({
    strings: [
      "I Build Scalable Backend Systems.",
      "I Architect Real-Time Solutions.",
      "I Engineer High-Performance APIs.",
    ],
    typeSpeed: 70,
    deleteSpeed: 40,
    delayBetween: 2500,
    loop: true,
  });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
    >
      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-cyan/3 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-purple/5 blur-[120px] pointer-events-none" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-4xl mx-auto"
      >
        {/* Greeting */}
        <motion.p
          variants={fadeUp}
          className="text-cyan text-sm md:text-base tracking-[0.3em] uppercase mb-4 font-medium"
        >
          Hello, World
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 leading-tight"
        >
          {"Hi, I'm "}
          <span className="text-cyan text-glow-cyan">Vishal Jadeja</span>
          <span className="text-cyan">.</span>
        </motion.h1>

        {/* Typing effect */}
        <motion.div variants={fadeUp} className="h-10 md:h-14 mb-6 flex items-center justify-center">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-semibold text-foreground/90">
            {displayText}
            <span className="inline-block w-[3px] h-[1em] bg-cyan ml-1 animate-pulse align-middle" />
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="text-muted text-sm md:text-base mb-10 tracking-wide"
        >
          Full Stack Engineer &nbsp;|&nbsp; MERN &nbsp;|&nbsp; Microservices
          &nbsp;|&nbsp; Real-Time Systems
        </motion.p>

        {/* CTA buttons */}
        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="group relative px-8 py-3 rounded-lg bg-cyan/10 border border-cyan/30 text-cyan font-medium text-sm
                       hover:bg-cyan/20 hover:border-cyan/60 transition-all duration-300 glow-cyan"
          >
            <span className="relative z-10">View Projects</span>
          </a>
          <a
            href="/resume.pdf"
            download
            className="group relative px-8 py-3 rounded-lg bg-purple/10 border border-purple/30 text-purple font-medium text-sm
                       hover:bg-purple/20 hover:border-purple/60 transition-all duration-300 glow-purple"
          >
            <span className="relative z-10">Download Resume</span>
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="absolute -bottom-16 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-muted/60"
          >
            <span className="text-xs tracking-wider uppercase">Scroll</span>
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
