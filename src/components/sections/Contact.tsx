"use client";

import { motion } from "framer-motion";
import { socials, email } from "@/data/socials";

export default function Contact() {
  return (
    <section id="contact" className="border-t-4 border-border-main py-24 px-5 sm:px-8 md:px-16 bg-surface">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="flex items-center gap-4 mb-14">
          <span className="section-num">05</span>
          <h2 className="font-heading text-text-main text-4xl md:text-5xl tracking-wider uppercase">Contact</h2>
          <div className="flex-1 h-1 bg-text-main dark:bg-accent ml-2" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          {/* CTA block — uses brutal-card which auto-updates in dark */}
          <div className="brutal-card p-0 overflow-hidden max-w-2xl">

            {/* Yellow header stripe */}
            <div className="bg-accent px-8 py-5" style={{ borderBottom: "3px solid #111" }}>
              <p className="font-heading text-black text-3xl md:text-4xl tracking-wider uppercase leading-tight">
                Let&#39;s build something<br />great together.
              </p>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-8 flex flex-col gap-7">
              <p className="text-text-muted text-base leading-relaxed font-medium">
                Open to interesting projects, roles, and conversations. Drop me a
                line and I'll get back to you.
              </p>

              {/* Email CTA */}
              <a href={`mailto:${email}`} className="group block">
                <div className="brutal-btn text-base md:text-lg w-full justify-between py-4 px-6">
                  <span className="font-heading text-black text-sm sm:text-xl tracking-wider">{email}</span>
                  <svg
                    width="20" height="20" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round"
                    className="group-hover:translate-x-1 transition-transform duration-150"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </a>

              {/* Social links */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t-2 border-border-main">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brutal-btn-outline py-2 text-xs gap-2"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d={s.icon} />
                    </svg>
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
