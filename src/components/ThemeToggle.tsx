"use client";

import { useEffect, useRef, useState } from "react";

type Theme = "light" | "dark";

// Must match :root and :root.dark --theme-bg in globals.css
const THEME_BG: Record<Theme, string> = {
  light: "#fafafa",
  dark: "#080808",
};

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
    const saved = (localStorage.getItem("theme") as Theme) ?? "light";
    setTheme(saved);
    applyTheme(saved);
  }, []);

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light";

    // Capture button center coordinates
    const rect = btnRef.current?.getBoundingClientRect();
    const cx = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const cy = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

    // Radius needed to cover the entire viewport from (cx, cy)
    const maxRadius = Math.ceil(
      Math.hypot(
        Math.max(cx, window.innerWidth - cx),
        Math.max(cy, window.innerHeight - cy)
      )
    );

    // Fallback if View Transitions API is not supported
    if (!document.startViewTransition) {
      setTheme(next);
      localStorage.setItem("theme", next);
      applyTheme(next);
      return;
    }

    // Execute transition
    const transition = document.startViewTransition(() => {
      // Import flushSync dynamically to avoid issues with standard imports in some environments
      // but since it's a click handler, we can just use set timeout or standard React state
      // Actually standard React state updates inside startViewTransition are batched but may not flush synchronously.
      // Next.js handles this well, but we also manually toggle the class on `document.documentElement`
      // which is synchronous! The only React state is `theme` for the icon.
      setTheme(next);
      localStorage.setItem("theme", next);
      applyTheme(next);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${cx}px ${cy}px)`,
            `circle(${maxRadius}px at ${cx}px ${cy}px)`
          ]
        },
        {
          duration: 600,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  }

  if (!mounted) return null;

  return (
    <button
      ref={btnRef}
      onClick={toggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      className="w-8 h-8 flex items-center justify-center rounded-md border border-border-main text-text-muted hover:text-text-main hover:border-text-muted transition-all duration-150"
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
