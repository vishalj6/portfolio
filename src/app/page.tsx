"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import DSA from "@/components/sections/DSA";
import Contact from "@/components/sections/Contact";

// Dynamic import Three.js — no SSR, only loaded on desktop
const ParticleField = dynamic(
  () => import("@/components/three/ParticleField"),
  { ssr: false }
);

export default function Home() {
  const [loading, setLoading] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {/* Loading screen */}
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* 3D particle background — desktop only */}
      {isDesktop && <ParticleField />}

      {/* Mobile gradient fallback */}
      {!isDesktop && (
        <div className="fixed inset-0 z-0 gradient-bg-mobile" />
      )}

      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <DSA />
        <Contact />
      </main>
    </>
  );
}
