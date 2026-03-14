"use client";

import { useState, useEffect } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b-4 border-black dark:border-accent anim-fade-in ${scrolled
          ? "bg-bg/95 backdrop-blur-sm"
          : "bg-bg"
        }`}
    >
      <nav className="max-w-6xl mx-auto px-5 sm:px-8 md:px-16 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <a
          href="#"
          className="font-heading website-logo-text text-2xl tracking-wider bg-accent border-2 border-black px-3 py-0.5 shadow-[3px_3px_0_#111] hover:shadow-[1px_1px_0_#111] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100 shrink-0"
        >
          VJ
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1 flex-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="section-label px-3 py-2 hover:bg-[#FFE600] hover:text-black border-2 border-transparent hover:border-black dark:hover:border-black transition-all duration-100 block"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Theme toggle (desktop) */}
        <div className="hidden md:block shrink-0">
          <ThemeToggle />
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2 border-2 border-black dark:border-accent hover:bg-accent transition-colors duration-100"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-text-main transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block w-5 h-0.5 bg-text-main transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-text-main transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t-4 border-black dark:border-accent bg-surface px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="section-label py-3 px-2 hover:bg-accent hover:text-black border-b-2 border-border-main transition-colors duration-100 last:border-b-0"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t-2 border-border-main mt-1">
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
