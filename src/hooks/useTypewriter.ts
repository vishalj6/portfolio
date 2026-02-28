"use client";

import { useState, useEffect, useCallback } from "react";

interface UseTypewriterOptions {
  strings: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delayBetween?: number;
  loop?: boolean;
}

export function useTypewriter({
  strings,
  typeSpeed = 80,
  deleteSpeed = 50,
  delayBetween = 2000,
  loop = true,
}: UseTypewriterOptions) {
  const [displayText, setDisplayText] = useState("");
  const [stringIndex, setStringIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const tick = useCallback(() => {
    const currentString = strings[stringIndex];

    if (isDeleting) {
      setDisplayText((prev) => currentString.substring(0, prev.length - 1));
    } else {
      setDisplayText((prev) => currentString.substring(0, prev.length + 1));
    }
  }, [isDeleting, stringIndex, strings]);

  useEffect(() => {
    if (isComplete) return;

    const currentString = strings[stringIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText === currentString) {
      // Finished typing current string
      if (stringIndex === strings.length - 1 && !loop) {
        setIsComplete(true);
        return;
      }
      timeout = setTimeout(() => setIsDeleting(true), delayBetween);
    } else if (isDeleting && displayText === "") {
      // Finished deleting
      setIsDeleting(false);
      setStringIndex((prev) => (prev + 1) % strings.length);
      timeout = setTimeout(tick, 500);
      return;
    } else {
      timeout = setTimeout(tick, isDeleting ? deleteSpeed : typeSpeed);
    }

    return () => clearTimeout(timeout);
  }, [
    displayText,
    isDeleting,
    stringIndex,
    strings,
    typeSpeed,
    deleteSpeed,
    delayBetween,
    loop,
    tick,
    isComplete,
  ]);

  return { displayText, isComplete, stringIndex };
}
