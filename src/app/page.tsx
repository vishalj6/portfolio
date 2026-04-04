"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import GitHubContributions from "@/components/sections/GitHubContributions";
import OpenSource from "@/components/sections/OpenSource";
import Blog from "@/components/sections/Blog";
import Quote from "@/components/sections/Quote";
import Contact from "@/components/sections/Contact";
function ViewCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Increment then fetch total
    fetch("/api/views", { method: "POST", body: JSON.stringify({ page: "/" }), headers: { "Content-Type": "application/json" } })
      .then(() => fetch("/api/views?page=/"))
      .then((r) => r.json())
      .then((data) => setCount(data.count))
      .catch(() => {});
  }, []);

  if (count === null) return null;

  return (
    <span className="font-mono text-text-muted text-xs flex items-center gap-1.5">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      {count.toLocaleString()} views
    </span>
  );
}

export default function Home() {
  return (
    <div className="max-w-[840px] mx-auto min-h-screen bg-bg border-x border-[var(--theme-border-main)]">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <GitHubContributions />
        <OpenSource />
        <Blog />
        <Quote />
        <Contact />
      </main>
      <footer className="border-t border-[var(--glass-border)] py-8 px-5 sm:px-8 bg-bg">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-sans font-semibold text-text-main text-sm">Vishal Jadeja</span>
          <div className="flex items-center gap-4">
            <ViewCounter />
            <span className="font-mono text-text-muted text-xs">
              © {new Date().getFullYear()} · Built with Next.js + TypeScript
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
