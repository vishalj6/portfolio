"use client";

import React from "react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const ICONS: Record<Theme, React.ReactElement> = {
  light: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
  ),
  dark: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
};

const LABELS: Record<Theme, string> = {
  light: "Light",
  dark: "Dark"
};

const OPTIONS: Theme[] = ["light", "dark"];

function applyTheme(theme: Theme) {
  const isDark = theme === "dark";
  document.documentElement.classList.toggle("dark", isDark);
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = (localStorage.getItem("theme") as Theme) ?? "light";
    setTheme(saved);
    applyTheme(saved);
  }, []);

  function handleSelect(t: Theme) {
    setTheme(t);
    localStorage.setItem("theme", t);
    applyTheme(t);
  }

  if (!mounted) return null;

  return (
    <div className="flex items-center border-2 border-black dark:border-[#2E2E2E] shadow-[2px_2px_0_#111] dark:shadow-[2px_2px_0_#FFE600]">
      {OPTIONS.map((opt) => {
        const active = theme === opt;
        return (
          <button
            key={opt}
            onClick={() => handleSelect(opt)}
            aria-label={`Switch to ${LABELS[opt]} theme`}
            title={LABELS[opt]}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 font-mono text-[10px] font-bold tracking-widest uppercase transition-colors duration-100 border-r-2 border-black dark:border-[#2E2E2E] last:border-r-0 ${active
              ? "bg-[#FFE600] text-black"
              : "bg-white dark:bg-[#1C1C1C] text-black dark:text-[#A0A09A] hover:bg-[#FFE600]/40 dark:hover:bg-[#FFE600]/15 dark:hover:text-[#E8E6DC]"
              }`}
          >
            {ICONS[opt]}
            <span className="hidden sm:inline">{LABELS[opt]}</span>
          </button>
        );
      })}
    </div>
  );
}
