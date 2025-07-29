import {
  Atom,
  Code,
  Code2,
  Coffee,
  CreditCard,
  Database,
  DatabaseZap,
  FileCode2,
  GitBranch,
  GitPullRequest,
  Layers,
  Network,
  Server,
  CircleDashed,
  CircleDot
} from "lucide-react"
import AnimatedSection from "./AnimatedSection"

const techCategories = [
  {
    category: "Frontend",
    technologies: ["JavaScript", "React", "Next.js", "TypeScript", "Redux Toolkit"],
    color: "from-blue-400 to-cyan-400",
  },
  {
    category: "Backend",
    technologies: ["Node.js", "Express.js", "ASP.NET Core"],
    color: "from-green-400 to-emerald-400",
  },
  {
    category: "Database",
    technologies: ["MongoDB", "MySQL", "SQL Server"],
    color: "from-purple-400 to-pink-400",
  },
  {
    category: "Others",
    technologies: ["Python", "Java", "C", "C++", "Git", "Bitbucket", "Payment Gateways"],
    color: "from-orange-400 to-red-400",
  },
]

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "JavaScript": FileCode2,
  "React": Atom,
  "Next.js": CircleDot,
  "TypeScript": Code,
  "Redux Toolkit": Layers,

  "Node.js": Server,
  "Express.js": Network,
  "ASP.NET Core": CircleDashed,

  "MongoDB": Database,
  "MySQL": DatabaseZap,
  "SQL Server": Database,

  "Python": Code2,
  "Java": Coffee,
  "C": Code2,
  "C++": Code2,
  "Git": GitBranch,
  "Bitbucket": GitPullRequest,
  "Payment Gateways": CreditCard,
}


export default function TechStack() {
  return (
    <div className="mb-16">
      <AnimatedSection animation="fadeInUp">
        <h2 className="text-3xl font-semibold mb-8 text-center text-blue-400">Technical Skills</h2>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {techCategories.map((category, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${category.color} p-[1px] rounded-xl shadow-lg group transition-transform transform hover:scale-[1.02]`}
          >
            <div className="bg-gray-900 rounded-xl p-6 h-full w-full">
              <h3 className="text-xl font-semibold mb-4 text-white tracking-wide">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.technologies.map((tech, techIndex) => {
                  const IconComponent = iconMap[tech] || Code2
                  return (
                    <div
                      key={techIndex}
                      className="flex items-center gap-2 px-3 py-1 bg-gray-800 text-gray-200 text-sm rounded-full border border-gray-700 hover:bg-gray-700 hover:text-white transition-all duration-300 shadow-sm"
                    >
                      <IconComponent size={16} className="text-accent group-hover:scale-105 transition-transform" />
                      <span>{tech}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
