"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ReactNode } from "react";

interface TravelerCaptionProps {
  children: ReactNode;
  /** subtle=true removes the left border, smaller opacity — for interior (dark) sections */
  subtle?: boolean;
  delay?: number;
  className?: string;
  center?: boolean;
}

/**
 * Ser Duncan's voice — a traveler's field journal caption.
 * Used at the top of section bodies to anchor the outdoor/journey narrative.
 */
export default function TravelerCaption({
  children,
  subtle = false,
  delay = 0,
  className = "",
  center = false,
}: TravelerCaptionProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.4 });

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, x: subtle ? 0 : -18 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`${subtle ? "traveler-caption-subtle" : "traveler-caption"} ${center ? "mx-auto text-center" : ""} ${className}`}
    >
      {children}
    </motion.p>
  );
}
