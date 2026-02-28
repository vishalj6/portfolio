"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import CinematicIntro from "@/components/CinematicIntro";
import FilmOverlay from "@/components/FilmOverlay";
import SceneIndicator from "@/components/SceneIndicator";
import Navbar from "@/components/Navbar";
import SceneHeading from "@/components/ui/SceneHeading";
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
      {/* ── Cinematic Intro (replaces loading screen) ── */}
      {loading && <CinematicIntro onComplete={handleLoadingComplete} />}

      {/* ── Film overlays — grain, vignette, letterbox, scanlines ── */}
      <FilmOverlay />

      {/* ── 3D particle background — desktop only ── */}
      {isDesktop && <ParticleField />}

      {/* ── Mobile gradient fallback ── */}
      {!isDesktop && (
        <div className="fixed inset-0 z-0 gradient-bg-mobile" />
      )}

      {/* ── Navbar — cinematic HUD ── */}
      <Navbar />

      {/* ── Scene Indicator — right side dots (desktop) ── */}
      {!loading && <SceneIndicator />}

      {/* ── Main content — the film ── */}
      <main className="relative z-10">
        {/* ACT I — The Protagonist */}
        <Hero />

        {/* Scene Transition → ACT II */}
        <SceneHeading
          sceneNumber="Scene II"
          title="The Origin Story"
          subtitle="How it all began"
        />
        <About />

        {/* Scene Transition → ACT III */}
        <SceneHeading
          sceneNumber="Scene III"
          title="The Arsenal"
          subtitle="Weapons of choice"
        />
        <Skills />

        {/* Scene Transition → ACT IV */}
        <SceneHeading
          sceneNumber="Scene IV"
          title="The Missions"
          subtitle="Classified operations"
        />
        <Projects />

        {/* Scene Transition → ACT V */}
        <SceneHeading
          sceneNumber="Scene V"
          title="The Journey"
          subtitle="A flashback sequence"
        />
        <Experience />

        {/* Scene Transition → ACT VI */}
        <SceneHeading
          sceneNumber="Scene VI"
          title="The Training"
          subtitle="A montage"
        />
        <DSA />

        {/* Scene Transition → ACT VII */}
        <SceneHeading
          sceneNumber="Scene VII"
          title="The Signal"
          subtitle="Transmission open"
        />
        <Contact />
      </main>
    </>
  );
}
