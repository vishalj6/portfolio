import ProjectCard from "@/components/ProjectCard"
import AnimatedSection from "./AnimatedSection"

const projects = [
  {
    title: "Amazon Clone",
    description:
      "A full-featured e-commerce platform built with the MERN stack. Implements secure user authentication, shopping cart functionality, comprehensive product management, and order processing system.",
    techStack: ["MongoDB", "Express.js", "React", "Node.js", "JWT", "Stripe"],
    githubUrl: "https://github.com/vishalj6",
    liveUrl: "#",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    title: "Syncify",
    description:
      "An innovative automation tool that seamlessly syncs Spotify playlists from YouTube content. Utilizes Google and Spotify APIs to provide users with effortless music discovery and playlist management.",
    techStack: ["React", "Node.js", "Google APIs", "Spotify API", "Express.js"],
    githubUrl: "https://github.com/vishalj6",
    liveUrl: "#",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    title: "User Management System",
    description:
      "A comprehensive user management platform built with ASP.NET Core. Features include JWT authentication, role-based access control, admin panel, and OTP verification for enhanced security.",
    techStack: ["ASP.NET Core", "Razor Pages", "Web API", "JWT", "SQL Server", "C#"],
    githubUrl: "https://github.com/vishalj6",
    liveUrl: "#",
    image: "/placeholder.svg?height=300&width=500",
  },
]

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent leading-normal">
              My Projects
            </h2>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={200}>
            <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
              Here are some of the projects I've worked on, showcasing my skills in full-stack development, API
              integration, and modern web technologies.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <AnimatedSection key={index} animation="slideInUp" delay={index * 200}>
                <ProjectCard project={project} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
