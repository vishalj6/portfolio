import Image from "next/image"
import Link from "next/link"
import { Github, ExternalLink } from "lucide-react"

interface Project {
  title: string
  description: string
  techStack: string[]
  githubUrl?: string
  liveUrl?: string
  image: string
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl hover:shadow-md hover:shadow-blue-500/20 transition-all duration-500 transform hover:scale-101 group">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent group-hover:from-gray-900/60 transition-all duration-500"></div>
        <div className="absolute inset-0 bg-blue-500/0 transition-all duration-500"></div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-blue-300 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-gray-400 mb-4 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-700 text-blue-400 text-sm rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex items-center px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 hover:text-white transition-all duration-300 hover:scale-105"
            >
              <Github className="mr-2 transition-transform duration-300 group-hover/btn:rotate-12" size={16} />
              Code
            </Link>
          )}
          {project.liveUrl && project.liveUrl !== "#" && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
            >
              <ExternalLink
                className="mr-2 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"
                size={16}
              />
              Live Demo
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
