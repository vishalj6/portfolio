"use client";

/**
 * HelmetVisor — Ser Duncan the Tall's perspective.
 *
 * Renders a fixed full-screen steel helmet frame with a visor-shaped opening.
 * Randomly blinks (eyelid animation) as if seen through a knight's great helm.
 *
 * Layout (% of viewport):
 *   Visor opening:  x=14vw, y=19vh, width=72vw, height=52vh
 *   Top eyelid:     y=19vh → 45vh  (grows downward from top edge)
 *   Bottom eyelid:  y=45vh → 71vh  (grows upward from bottom edge)
 */

import { useEffect, useRef } from "react";
import { useAnimate } from "framer-motion";

const VISOR = {
  // SVG viewBox 0–100 coords (maps to viewport via preserveAspectRatio="none")
  x: 14, y: 19, w: 72, h: 52,
  rx: 7, ry: 7,
  // CSS equivalents (vw / vh)
  cssX:     "14vw",
  cssY:     "19vh",
  cssW:     "72vw",
  cssH:     "52vh",
  cssMidY:  "45vh",   // 19 + 52/2
  cssBotY:  "71vh",   // 19 + 52  (bottom of opening)
  cssHalf:  "26vh",   // half height for each eyelid
  cssRxTop: "7vw 7vw 0 0 / 7vh 7vh 0 0",
  cssRxBot: "0 0 7vw 7vw / 0 0 7vh 7vh",
};

export default function HelmetVisor() {
  const [topRef, animateTop] = useAnimate();
  const [botRef, animateBot] = useAnimate();
  const scheduleRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const mounted = useRef(true);

  const blink = async (isDouble = false) => {
    if (!mounted.current) return;

    // Close eyelids
    await Promise.all([
      animateTop(topRef.current, { scaleY: 1 }, { duration: 0.11, ease: [0.4, 0, 1, 1] }),
      animateBot(botRef.current, { scaleY: 1 }, { duration: 0.11, ease: [0.4, 0, 1, 1] }),
    ]);

    // Hold closed
    await new Promise<void>((r) => setTimeout(r, 55));
    if (!mounted.current) return;

    // Open eyelids
    await Promise.all([
      animateTop(topRef.current, { scaleY: 0 }, { duration: 0.20, ease: [0, 0, 0.6, 1] }),
      animateBot(botRef.current, { scaleY: 0 }, { duration: 0.20, ease: [0, 0, 0.6, 1] }),
    ]);

    if (!mounted.current) return;

    if (!isDouble && Math.random() < 0.28) {
      // Double blink — quick second one after a short gap
      setTimeout(() => blink(true), 130);
    } else {
      scheduleNext();
    }
  };

  const scheduleNext = () => {
    // Irregular: 2.8s – 7.5s between blinks (realistic eye behaviour)
    const delay = 2800 + Math.random() * 4700;
    scheduleRef.current = setTimeout(() => blink(), delay);
  };

  useEffect(() => {
    mounted.current = true;
    // First blink after the page settles
    const init = setTimeout(() => blink(), 2400);
    return () => {
      mounted.current = false;
      clearTimeout(init);
      clearTimeout(scheduleRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ─── Inline styles ─────────────────────────────────────── */
  const frameStyle = {
    position: "fixed" as const,
    inset: 0,
    pointerEvents: "none" as const,
    zIndex: 95,   // above content (z-10), below grain (1000) and vignette (999)
  };

  const topLidStyle: React.CSSProperties = {
    position: "fixed",
    top:    VISOR.cssY,
    left:   VISOR.cssX,
    width:  VISOR.cssW,
    height: VISOR.cssHalf,
    background: "linear-gradient(to bottom, #0c0f13 55%, #12161c)",
    transformOrigin: "center top",
    borderRadius: VISOR.cssRxTop,
    transform: "scaleY(0)",
    pointerEvents: "none",
    zIndex: 96,
  };

  const botLidStyle: React.CSSProperties = {
    position: "fixed",
    top:    VISOR.cssMidY,
    left:   VISOR.cssX,
    width:  VISOR.cssW,
    height: VISOR.cssHalf,
    background: "linear-gradient(to top, #0c0f13 55%, #12161c)",
    transformOrigin: "center bottom",
    borderRadius: VISOR.cssRxBot,
    transform: "scaleY(0)",
    pointerEvents: "none",
    zIndex: 96,
  };

  /* ─── SVG visor coordinates ─────────────────────────────── */
  const { x, y, w, h, rx, ry } = VISOR;

  return (
    <>
      {/* ── Steel helmet frame ── */}
      <div style={frameStyle} aria-hidden="true">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Vertical steel gradient — lighter at chest-level, darker at crown */}
            <linearGradient id="hv-steel-v" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#0a0d11" />
              <stop offset="18%"  stopColor="#161a21" />
              <stop offset="50%"  stopColor="#131720" />
              <stop offset="82%"  stopColor="#161a21" />
              <stop offset="100%" stopColor="#0a0c0f" />
            </linearGradient>

            {/* Left/right edge: slightly lighter band for hammered-steel look */}
            <linearGradient id="hv-steel-h" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#0d1016" />
              <stop offset="8%"   stopColor="#1a1f28" />
              <stop offset="50%"  stopColor="#14181f" />
              <stop offset="92%"  stopColor="#1a1f28" />
              <stop offset="100%" stopColor="#0d1016" />
            </linearGradient>

            {/* Eye-opening mask — punch a hole through the steel */}
            <mask id="hv-visor-mask">
              <rect width="100%" height="100%" fill="white" />
              <rect
                x={`${x}%`} y={`${y}%`}
                width={`${w}%`} height={`${h}%`}
                rx={`${rx}%`} ry={`${ry}%`}
                fill="black"
              />
            </mask>

            {/* Subtle inner-edge glow (bloom) */}
            <filter id="hv-rim-glow" x="-5%" y="-5%" width="110%" height="110%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ── Main steel body (everything OUTSIDE the visor opening) ── */}
          <rect
            width="100%" height="100%"
            fill="url(#hv-steel-v)"
            mask="url(#hv-visor-mask)"
          />
          {/* Horizontal gradient layer for lateral shading — blended on top */}
          <rect
            width="100%" height="100%"
            fill="url(#hv-steel-h)"
            mask="url(#hv-visor-mask)"
            opacity="0.55"
          />

          {/* ── Armor detail: horizontal plate seam lines (sides only) ── */}
          {([14, 26, 38, 52, 64, 76] as number[]).map((pct) => (
            <g key={pct}>
              {/* Left side */}
              <line x1="0"     y1={`${pct}%`} x2={`${x - 1}%`} y2={`${pct}%`}
                stroke="#222630" strokeWidth="0.45" strokeOpacity="0.7" />
              {/* Right side */}
              <line x1={`${x + w + 1}%`} y1={`${pct}%`} x2="100%" y2={`${pct}%`}
                stroke="#222630" strokeWidth="0.45" strokeOpacity="0.7" />
            </g>
          ))}

          {/* ── Top forehead panel seams ── */}
          {([5, 11, 17] as number[]).map((pct) => (
            <line key={pct}
              x1={`${x}%`} y1={`${pct}%`} x2={`${x + w}%`} y2={`${pct}%`}
              stroke="#202430" strokeWidth="0.35" strokeOpacity="0.5"
              mask="url(#hv-visor-mask)"
            />
          ))}

          {/* ── Nasal guard — vertical center bar above opening ── */}
          <rect
            x="49.3%" y="0" width="1.4%" height={`${y}%`}
            fill="#0c0f14" opacity="0.65"
          />
          {/* Nasal guard continuation below opening */}
          <rect
            x="49.3%" y={`${y + h}%`} width="1.4%" height={`${100 - y - h}%`}
            fill="#0c0f14" opacity="0.55"
          />

          {/* ── Cheek / chin panels — subtle angled piece ── */}
          {/* Left cheek line */}
          <line
            x1={`${x}%`} y1={`${y + h}%`}
            x2="0" y2="90%"
            stroke="#1c2028" strokeWidth="0.6" strokeOpacity="0.5"
          />
          {/* Right cheek line */}
          <line
            x1={`${x + w}%`} y1={`${y + h}%`}
            x2="100%" y2="90%"
            stroke="#1c2028" strokeWidth="0.6" strokeOpacity="0.5"
          />

          {/* ── Visor opening: metallic rim ── */}
          {/* Outer dark shadow */}
          <rect
            x={`${x}%`} y={`${y}%`}
            width={`${w}%`} height={`${h}%`}
            rx={`${rx}%`} ry={`${ry}%`}
            fill="none"
            stroke="#06080b" strokeWidth="1.8" strokeOpacity="0.9"
            filter="url(#hv-rim-glow)"
          />
          {/* Bright steel edge highlight */}
          <rect
            x={`${x}%`} y={`${y}%`}
            width={`${w}%`} height={`${h}%`}
            rx={`${rx}%`} ry={`${ry}%`}
            fill="none"
            stroke="#3a4252" strokeWidth="0.6" strokeOpacity="0.85"
          />
          {/* Top-inside catch-light — single bright line on upper rim */}
          <rect
            x={`${x + 2}%`} y={`${y + 0.2}%`}
            width={`${w - 4}%`} height="0.4%"
            rx="0.4%" ry="0.2%"
            fill="#4a5568" opacity="0.25"
          />

          {/* ── Visor slats across the opening ── */}
          {([27, 33, 39, 45, 51, 57, 63] as number[]).map((pct) => (
            <line key={pct}
              x1={`${x + 1}%`} y1={`${pct}%`} x2={`${x + w - 1}%`} y2={`${pct}%`}
              stroke="#08090c" strokeWidth="0.75" strokeOpacity="0.22"
            />
          ))}

          {/* ── Rivets at visor corners ── */}
          {([
            [x + 2,     y + 2    ],
            [x + w - 2, y + 2    ],
            [x + 2,     y + h - 2],
            [x + w - 2, y + h - 2],
            [x - 1,     y + h / 2],
            [x + w + 1, y + h / 2],
          ] as [number, number][]).map(([cx, cy], i) => (
            <circle key={i}
              cx={`${cx}%`} cy={`${cy}%`} r="0.7"
              fill="#232830" stroke="#3a404e" strokeWidth="0.25"
            />
          ))}
        </svg>
      </div>

      {/* ── Blink eyelids ── */}
      {/* These are separate from the SVG so Framer Motion refs work cleanly */}
      <div
        ref={topRef}
        style={topLidStyle}
        aria-hidden="true"
      />
      <div
        ref={botRef}
        style={botLidStyle}
        aria-hidden="true"
      />
    </>
  );
}
