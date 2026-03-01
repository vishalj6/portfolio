"use client";

import { useInView } from "react-intersection-observer";

const stats = [
  { value: "1500+", label: "Concurrent Users" },
  { value: "60%", label: "API Polling Cut" },
  { value: "45%", label: "Latency Reduced" },
  { value: "70%", label: "Faster Deploys" },
];

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" ref={ref} className="border-t border-[#1F1F1F] py-24 px-6 md:px-16 bg-[#0F0F0F]">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="flex items-baseline gap-6 mb-16">
          <span className="text-[#F5FF82]/50 text-xs font-mono tracking-widest anim-fade-in">01</span>
          <span className="section-label anim-fade-in delay-100">About</span>
          <div className="section-line delay-200" />
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Bio */}
          <div
            className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <p className="text-[#D0D0D0] text-base md:text-lg font-medium leading-relaxed mb-4">
              I build things that scale — not just in code, but in reliability.
            </p>
            <p className="text-[#7A7A7A] text-base leading-relaxed mb-5">
              I'm a full-stack engineer focused on backend architecture — building
              systems that are fast, reliable, and built to last. Currently working
              at <span className="text-[#F2F2F0]">Glitchover</span>, where I architect
              real-time tournament infrastructure serving thousands of concurrent users.
            </p>
            <p className="text-[#7A7A7A] text-base leading-relaxed">
              My approach: lean code, clean abstractions, and an obsession with
              performance. Whether it's squeezing latency out of a MongoDB aggregation
              pipeline or resolving race conditions in a payment system, I care deeply
              about getting the details right.
            </p>
          </div>

          {/* Stats */}
          <div
            className={`grid grid-cols-2 gap-px bg-[#1F1F1F] border border-[#1F1F1F] transition-all duration-700 delay-150 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`bg-[#0C0C0C] p-6 flex flex-col justify-between transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${200 + i * 80}ms` }}
              >
                <span className="text-[#F5FF82] text-3xl font-bold tracking-tight">{s.value}</span>
                <span className="section-label mt-2">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
