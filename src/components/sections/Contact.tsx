"use client";

import { motion } from "framer-motion";
import MotionWrapper from "@/components/ui/MotionWrapper";
import { socials, email } from "@/data/socials";
import { staggerContainer, fadeUp } from "@/lib/animations";

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32 px-4 bg-section/50">
      {/* Section accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-purple/20 to-transparent" />

      <div className="max-w-2xl mx-auto text-center">
        {/* Section heading */}
        <MotionWrapper className="mb-8">
          <p className="text-cyan text-sm tracking-[0.3em] uppercase mb-3">
            06. Contact
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let&apos;s Build Something
          </h2>
          <p className="text-muted leading-relaxed">
            I&apos;m always open to discussing new projects, backend architecture
            challenges, or opportunities to be part of something impactful.
          </p>
        </MotionWrapper>

        {/* Email CTA */}
        <MotionWrapper className="mb-12" delay={0.2}>
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-cyan/10 border border-cyan/30 text-cyan font-medium
                       hover:bg-cyan/20 hover:border-cyan/60 transition-all duration-300 glow-cyan"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            Say Hello
          </a>
        </MotionWrapper>

        {/* Social links */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-center justify-center gap-6"
        >
          {socials.map((social) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUp}
              whileHover={{
                scale: 1.15,
                y: -4,
              }}
              className="group relative p-3 rounded-xl border border-card-border bg-card/50 backdrop-blur-sm
                         hover:border-cyan/30 transition-colors duration-300"
              aria-label={social.name}
            >
              <svg
                className="w-5 h-5 text-muted group-hover:text-cyan transition-colors duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={social.icon} />
              </svg>
              {/* Tooltip */}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs bg-card border border-card-border text-foreground
                             opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {social.name}
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* Footer */}
        <MotionWrapper delay={0.4} className="mt-20 pt-8 border-t border-card-border">
          <p className="text-muted/60 text-xs tracking-wider">
            Designed & Built by{" "}
            <span className="text-cyan/70">Vishal Jadeja</span>
          </p>
        </MotionWrapper>
      </div>
    </section>
  );
}
