"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<"glitch" | "reveal" | "fade">("glitch");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("reveal"), 800);
    const t2 = setTimeout(() => setPhase("fade"), 2200);
    const t3 = setTimeout(() => onComplete(), 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "fade" ? null : null}
      <motion.div
        key="loading"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        animate={phase === "fade" ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="fixed inset-0 z-100 flex items-center justify-center bg-background"
        onAnimationComplete={() => {
          if (phase === "fade") onComplete();
        }}
      >
        {/* Background grid */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(#00f0ff11 1px, transparent 1px), linear-gradient(90deg, #00f0ff11 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative">
          {/* Glitch text layers */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {/* Main text */}
            <motion.h1
              className="text-4xl md:text-6xl font-bold tracking-wider text-foreground"
              animate={
                phase === "glitch"
                  ? {
                      opacity: [0, 1, 0.8, 1, 0.9, 1],
                    }
                  : {}
              }
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="text-cyan">VISHAL</span>{" "}
              <span className="text-foreground">JADEJA</span>
            </motion.h1>

            {/* Glitch overlay 1 */}
            {phase === "glitch" && (
              <div
                className="absolute inset-0 text-4xl md:text-6xl font-bold tracking-wider text-cyan/50"
                style={{ animation: "glitch-1 0.8s linear" }}
              >
                <span>VISHAL</span> <span>JADEJA</span>
              </div>
            )}

            {/* Glitch overlay 2 */}
            {phase === "glitch" && (
              <div
                className="absolute inset-0 text-4xl md:text-6xl font-bold tracking-wider text-purple/50"
                style={{ animation: "glitch-2 0.8s linear" }}
              >
                <span>VISHAL</span> <span>JADEJA</span>
              </div>
            )}
          </motion.div>

          {/* Subtitle reveal */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={
              phase === "reveal" || phase === "fade"
                ? { opacity: 1, y: 0 }
                : {}
            }
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center mt-4"
          >
            <p className="text-muted text-sm md:text-base tracking-[0.3em] uppercase">
              Full Stack Engineer
            </p>
          </motion.div>

          {/* Loading bar */}
          <motion.div
            className="mt-8 h-0.5 bg-card-border rounded-full overflow-hidden mx-auto"
            style={{ width: "200px" }}
          >
            <motion.div
              className="h-full bg-linear-to-r from-cyan to-purple"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
