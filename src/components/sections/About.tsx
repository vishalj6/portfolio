"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const stats = [
  { label: "Concurrent Users", value: "1500+", color: "#E8002D" },
  { label: "Polling Load Cut", value: "60%", color: "#0052CC" },
  { label: "Latency Reduced", value: "45%", color: "#00B050" },
  { label: "Deploy Speedup", value: "70%", color: "#E8002D" },
];

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-0 border-b-4 border-[#1a1a1a]"
      style={{ background: "#fff" }}
    >
      {/* Section header panel */}
      <div className="bg-[#1a1a1a] border-b-4 border-[#1a1a1a] px-6 py-3 flex items-center gap-4">
        <span className="font-heading text-[#FFE600] text-3xl uppercase tracking-wider">Chapter II</span>
        <span className="font-heading text-white text-lg uppercase tracking-widest">— About Me</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* Left — narration panels */}
          <div className="space-y-6">
            {/* Speech bubble intro */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="speech-bubble"
            >
              <p className="font-heading text-xl md:text-2xl text-[#1a1a1a] leading-snug">
                &ldquo;I don&apos;t just write code — I build systems that scale under pressure.&rdquo;
              </p>
            </motion.div>

            {[
              "I&apos;m a Full Stack Engineer with over a year of hands-on experience. I&apos;ve architected backend systems that handle thousands of concurrent connections.",
              "I built a real-time tournament system handling 1500+ concurrent users with sub-200ms latency. Replaced REST polling with WebSocket-driven event architecture — cutting polling load by 60%.",
              "Solved race conditions in payment systems using atomic transactions. Architected payment microservices integrating Razorpay, Stripe, and Cashfree — handling real money in production with zero tolerance for errors.",
            ].map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 * (i + 1) }}
                className="comic-panel p-4"
              >
                <p
                  className="font-comic text-[#1a1a1a] text-sm md:text-base leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              </motion.div>
            ))}

            {/* DSA callout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="comic-panel-yellow p-4"
            >
              <p className="font-comic text-[#1a1a1a] text-sm">
                <span className="font-heading text-[#E8002D] text-base">BONUS SKILL!</span>{" "}
                Beyond engineering, I&apos;m invested in algorithmic thinking — with{" "}
                <strong>400+ LeetCode problems</strong> solved across trees, graphs, and DP.
              </p>
            </motion.div>
          </div>

          {/* Right — stats panels */}
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-4"
            >
              <div className="bg-[#1a1a1a] inline-block px-4 py-1">
                <span className="font-heading text-[#FFE600] text-lg uppercase tracking-widest">
                  Key Stats
                </span>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="comic-panel p-4 text-center"
                >
                  <div
                    className="font-heading text-4xl mb-1"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </div>
                  <div className="font-comic text-[11px] text-[#555] uppercase tracking-wider leading-tight">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Thought bubble extra */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-6 thought-bubble text-center"
            >
              <p className="font-comic text-[#555] text-sm italic">
                &ldquo;Every system I build is battle-tested under real-world load.&rdquo;
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
