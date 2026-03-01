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
      "Led a team of developers in building enterprise-level applications",
      "Architected and implemented microservices using Node.js and Express.js",
      "Integrated Razorpay, Stripe, and Cashfree payment gateways with 99.9% uptime",
      "Established CI/CD pipelines reducing deployment time by 70%",
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
      "Built secure authentication system with JWT and OTP verification",
      "Implemented role-based access control for multiple user types",
      "Developed real-time notification system using WebSockets",
      "Contributed to frontend development using React and TypeScript",
      "Collaborated on code reviews following clean architecture best practices",
    ],
    current: false,
  },
];
