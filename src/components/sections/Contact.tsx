"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { socials, email } from "@/data/socials";

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-28 md:py-36 px-4 scene-transition"
    >
      <div className="max-w-2xl mx-auto text-center">
        {/* End credits style heading */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.5 }}
          className="mb-12"
        >
          <p className="text-muted text-sm leading-relaxed max-w-lg mx-auto">
            I&apos;m always open to discussing new projects, backend architecture
            challenges, or opportunities to be part of something impactful.
          </p>
        </motion.div>

        {/* Email CTA — cinematic button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <a
            href={`mailto:${email}`}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 text-sm font-mono tracking-wider uppercase
                       text-cyan border border-cyan/20 hover:border-cyan/50 hover:bg-cyan/5 transition-all duration-500"
          >
            {/* Corner accents */}
            <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan/50" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan/50" />

            <svg
              className="w-4 h-4"
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
            Transmit Signal
          </a>
        </motion.div>

        {/* Social links — minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center justify-center gap-5 mb-20"
        >
          {socials.map((social, i) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
              whileHover={{ y: -3 }}
              className="p-3 border border-card-border hover:border-cyan/30 text-muted hover:text-cyan
                         transition-all duration-300 group"
              aria-label={social.name}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={social.icon} />
              </svg>
            </motion.a>
          ))}
        </motion.div>

        {/* End credits — film style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="pt-8 border-t border-card-border/30"
        >
          <div className="space-y-3">
            <p className="text-[10px] font-mono text-muted/30 tracking-[0.5em] uppercase">
              End Credits
            </p>
            <div className="w-12 h-px bg-cyan/10 mx-auto" />
            <p className="text-muted/30 text-xs font-mono">
              Directed, Written & Engineered by
            </p>
            <p className="text-foreground/50 text-sm font-bold tracking-wider">
              VISHAL JADEJA
            </p>
            <div className="w-12 h-px bg-purple/10 mx-auto mt-4" />
            <p className="text-muted/20 text-[10px] font-mono tracking-wider mt-4">
              © {new Date().getFullYear()} — All Rights Reserved
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
