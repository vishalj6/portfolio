"use client";

import { useInView } from "react-intersection-observer";
import { socials, email } from "@/data/socials";

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="contact" ref={ref} className="border-t border-[#1F1F1F] py-24 px-6 md:px-16 bg-[#0F0F0F]">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="flex items-baseline gap-6 mb-16">
          <span className="text-[#F5FF82]/50 text-xs font-mono tracking-widest">05</span>
          <span className="section-label">Contact</span>
          <div className="section-line" />
        </div>

        <div
          className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <p className="text-[#6B6B6B] text-base max-w-md mb-10 leading-relaxed">
            Open to interesting projects, roles, and conversations. Drop me a
            line and I'll get back to you.
          </p>

          {/* Email */}
          <a
            href={`mailto:${email}`}
            className="group inline-flex items-center gap-3 text-[#F2F2F0] text-2xl md:text-3xl font-semibold hover:text-[#F5FF82] transition-colors mb-12"
          >
            {email}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 duration-200"
            >
              <path d="M2 7h10M7 2l5 5-5 5" />
            </svg>
          </a>

          {/* Social links */}
          <div className="flex items-center gap-6 pt-6 border-t border-[#1F1F1F]">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#6B6B6B] hover:text-[#F5FF82] transition-colors group"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={s.icon} />
                </svg>
                <span className="group-hover:text-[#F5FF82] transition-colors">
                  {s.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
