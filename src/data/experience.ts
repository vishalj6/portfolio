export interface Experience {
  role: string;
  company: string;
  period: string;
  type: string;
  achievements: string[];
}

export const experiences: Experience[] = [
  {
    role: "Full Stack Developer",
    company: "Glitchover",
    period: "2024 – Present",
    type: "Full-time",
    achievements: [
      "Architected a real-time tournament system supporting 1500+ concurrent users with sub-200ms latency using WebSockets",
      "Reduced API polling load by 60% by migrating from REST polling to WebSocket-based event-driven architecture",
      "Optimized MongoDB performance with strategic indexing and aggregation pipelines, achieving 45% latency reduction",
      "Resolved critical race conditions in payment systems using atomic transactions and idempotent webhook handling",
      "Designed and integrated payment microservices with Razorpay, Stripe, and Cashfree gateways",
      "Built and maintained CI/CD pipelines reducing deployment time by 70%",
      "Implemented OAuth 2.0 and JWT-based authentication systems with Passport.js",
      "Developed RESTful APIs following clean architecture patterns with comprehensive error handling",
    ],
  },
];
