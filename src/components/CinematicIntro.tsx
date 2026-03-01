"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface CinematicIntroProps {
  onComplete: () => void;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [phase, setPhase] = useState<
    "black" | "narration" | "sigil" | "title" | "fade"
  >("black");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("narration"), 500),
      setTimeout(() => setPhase("sigil"), 3500),
      setTimeout(() => setPhase("title"), 5500),
      setTimeout(() => setPhase("fade"), 7500),
      setTimeout(() => onComplete(), 8300),
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
        {/* Parchment grain on intro */}
        <div className="parchment-grain" style={{ opacity: 0.06 }} />

        {/* Warm ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/3 blur-[150px] pointer-events-none" />

        {/* ── PHASE 1: Narration ── */}
        <AnimatePresence mode="wait">
          {phase === "narration" && (
            <motion.div
              key="narration"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center px-8 max-w-xl"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.7, y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-foreground/60 text-base md:text-xl leading-relaxed font-heading tracking-wide italic"
              >
                In the realm of endless code, where systems rise and fall like
                kingdoms...
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="text-gold/40 text-sm mt-6 tracking-[0.3em] uppercase font-heading"
              >
                one engineer forges his legacy
              </motion.p>
            </motion.div>
          )}

          {/* ── PHASE 2: House Sigil ── */}
          {phase === "sigil" && (
            <motion.div
              key="sigil"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col items-center gap-6"
            >
              {/* Shield sigil */}
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.7, ease: "backOut" }}
                className="relative"
              >
                {/* Shield shape with border */}
                <div className="w-24 h-28 md:w-28 md:h-32 relative flex items-center justify-center">
                  <svg viewBox="0 0 100 120" className="absolute inset-0 w-full h-full">
                    <path
                      d="M50 5 L95 20 L95 70 Q95 100 50 115 Q5 100 5 70 L5 20 Z"
                      fill="none"
                      stroke="#c8a951"
                      strokeWidth="2"
                      opacity="0.6"
                    />
                    <path
                      d="M50 12 L88 25 L88 68 Q88 95 50 108 Q12 95 12 68 L12 25 Z"
                      fill="none"
                      stroke="#c8a951"
                      strokeWidth="0.5"
                      opacity="0.3"
                    />
                  </svg>
                  <span className="text-gold text-3xl md:text-4xl font-heading font-bold text-glow-gold relative z-10">
                    VJ
                  </span>
                </div>
              </motion.div>

              <div className="text-center">
                <motion.p
                  initial={{ opacity: 0, letterSpacing: "0.6em" }}
                  animate={{ opacity: 0.8, letterSpacing: "0.4em" }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="text-gold/70 text-xs md:text-sm uppercase tracking-[0.4em] font-heading"
                >
                  House Jadeja
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="text-foreground/30 text-[10px] tracking-[0.3em] uppercase mt-2"
                >
                  Code is Our Steel
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
              {/* Ornamental line above */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-32 md:w-48 h-px bg-linear-to-r from-transparent via-gold/50 to-transparent mx-auto mb-6"
              />

              {/* Ornament */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.5, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-gold/30 text-2xl mb-4 font-heading"
              >
                ⚔
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-3xl sm:text-4xl md:text-6xl font-heading font-bold tracking-wider"
              >
                <span className="text-foreground/80">THE REALM OF</span>
                <br />
                <span className="text-gold text-glow-gold">VISHAL JADEJA</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-muted text-xs md:text-sm tracking-[0.4em] uppercase mt-6 font-heading"
              >
                A Chronicle of Code & Conquest
              </motion.p>

              {/* Ornamental line below */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                className="w-32 md:w-48 h-px bg-linear-to-r from-transparent via-crimson/40 to-transparent mx-auto mt-6"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
