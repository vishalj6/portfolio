"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface SceneHeadingProps {
  sceneNumber: string;
  title: string;
  subtitle?: string;
}

export default function SceneHeading({
  sceneNumber,
  title,
  subtitle,
}: SceneHeadingProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  return (
    <div
      ref={ref}
      className="relative flex flex-col items-center justify-center min-h-[40vh] md:min-h-[50vh] px-4 text-center"
    >
      {/* Horizontal rules */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-24 md:w-40 h-px bg-linear-to-r from-transparent via-cyan/30 to-transparent mb-8"
      />

      {/* Scene number */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.4 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-xs md:text-sm font-mono text-cyan/40 tracking-[0.5em] uppercase mb-4"
      >
        {sceneNumber}
      </motion.p>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight"
      >
        {title}
      </motion.h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.5 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-muted text-xs md:text-sm tracking-[0.3em] uppercase mt-4"
        >
          {subtitle}
        </motion.p>
      )}

      {/* Horizontal rules */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-24 md:w-40 h-px bg-linear-to-r from-transparent via-purple/30 to-transparent mt-8"
      />
    </div>
  );
}
