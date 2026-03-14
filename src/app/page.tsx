"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <footer className="border-t-4 border-black dark:border-white bg-black py-7 px-5 sm:px-8 md:px-16">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-heading text-[#FFE600] text-xl tracking-widest">VISHAL JADEJA</span>
          <span className="font-mono text-[#888] text-xs">
            © {new Date().getFullYear()} · Built with Next.js + TypeScript
          </span>
        </div>
      </footer>
    </>
  );
}
