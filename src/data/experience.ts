export interface Experience {
  role: string;
  company: string;
  period: string;
  type: string;
  description: string;
  achievements: string[];
  current: boolean;
}

export const experiences: Experience[] = [
  {
    role: "Software Developer",
    company: "Glitchover",
    period: "Feb 2025 - Present",
    type: "Full-time",
    description:
      "Leading development teams and architecting scalable solutions. Built microservices architecture, developed automation bots, integrated multiple payment gateways, and implemented CI/CD pipelines for streamlined deployment.",
    achievements: [
      "Architected a real-time event-driven tournament system serving 1,500+ concurrent users",
      "Eliminated polling bottlenecks by migrating to WebSocket-based architecture, cutting API load by 60% and achieving sub-200ms latency at peak traffic.",
      "Integrated Razorpay, Stripe, and Cashfree payment gateways with 99.9% uptime",
      "Resolved critical race conditions in payment confirmation workflows using atomic MongoDB transactions and idempotent webhook handling, preventing duplicate wallet credits and ensuring zero financial inconsistencies across 3 integrated payment providers (Razorpay, Stripe, Cashfree).",
      "Reduced average MongoDB query latency by 45% for high-frequency leaderboard reads by redesigning schemas, introducing compound indexes, and rewriting aggregation pipelines",
      "Designed and deployed 2 independent microservices (payment gateway, Discord bot) using the Factory Pattern, enabling integration of new payment providers with zero refactoring and cutting future integration effort by an estimated 60%",
      "Led migration of PWA from CRA (React 16) to Vite (React 19), reducing build times by 80% and improving cold-start performance — unblocking faster release cycles for the engineering team.",
      "Introduced Redis-based caching layer for high-read endpoints, reducing database load during peak traffic and improving p99 response times without schema changes",
      "Developed automation bots that improved operational efficiency by 40%",
    ],
    current: true,
  },
  {
    role: "Software Development Intern",
    company: "Glitchover",
    period: "Aug 2024 - Feb 2025",
    type: "Internship",
    description:
      "Focused on building robust authentication systems and implementing role-based access control. Developed real-time notification systems and gained hands-on experience with modern web development practices.",
    achievements: [
      "Built CI/CD pipelines on Bitbucket cutting deployment time by 70%",
      "established Jest-based unit and integration test suites across critical API paths, reducing production regressions",
      "Engineered authentication and authorization layer using Passport.js, JWT, and RBAC across 4 dashboards",
      "Added rate-limiting and input validation to neutralize abuse vectors and injection attacks.",
      "Developed real-time notification system using WebSockets",
      "Contributed to frontend development using React and TypeScript",
      "Collaborated on code reviews following clean architecture best practices",
    ],
    current: false,
  },
];
