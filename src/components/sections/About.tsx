"use client";

import { motion } from "framer-motion";


export default function About() {
  return (
    <section id="about" className="bg-surface border-t-4 border-border-main py-24 px-5 sm:px-8 md:px-16">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="flex items-center gap-4 mb-14">
          <span className="section-num">01</span>
          <h2 className="font-heading text-text-main text-4xl md:text-5xl tracking-wider uppercase">About</h2>
          <div className="flex-1 h-1 bg-text-main dark:bg-accent ml-2" />
        </div>
        <div className="max-w-6xl">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >

            <p className="text-text-main text-2xl md:text-3xl font-bold leading-snug font-heading tracking-wide uppercase">
              I build scalable backend systems and real-time applications.
            </p>

            <p className="text-text-muted text-lg leading-relaxed">
              I'm a <strong className="text-text-main">Full-Stack Software Engineer</strong> focused on
              <strong className="text-text-main"> backend architecture, distributed systems, and real-time infrastructure</strong>.
              Currently working at
              <span className="font-bold text-text-main underline decoration-accent decoration-2 underline-offset-2 mx-1">
                Glitchover
              </span>,
              where I design and build production systems that power competitive gaming platforms.
            </p>

            <p className="text-text-muted text-lg leading-relaxed">
              I specialize in the <strong className="text-text-main">MERN stack (MongoDB, Express, React, Node.js)</strong> and
              building high-performance APIs, event-driven systems, and scalable backend services.
              One of the key systems I engineered supports
              <strong className="text-text-main"> 1,500+ concurrent users</strong> through
              <strong className="text-text-main"> WebSocket-based real-time architecture</strong>,
              significantly reducing server load and improving responsiveness.
            </p>

            <p className="text-text-muted text-lg leading-relaxed">
              I enjoy solving complex engineering problems — from optimizing database queries and
              eliminating race conditions to designing resilient backend systems. My work has helped
              <strong className="text-text-main"> reduce latency by 45%</strong>,
              <strong className="text-text-main"> cut API polling by 60%</strong>, and
              <strong className="text-text-main"> accelerate deployments by 70%</strong>
              through robust CI/CD pipelines and infrastructure improvements.
            </p>

            <p className="text-text-muted text-lg leading-relaxed">
              Outside of work, I spend time deep-diving into
              <strong className="text-text-main"> system design, distributed systems, and scalable architectures</strong>,
              continuously improving how large-scale software systems are built and operated.
            </p>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
