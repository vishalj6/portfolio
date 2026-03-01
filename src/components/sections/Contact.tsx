"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { socials, email } from "@/data/socials";

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section
      id="contact"
      ref={ref}
      className="border-b-4 border-[#1a1a1a]"
      style={{ background: "#E8002D" }}
    >
      {/* Header */}
      <div className="bg-[#1a1a1a] border-b-4 border-[#1a1a1a] px-6 py-3 flex items-center gap-4">
        <span className="font-heading text-[#FFE600] text-3xl uppercase tracking-wider">Chapter VII</span>
        <span className="font-heading text-white text-lg uppercase tracking-widest">— Get In Touch</span>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        {/* Big action word */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
          animate={inView ? { opacity: 1, scale: 1, rotate: -3 } : {}}
          transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
          className="mb-8"
        >
          <span
            className="font-heading inline-block text-white uppercase"
            style={{
              fontSize: "clamp(3.5rem, 12vw, 7rem)",
              WebkitTextStroke: "3px #1a1a1a",
              paintOrder: "stroke fill",
              textShadow: "6px 6px 0 rgba(0,0,0,0.25)",
              letterSpacing: "0.05em",
            }}
          >
            Let&apos;s Work!
          </span>
        </motion.div>

        {/* Speech bubble */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10 inline-block"
        >
          <div className="bg-white border-[3px] border-[#1a1a1a] rounded-2xl px-6 py-4 shadow-[4px_4px_0_#1a1a1a]">
            <p className="font-comic text-[#1a1a1a] text-sm md:text-base">
              I&apos;m always open to discussing new projects, backend architecture challenges,
              or opportunities to build something impactful together.
            </p>
          </div>
        </motion.div>

        {/* Email CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mb-10"
        >
          <a
            href={`mailto:${email}`}
            className="inline-block font-heading text-2xl uppercase tracking-widest bg-[#FFE600] text-[#1a1a1a] px-8 py-3 border-4 border-[#1a1a1a] shadow-[6px_6px_0_#1a1a1a] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_#1a1a1a] transition-all duration-150"
          >
            Send a Message →
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center justify-center gap-3 flex-wrap"
        >
          {socials.map((social, i) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.6 + i * 0.1 }}
              className="font-heading text-sm uppercase tracking-widest bg-[#1a1a1a] text-[#FFE600] px-4 py-2 border-2 border-[#1a1a1a] shadow-[3px_3px_0_#555] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#555] transition-all duration-150"
              aria-label={social.name}
            >
              {social.name}
            </motion.a>
          ))}
        </motion.div>

        {/* Footer stamp */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-block border-4 border-white/40 px-6 py-2 rotate-[-2deg]">
            <span className="font-heading text-white/60 text-sm uppercase tracking-widest">
              Vishal Jadeja · Full Stack Dev · 2025
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
