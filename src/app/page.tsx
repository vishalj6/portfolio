"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <footer className="border-t border-[#1F1F1F] py-8 px-6 md:px-16">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-[#6B6B6B] text-sm">
            © {new Date().getFullYear()} Vishal Jadeja
          </span>
          <span className="text-[#6B6B6B] text-sm font-mono text-xs">
            Built with Next.js + TypeScript
          </span>
        </div>
      </footer>
    </>
  );
}
