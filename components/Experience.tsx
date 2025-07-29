import TimelineItem from "@/components/TimelineItem"

const experiences = [
  {
    title: "Full-Time Developer",
    company: "Glitchover",
    period: "Feb 2025 – Present",
    description:
      "Leading development teams and architecting scalable solutions. Built microservices architecture, developed automation bots, integrated multiple payment gateways (Razorpay, Stripe, Cashfree), and implemented CI/CD pipelines for streamlined deployment processes.",
    achievements: [
      "Led a team of developers in building enterprise-level applications",
      "Architected and implemented microservices using Node.js and Express.js",
      "Integrated multiple payment gateways with 99.9% uptime",
      "Established CI/CD pipelines reducing deployment time by 70%",
      "Developed automation bots that improved operational efficiency by 40%",
    ],
    current: true,
  },
  {
    title: "Software Development Intern",
    company: "Glitchover",
    period: "Aug 2024 – Feb 2025",
    description:
      "Focused on building robust authentication systems and implementing role-based access control. Developed comprehensive notification systems and gained hands-on experience with modern web development practices.",
    achievements: [
      "Built secure authentication system with JWT and OTP verification",
      "Implemented role-based access control for multiple user types",
      "Developed real-time notification system using WebSocket",
      "Contributed to frontend development using React and TypeScript",
      "Collaborated with senior developers on code reviews and best practices",
    ],
    current: false,
  },
]

export default function Experience() {
  return (
    <section id="experience" className="min-h-screen py-20 bg-gray-800/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Professional Experience
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            My professional journey in software development, from intern to team lead, building scalable applications
            and leading development initiatives.
          </p>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-purple-500"></div>
            <div className="space-y-12">
              {experiences.map((experience, index) => (
                <TimelineItem key={index} experience={experience} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
