"use client";

import { motion } from "framer-motion";
import MotionWrapper from "@/components/ui/MotionWrapper";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { fadeUp, staggerContainer } from "@/lib/animations";

const stats = [
  { label: "Concurrent Users", value: 1500, suffix: "+" },
  { label: "Polling Load Reduced", value: 60, suffix: "%" },
  { label: "Latency Reduction", value: 45, suffix: "%" },
  { label: "Faster Deployments", value: 70, suffix: "%" },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 px-4">
      {/* Section accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-cyan/20 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <MotionWrapper className="mb-16">
          <p className="text-cyan text-sm tracking-[0.3em] uppercase mb-3">
            01. About
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">
            The Engineer&apos;s Story
          </h2>
        </MotionWrapper>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Narrative */}
          <div className="lg:col-span-3 space-y-5">
            <MotionWrapper delay={0.1}>
              <p className="text-muted leading-relaxed">
                I&apos;m a Full Stack Engineer with over a year of hands-on experience
                building systems that don&apos;t just work — they{" "}
                <span className="text-foreground font-medium">scale</span>. My
                journey started with curiosity about how things break under
                pressure, and it led me to architecting backend systems that
                handle thousands of concurrent connections.
              </p>
            </MotionWrapper>

            <MotionWrapper delay={0.2}>
              <p className="text-muted leading-relaxed">
                I built a{" "}
                <span className="text-cyan">real-time tournament system</span>{" "}
                handling{" "}
                <span className="text-foreground font-medium">
                  1500+ concurrent users
                </span>{" "}
                with sub-200ms latency. When REST polling was burning through
                resources, I replaced it with WebSocket-driven event
                architecture —{" "}
                <span className="text-foreground font-medium">
                  cutting polling load by 60%
                </span>
                . When MongoDB queries were bottlenecking, I implemented
                strategic indexing and aggregation pipelines to achieve a{" "}
                <span className="text-foreground font-medium">
                  45% latency reduction
                </span>
                .
              </p>
            </MotionWrapper>

            <MotionWrapper delay={0.3}>
              <p className="text-muted leading-relaxed">
                I&apos;ve solved race conditions in payment systems using atomic
                transactions and idempotent webhook handling. I&apos;ve architected{" "}
                <span className="text-cyan">payment microservices</span>{" "}
                integrating Razorpay, Stripe, and Cashfree — handling real money
                in production with zero tolerance for errors. I&apos;ve built CI/CD
                pipelines that reduced deployment time by{" "}
                <span className="text-foreground font-medium">70%</span>.
              </p>
            </MotionWrapper>

            <MotionWrapper delay={0.4}>
              <p className="text-muted leading-relaxed">
                Beyond engineering, I&apos;m deeply invested in algorithmic
                thinking — with{" "}
                <span className="text-cyan font-medium">
                  400+ LeetCode problems
                </span>{" "}
                solved, I bring structured problem-solving to every system I
                design. Every line of code I write is a step toward building
                something that outlasts me.
              </p>
            </MotionWrapper>
          </div>

          {/* Stats */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-2 grid grid-cols-2 gap-4"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="relative p-5 rounded-xl border border-card-border bg-card/50 backdrop-blur-sm
                          hover:border-cyan/30 transition-all duration-300 group"
              >
                <div className="text-3xl md:text-4xl font-bold text-cyan text-glow-cyan mb-2">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    duration={2000}
                  />
                </div>
                <p className="text-muted text-xs uppercase tracking-wider">
                  {stat.label}
                </p>
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-xl bg-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
