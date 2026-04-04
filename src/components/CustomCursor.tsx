"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const dotX = useSpring(mouseX, { stiffness: 600, damping: 30 });
  const dotY = useSpring(mouseY, { stiffness: 600, damping: 30 });

  const ringX = useSpring(mouseX, { stiffness: 180, damping: 22 });
  const ringY = useSpring(mouseY, { stiffness: 180, damping: 22 });

  const ringScale = useMotionValue(1);
  const ringOpacity = useMotionValue(0.5);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select")) {
        ringScale.set(1.6);
        ringOpacity.set(0.85);
      }
    };

    const onLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select")) {
        ringScale.set(1);
        ringOpacity.set(0.5);
      }
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
    };
  }, [mouseX, mouseY, ringScale, ringOpacity]);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          scale: ringScale,
          opacity: ringOpacity,
          translateX: "-50%",
          translateY: "-50%",
          position: "fixed",
          top: 0,
          left: 0,
          width: 28,
          height: 28,
          borderRadius: "50%",
          border: "1.5px solid var(--theme-text-muted)",
          pointerEvents: "none",
          zIndex: 9999,
          transition: "opacity 0.2s ease",
        }}
      />
      {/* Inner dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          position: "fixed",
          top: 0,
          left: 0,
          width: 7,
          height: 7,
          borderRadius: "50%",
          backgroundColor: "var(--theme-text-main)",
          pointerEvents: "none",
          zIndex: 10000,
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}
