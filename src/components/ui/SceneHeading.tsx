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
      className="relative flex flex-col items-center justify-center min-h-[20vh] md:min-h-[25vh] py-16 px-4 text-center"
    >
      {/* Ambient glow behind heading — like a torch halo on a castle wall */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(212,180,92,0.04) 0%, transparent 70%)' }}
      />
      {/* Top ornamental divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-24 md:w-40 h-px bg-linear-to-r from-transparent via-gold/40 to-transparent mb-6"
      />

      {/* Sword ornament */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 0.4, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-gold/30 text-xl mb-4"
      >
        ⚔
      </motion.div>

      {/* Chapter number */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.5 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-xs md:text-sm font-heading text-gold/50 tracking-[0.5em] uppercase mb-4"
      >
        {sceneNumber}
      </motion.p>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-3xl sm:text-4xl md:text-6xl font-heading font-bold tracking-wider text-foreground"
      >
        {title}
      </motion.h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.5 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-muted text-xs md:text-sm tracking-[0.3em] uppercase mt-4 italic"
        >
          {subtitle}
        </motion.p>
      )}

      {/* Bottom ornamental divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-24 md:w-40 h-px bg-linear-to-r from-transparent via-crimson/30 to-transparent mt-6"
      />
    </div>
  );
}
