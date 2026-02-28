"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

const scenes = [
  { id: "hero", label: "I" },
  { id: "about", label: "II" },
  { id: "skills", label: "III" },
  { id: "projects", label: "IV" },
  { id: "experience", label: "V" },
  { id: "dsa", label: "VI" },
  { id: "contact", label: "VII" },
];

export default function SceneIndicator() {
  const [activeScene, setActiveScene] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY / scrollHeight;
    setProgress(scrolled);

    const scrollPos = window.scrollY + window.innerHeight / 2;
    for (let i = scenes.length - 1; i >= 0; i--) {
      const el = document.getElementById(scenes[i].id);
      if (el && el.offsetTop <= scrollPos) {
        setActiveScene(i);
        return;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 7.5, duration: 1 }}
      className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-3"
    >
      {/* Progress line */}
      <div className="absolute left-1/2 -translate-x-1/2 w-px h-full bg-card-border">
        <motion.div
          className="w-full bg-linear-to-b from-cyan to-purple"
          style={{ height: `${progress * 100}%` }}
        />
      </div>

      {scenes.map((scene, i) => (
        <button
          key={scene.id}
          onClick={() => {
            const el = document.getElementById(scene.id);
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 ${
            i === activeScene
              ? "bg-cyan/20 border border-cyan/60 scale-110"
              : "bg-card border border-card-border hover:border-muted/50"
          }`}
          aria-label={`Scene ${scene.label}`}
        >
          <span
            className={`text-[9px] font-mono transition-colors duration-300 ${
              i === activeScene ? "text-cyan" : "text-muted/60"
            }`}
          >
            {scene.label}
          </span>
          {/* Active pulse */}
          {i === activeScene && (
            <motion.div
              className="absolute inset-0 rounded-full border border-cyan/30"
              animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </button>
      ))}
    </motion.div>
  );
}
