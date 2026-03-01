"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "DSA", href: "#dsa" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
    const sections = navLinks.map((l) =>
      document.querySelector(l.href) as HTMLElement | null
    );
    const scrollPos = window.scrollY + 120;
    for (let i = sections.length - 1; i >= 0; i--) {
      const s = sections[i];
      if (s && s.offsetTop <= scrollPos) { setActive(navLinks[i].href); return; }
    }
    setActive("");
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#1a1a1a] border-b-4 border-[#FFE600]"
            : "bg-[#1a1a1a]/95 border-b-4 border-[#FFE600]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="font-heading text-2xl text-[#FFE600] tracking-wider hover:text-white transition-colors duration-200 cursor-pointer"
            >
              VJ<span className="text-[#E8002D]">!</span>
            </button>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`relative font-heading text-sm uppercase tracking-widest px-3 py-1.5 cursor-pointer transition-all duration-200 ${
                    active === link.href
                      ? "bg-[#FFE600] text-[#1a1a1a] border-2 border-[#1a1a1a]"
                      : "text-white hover:text-[#FFE600]"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Mobile Burger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="Menu"
            >
              <span className={`block w-6 h-0.5 bg-[#FFE600] transition-all duration-200 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 bg-[#FFE600] transition-all duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-[#FFE600] transition-all duration-200 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-14 left-0 right-0 z-40 bg-[#1a1a1a] border-b-4 border-[#FFE600]"
          >
            <div className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`font-heading text-lg uppercase tracking-widest py-2 text-left px-3 cursor-pointer transition-all duration-200 ${
                    active === link.href
                      ? "bg-[#FFE600] text-[#1a1a1a]"
                      : "text-white hover:text-[#FFE600]"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
