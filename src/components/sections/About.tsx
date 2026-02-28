"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const stats = [
  { label: "Concurrent Users", value: 1500, suffix: "+", icon: "⚡" },
  { label: "Polling Load Cut", value: 60, suffix: "%", icon: "📡" },
  { label: "Latency Reduced", value: 45, suffix: "%", icon: "🎯" },
  { label: "Deploy Speedup", value: 70, suffix: "%", icon: "🚀" },
];

const paragraphs = [
  {
    text: `I'm a Full Stack Engineer with over a year of hands-on experience building systems that don't just work — they scale. My journey started with curiosity about how things break under pressure, and it led me to architecting backend systems that handle thousands of concurrent connections.`,
    delay: 0.2,
  },
  {
    text: `I built a real-time tournament system handling 1500+ concurrent users with sub-200ms latency. When REST polling was burning through resources, I replaced it with WebSocket-driven event architecture — cutting polling load by 60%.`,
    delay: 0.4,
  },
  {
    text: `I've solved race conditions in payment systems using atomic transactions and idempotent webhook handling. I've architected payment microservices integrating Razorpay, Stripe, and Cashfree — handling real money in production with zero tolerance for errors.`,
    delay: 0.6,
  },
];

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-28 md:py-36 px-4 scene-transition"
    >
      <div className="max-w-5xl mx-auto">
        {/* Cinematic opening quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="mb-20 md:mb-28"
        >
          <div className="cinematic-quote max-w-3xl mx-auto md:mx-0">
            <p className="text-xl md:text-2xl text-foreground/70 leading-relaxed font-light">
              Every line of code I write is a step toward building something that
              outlasts me.
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-16 items-start">
          {/* Narrative — left column */}
          <div className="lg:col-span-3 space-y-8">
            {paragraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: para.delay,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="text-muted leading-[1.9] text-sm md:text-base"
              >
                {para.text}
              </motion.p>
            ))}

            {/* DSA callout in cinematic style */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 pl-4 border-l border-purple/20"
            >
              <p className="text-muted text-sm leading-relaxed">
                Beyond engineering, I&apos;m deeply invested in algorithmic thinking — with{" "}
                <span className="text-cyan font-medium">400+ LeetCode problems</span>{" "}
                solved across trees, graphs, and dynamic programming.
              </p>
            </motion.div>
          </div>

          {/* Stats — right column, mission data style */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-4"
            >
              <span className="text-[10px] font-mono text-cyan/30 tracking-[0.4em] uppercase">
                Mission Data
              </span>
            </motion.div>

            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.6 + i * 0.15,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="relative p-4 border border-card-border bg-card/30 backdrop-blur-sm
                            hover:border-cyan/20 transition-all duration-500 group overflow-hidden"
                >
                  {/* Corner accent */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan/20 group-hover:border-cyan/40 transition-colors" />

                  {/* Scanning line effect */}
                  <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-cyan/10 to-transparent group-hover:via-cyan/30 transition-all" />

                  <div className="text-lg mb-0.5">{stat.icon}</div>
                  <div className="text-2xl md:text-3xl font-bold text-cyan text-glow-cyan mb-1 font-mono">
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                      duration={2000}
                    />
                  </div>
                  <p className="text-muted/60 text-[10px] uppercase tracking-wider font-mono">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
