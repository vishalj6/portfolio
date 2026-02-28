"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Origin", href: "#about", scene: "II" },
  { label: "Arsenal", href: "#skills", scene: "III" },
  { label: "Missions", href: "#projects", scene: "IV" },
  { label: "Journey", href: "#experience", scene: "V" },
  { label: "Training", href: "#dsa", scene: "VI" },
  { label: "Signal", href: "#contact", scene: "VII" },
];

export default function Navbar() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);

    const sections = navLinks.map((link) =>
      document.querySelector(link.href) as HTMLElement | null
    );

    const scrollPos = window.scrollY + 120;
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (section && section.offsetTop <= scrollPos) {
        setActive(navLinks[i].href);
        return;
      }
    }
    setActive("");
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToSection = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 7.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-background/70 backdrop-blur-xl border-b border-card-border/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo — monogram */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="relative group cursor-pointer"
            >
              <div className="w-8 h-8 border border-cyan/30 flex items-center justify-center group-hover:border-cyan/60 transition-colors duration-500">
                <span className="text-xs font-bold text-cyan font-mono">VJ</span>
              </div>
            </button>

            {/* Desktop nav — cinematic HUD style */}
            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={`relative px-3 py-2 text-xs font-mono uppercase tracking-wider transition-all duration-500 cursor-pointer ${
                    active === link.href
                      ? "text-cyan"
                      : "text-muted/60 hover:text-foreground/80"
                  }`}
                >
                  <span className="text-[9px] text-cyan/30 mr-1">{link.scene}</span>
                  {link.label}
                  {active === link.href && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-1 right-1 h-px bg-cyan/50"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Mobile hamburger — minimal */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="w-5 h-px bg-foreground/60 block"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-5 h-px bg-foreground/60 block"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="w-5 h-px bg-foreground/60 block"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu — cinematic fullscreen */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-60 md:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setMobileOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
              className="absolute right-0 top-0 h-full w-72 bg-background/95 backdrop-blur-xl border-l border-card-border/50 p-6 pt-20"
            >
              {/* Scene label */}
              <p className="text-[9px] font-mono text-cyan/30 tracking-[0.5em] uppercase mb-6">
                Navigation
              </p>

              <div className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => scrollToSection(link.href)}
                    className={`text-left px-4 py-3 text-sm font-mono transition-all duration-300 cursor-pointer flex items-center gap-3 ${
                      active === link.href
                        ? "text-cyan border-l-2 border-cyan/50 bg-cyan/5"
                        : "text-muted/60 hover:text-foreground border-l border-card-border/30 hover:border-card-border"
                    }`}
                  >
                    <span className="text-[9px] text-cyan/30">{link.scene}</span>
                    {link.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
