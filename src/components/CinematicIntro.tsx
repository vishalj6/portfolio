"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface CinematicIntroProps {
  onComplete: () => void;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [phase, setPhase] = useState<
    "black" | "countdown" | "studio" | "title" | "fade"
  >("black");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("countdown"), 400),
      setTimeout(() => setPhase("studio"), 2200),
      setTimeout(() => setPhase("title"), 4000),
      setTimeout(() => setPhase("fade"), 6200),
      setTimeout(() => onComplete(), 7000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        animate={phase === "fade" ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-[200] bg-black flex items-center justify-center overflow-hidden"
        onAnimationComplete={() => {
          if (phase === "fade") onComplete();
        }}
      >
        {/* Film grain on intro too */}
        <div className="film-grain" style={{ opacity: 0.06 }} />

        {/* ── PHASE 1: Countdown ── */}
        <AnimatePresence mode="wait">
          {phase === "countdown" && (
            <motion.div
              key="countdown"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              {/* Film reel circle */}
              <div className="relative w-32 h-32 md:w-40 md:h-40">
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-foreground/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-2 rounded-full border border-foreground/10"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                />
                {/* Cross hairs */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-px bg-foreground/15" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-px bg-foreground/15" />
                </div>
                {/* Center circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border border-foreground/20" />
                </div>
                {/* Number */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <CountdownNumber />
                </div>
              </div>
              {/* Scratchy lines at edges */}
              <div className="absolute top-8 left-8 w-16 h-px bg-foreground/10" />
              <div className="absolute bottom-8 right-8 w-16 h-px bg-foreground/10" />
            </motion.div>
          )}

          {/* ── PHASE 2: Studio Logo ── */}
          {phase === "studio" && (
            <motion.div
              key="studio"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col items-center gap-6"
            >
              {/* Studio diamond */}
              <motion.div
                initial={{ rotate: 45, scale: 0 }}
                animate={{ rotate: 45, scale: 1 }}
                transition={{ duration: 0.6, ease: "backOut" }}
                className="w-16 h-16 border border-cyan/40 flex items-center justify-center"
              >
                <span className="text-cyan text-2xl font-bold -rotate-45">
                  VJ
                </span>
              </motion.div>

              <div className="text-center">
                <motion.p
                  initial={{ opacity: 0, letterSpacing: "0.5em" }}
                  animate={{ opacity: 1, letterSpacing: "0.3em" }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="text-foreground/60 text-xs md:text-sm uppercase tracking-[0.3em]"
                >
                  A Vishal Jadeja Production
                </motion.p>
              </div>
            </motion.div>
          )}

          {/* ── PHASE 3: Title Card ── */}
          {phase === "title" && (
            <motion.div
              key="title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center px-6"
            >
              {/* Thin line above */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-32 md:w-48 h-px bg-linear-to-r from-transparent via-cyan/50 to-transparent mx-auto mb-8"
              />

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight"
              >
                <span className="text-foreground">THE </span>
                <span className="text-cyan text-glow-cyan">ENGINEER</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-muted text-xs md:text-sm tracking-[0.4em] uppercase mt-4"
              >
                An Origin Story
              </motion.p>

              {/* Thin line below */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                className="w-32 md:w-48 h-px bg-linear-to-r from-transparent via-purple/50 to-transparent mx-auto mt-8"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}

/* Countdown number component */
function CountdownNumber() {
  const [num, setNum] = useState(3);

  useEffect(() => {
    const t1 = setTimeout(() => setNum(2), 600);
    const t2 = setTimeout(() => setNum(1), 1200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={num}
        initial={{ opacity: 0, scale: 1.5 }}
        animate={{ opacity: 0.6, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.25 }}
        className="text-3xl md:text-4xl font-mono text-foreground/60"
      >
        {num}
      </motion.span>
    </AnimatePresence>
  );
}
