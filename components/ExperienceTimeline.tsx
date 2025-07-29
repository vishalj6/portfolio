import { Briefcase, Calendar } from "lucide-react"

const experiences = [
  {
    title: "Full-Time Developer",
    company: "Glitchover",
    period: "Feb 2025 – Present",
    description: "Leading development teams and building scalable microservices architecture.",
    current: true,
  },
  {
    title: "Software Development Intern",
    company: "Glitchover",
    period: "Aug 2024 – Feb 2025",
    description: "Built authentication systems and implemented role-based access control.",
    current: false,
  },
]

export default function ExperienceTimeline() {
  return (
    <div>
      <h2 className="text-3xl font-semibold mb-8 text-center text-blue-400">Experience Timeline</h2>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-purple-500"></div>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="relative flex items-start">
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  exp.current ? "bg-blue-500" : "bg-gray-600"
                }`}
              >
                <Briefcase size={16} className="text-white" />
              </div>
              <div className="ml-6 bg-gray-800 rounded-lg p-6 shadow-xl flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={16} className="text-gray-400" />
                  <span className="text-gray-400 text-sm">{exp.period}</span>
                  {exp.current && (
                    <span className="px-2 py-1 bg-green-600 text-white text-xs rounded-full">Current</span>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-white mb-1">{exp.title}</h3>
                <h4 className="text-blue-400 mb-3">{exp.company}</h4>
                <p className="text-gray-300">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
