"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Outer ring: slow, heavy spring → visible trailing delay
  const ringSpring = { damping: 28, stiffness: 120, mass: 0.5 };
  const cursorX = useSpring(mouseX, ringSpring);
  const cursorY = useSpring(mouseY, ringSpring);

  // Inner dot: slightly quicker spring, still smooth
  const dotSpring = { damping: 22, stiffness: 280, mass: 0.25 };
  const dotX = useSpring(mouseX, dotSpring);
  const dotY = useSpring(mouseY, dotSpring);

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (!e.target) return;
      const target = e.target as HTMLElement;
      // Check if we hover over clickable elements
      const isClickable =
        window.getComputedStyle(target).cursor === "pointer" ||
        target.closest("a") !== null ||
        target.closest("button") !== null;

      setIsHovering(isClickable);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full mix-blend-difference hidden md:block"
        style={{
          width: 30,
          height: 30,
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          border: "1.5px solid rgba(255, 255, 255, 1)",
          backgroundColor: isHovering ? "rgba(255, 255, 255, 1)" : "transparent",
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100000] rounded-full mix-blend-difference hidden md:block"
        style={{
          width: 6,
          height: 6,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: "rgba(255, 255, 255, 1)",
        }}
        animate={{
          opacity: isHovering ? 0 : 1,
        }}
      />
    </>
  );
}
