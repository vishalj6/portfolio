"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

const scenes = [
  { id: "hero",       chapter: "I",   label: "The Realm"    },
  { id: "about",      chapter: "II",  label: "The Chronicle" },
  { id: "skills",     chapter: "III", label: "The Armory"   },
  { id: "projects",   chapter: "IV",  label: "The Victories" },
  { id: "experience", chapter: "V",   label: "The Service"  },
  { id: "dsa",        chapter: "VI",  label: "The Road"     },
  { id: "contact",    chapter: "VII", label: "The Raven"    },
];

// ─── Campfire stop marker ────────────────────────────────────────────────────
function CampfireStop({
  active,
  visited,
}: {
  active: boolean;
  visited: boolean;
}) {
  if (active) {
    return (
      <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
        {/* Log base */}
        <ellipse cx="10" cy="19" rx="6.5" ry="2" fill="#3e3528" />
        {/* Inner ember glow */}
        <ellipse cx="10" cy="18.5" rx="4" ry="1.2" fill="#d4b45c25" />
        {/* Outer flame */}
        <path
          className="campfire-flame"
          d="M10 16 C9 14 7.5 12.5 8 10 C8.5 8.5 9.5 8 9.5 6.5
             C10 8 11 9 10.5 10.5
             C11.5 9.5 11.5 8 11.5 6.5
             C12.5 8 13 10 12 12
             C13 11.5 13.5 10 13 9
             C14 11 13.5 13 12 14.5
             C12.5 13.5 13 12.5 12.5 12
             C12 14 11 15.5 10 16 Z"
          fill="#d4b45c"
          opacity="0.9"
        />
        {/* Inner bright core */}
        <path
          className="campfire-flame"
          style={{ animationDelay: "0.3s" }}
          d="M10 15.5 C9.5 13.5 9 12 9.5 10.5
             C10 9.5 10 9 10 8
             C10.5 9.5 11 10.5 10.5 12
             C11 11.5 11.5 10 11.5 9
             C12 10.5 12 12.5 11 14
             C11.5 13 11.5 11.5 11 11
             C10.5 12.5 10.5 14 10 15.5 Z"
          fill="#f5d87a"
          opacity="0.75"
        />
      </svg>
    );
  }

  if (visited) {
    return (
      <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
        {/* Cold ash log */}
        <ellipse cx="10" cy="19" rx="5.5" ry="1.8" fill="#2c251e" />
        {/* Dying ember */}
        <circle cx="10" cy="15" r="2.5" fill="#9b2a3a" opacity="0.5" />
        <circle cx="10" cy="15" r="1.2" fill="#c8a951" opacity="0.35" />
      </svg>
    );
  }

  // Unvisited — cold wood pile
  return (
    <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
      <rect x="5" y="17" width="10" height="1.5" rx="0.7" fill="#201c18" stroke="#3e352850" strokeWidth="0.5" />
      <rect x="6.5" y="15" width="7" height="1.5" rx="0.7" fill="#17140f" stroke="#3e352840" strokeWidth="0.5" />
      <rect x="7.5" y="13" width="5" height="1.5" rx="0.7" fill="#14110e" stroke="#3e352830" strokeWidth="0.5" />
    </svg>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function SceneIndicator() {
  const [activeScene, setActiveScene]   = useState(0);
  const [progress, setProgress]         = useState(0);
  const [hoveredScene, setHoveredScene] = useState<number | null>(null);

  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled     = window.scrollY / scrollHeight;
    setProgress(Math.min(scrolled, 1));

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
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Layout constants
  const STOP_COUNT   = scenes.length;
  const STOP_GAP     = 44;                          // px between stops
  const TOTAL_HEIGHT = (STOP_COUNT - 1) * STOP_GAP; // 264px
  const CX           = 18;                           // SVG centre-x of path

  // Gently winding path — alternating x offsets
  const stopY = (i: number) => i * STOP_GAP;
  const stopX = (i: number) => CX + (i % 2 === 0 ? -4 : 4);

  // Build smooth cubic-bezier path through all stops
  const buildPath = () => {
    let d = `M ${stopX(0)} ${stopY(0)}`;
    for (let i = 1; i < STOP_COUNT; i++) {
      const px = stopX(i - 1), py = stopY(i - 1);
      const cx = stopX(i),     cy = stopY(i);
      const midY = (py + cy) / 2;
      d += ` C ${px} ${midY}, ${cx} ${midY}, ${cx} ${cy}`;
    }
    return d;
  };

  const roadPath  = buildPath();
  const litHeight = progress * TOTAL_HEIGHT;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 1 }}
      className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center"
      style={{ width: 48, height: TOTAL_HEIGHT + 44 }}
    >
      {/* ── Road SVG ── */}
      <svg
        width={48}
        height={TOTAL_HEIGHT}
        viewBox={`0 0 48 ${TOTAL_HEIGHT}`}
        className="absolute top-0 left-0"
        overflow="visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="road-lit" x1="0" y1="0" x2="0" y2={TOTAL_HEIGHT}
            gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#d4b45c" />
            <stop offset="55%"  stopColor="#9b2a3a" />
            <stop offset="100%" stopColor="#6ba0bb" />
          </linearGradient>
          <clipPath id="road-progress-clip">
            <rect x="0" y="0" width="48" height={litHeight} />
          </clipPath>
        </defs>

        {/* Unlit trail — dim dashed */}
        <path d={roadPath} stroke="#3e352848" strokeWidth="1.5"
          fill="none" strokeDasharray="3 5" strokeLinecap="round" />

        {/* Lit trail — scroll-driven gold→crimson→ice gradient */}
        <path d={roadPath} stroke="url(#road-lit)" strokeWidth="1.5"
          fill="none" strokeLinecap="round"
          clipPath="url(#road-progress-clip)" />
      </svg>

      {/* ── Campfire stops ── */}
      {scenes.map((scene, i) => {
        const isActive  = i === activeScene;
        const isVisited = i < activeScene;
        const isHovered = i === hoveredScene;
        const topPos    = stopY(i) - 11; // centre the 22px icon on the stop y
        const leftPos   = stopX(i) - 10; // centre the 20px icon on the stop x

        return (
          <div
            key={scene.id}
            className="absolute"
            style={{ top: topPos, left: leftPos }}
          >
            {/* Active: ambient glow halo */}
            {isActive && (
              <motion.div
                className="absolute -inset-3 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(212,180,92,0.18) 0%, transparent 72%)" }}
                animate={{ opacity: [0.5, 1, 0.5], scale: [0.85, 1.1, 0.85] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              />
            )}

            <button
              onClick={() => {
                const el = document.getElementById(scene.id);
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              onMouseEnter={() => setHoveredScene(i)}
              onMouseLeave={() => setHoveredScene(null)}
              className="relative cursor-pointer transition-transform duration-300 hover:scale-110 focus:outline-none"
              aria-label={`${scene.label} — Chapter ${scene.chapter}`}
            >
              <CampfireStop active={isActive} visited={isVisited} />
            </button>

            {/* Hover tooltip (left side) */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 6 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-full mr-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ whiteSpace: "nowrap" }}
                >
                  <div className="flex items-center gap-2 px-2.5 py-1.5
                    bg-card/90 backdrop-blur-sm border border-card-border/70">
                    <span className="text-gold/50 font-heading text-[8px] tracking-wider">
                      {scene.chapter}
                    </span>
                    <div className="w-px h-3 bg-card-border" />
                    <span className="text-foreground/65 font-mono text-[10px] italic">
                      {scene.label}
                    </span>
                  </div>
                  {/* Pointer arrow */}
                  <div
                    className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0"
                    style={{
                      borderTop:    "4px solid transparent",
                      borderBottom: "4px solid transparent",
                      borderLeft:   "4px solid #3e3528b0",
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </motion.div>
  );
}

