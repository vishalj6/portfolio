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

  const nameLetters = "VISHAL JADEJA".split("");

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden scene-transition"
    >
      {/* Dramatic spotlight from top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-200 bg-linear-to-b from-cyan/4 via-transparent to-transparent pointer-events-none blur-[80px]" />

      {/* Subtle ambient glow */}
      <div className="absolute top-1/3 right-1/4 w-100 h-100 rounded-full bg-purple/3 blur-[150px] pointer-events-none" />

      {/* Corner brackets — cinematic framing */}
      <div className="absolute top-[8vh] left-6 md:left-12 w-8 h-8 border-l border-t border-cyan/15" />
      <div className="absolute top-[8vh] right-6 md:right-12 w-8 h-8 border-r border-t border-cyan/15" />
      <div className="absolute bottom-[8vh] left-6 md:left-12 w-8 h-8 border-l border-b border-cyan/15" />
      <div className="absolute bottom-[8vh] right-6 md:right-12 w-8 h-8 border-r border-b border-cyan/15" />

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Scene marker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 7.5, duration: 1.5 }}
          className="mb-6"
        >
          <span className="text-[10px] md:text-xs font-mono text-cyan/30 tracking-[0.6em] uppercase">
            Scene I — The Protagonist
          </span>
        </motion.div>

        {/* Horizontal line reveal */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 7.8, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-24 md:w-40 h-px bg-linear-to-r from-transparent via-cyan/30 to-transparent mx-auto mb-10"
        />

        {/* Greeting — film-style */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 8.2, duration: 0.8 }}
          className="text-muted text-xs md:text-sm tracking-[0.4em] uppercase mb-6"
        >
          A Vishal Jadeja Film
        </motion.p>

        {/* Name — letter-by-letter dramatic reveal */}
        <div className="flex items-center justify-center gap-0.5 md:gap-1 mb-6 flex-wrap">
          {nameLetters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                delay: 8.5 + i * 0.08,
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className={`text-4xl sm:text-6xl md:text-8xl font-bold inline-block ${
                letter === " " ? "w-3 md:w-6" : "text-glow-cyan text-cyan"
              }`}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </div>

        {/* Role — typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 10, duration: 0.8 }}
          className="h-10 md:h-14 mb-6 flex items-center justify-center"
        >
          <h2 className="text-lg sm:text-xl md:text-3xl font-mono text-foreground/80">
            {displayText}
            <span className="inline-block w-0.5 h-[0.9em] bg-cyan/60 ml-1 align-middle" style={{ animation: "typewriter-cursor 0.8s step-end infinite" }} />
          </h2>
        </motion.div>

        {/* Subtitle tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 10.5, duration: 0.8 }}
          className="flex items-center justify-center gap-3 md:gap-5 mb-12 flex-wrap"
        >
          {["Full Stack Engineer", "MERN", "Microservices", "Real-Time Systems"].map(
            (tag, i) => (
              <span
                key={tag}
                className="text-xs md:text-sm text-muted/60 font-mono tracking-wider"
              >
                {i > 0 && <span className="mr-3 md:mr-5 text-cyan/20">•</span>}
                {tag}
              </span>
            )
          )}
        </motion.div>

        {/* CTA buttons — minimal cinematic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 11, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          <a
            href="#projects"
            className="group relative px-8 py-3 text-sm font-mono tracking-wider uppercase text-cyan border border-cyan/20
                       hover:border-cyan/50 hover:bg-cyan/5 transition-all duration-500"
          >
            <span className="relative z-10">View Missions</span>
            {/* Corner accents */}
            <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan/50" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan/50" />
          </a>
          <a
            href="/resume.pdf"
            download
            className="group relative px-8 py-3 text-sm font-mono tracking-wider uppercase text-purple/80 border border-purple/20
                       hover:border-purple/50 hover:bg-purple/5 transition-all duration-500"
          >
            <span className="relative z-10">Dossier</span>
            <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-purple/50" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-purple/50" />
          </a>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 12, duration: 1 }}
          className="absolute -bottom-24 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="flex flex-col items-center gap-3 text-muted/30"
          >
            <span className="text-[10px] tracking-[0.4em] uppercase font-mono">
              Scroll to Continue
            </span>
            <div className="w-px h-8 bg-linear-to-b from-cyan/20 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
