import { Briefcase, CheckCircle } from "lucide-react";

interface Experience {
  title: string
  company: string
  period: string
  description: string
  achievements: string[]
  current: boolean
}

interface TimelineItemProps {
  experience: Experience
}

export default function TimelineItem({ experience }: TimelineItemProps) {
  return (
    <div className="relative flex items-start">
      <div
        className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center ${
          experience.current ? "bg-gradient-to-r from-blue-500 to-purple-600" : "bg-gray-700"
        } shadow-lg`}
      >
        <Briefcase size={24} className="text-white" />
      </div>
      <div className="ml-8 bg-gray-800 rounded-lg p-8 shadow-xl flex-1 hover:bg-gray-750 transition-colors duration-300">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-gray-400 text-sm bg-gray-700 px-3 py-1 rounded-full">{experience.period}</span>
          {experience.current && (
            <span className="px-3 py-1 bg-green-600 text-white text-xs rounded-full animate-pulse">
              Current Position
            </span>
          )}
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{experience.title}</h3>
        <h4 className="text-blue-400 text-lg mb-4">{experience.company}</h4>
        <p className="text-gray-300 mb-6 leading-relaxed">{experience.description}</p>

        <div>
          <h5 className="text-lg font-semibold text-white mb-4">Key Achievements:</h5>
          <ul className="space-y-3">
            {experience.achievements.map((achievement, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle size={16} className="text-green-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300">{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
