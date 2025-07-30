import ProjectCard from "@/components/ProjectCard"
import AnimatedSection from "./AnimatedSection"

const projects = [
  {
    title: "Amazon Clone",
    description:
      "A full-featured e-commerce platform built with the MERN stack. Implements secure user authentication, shopping cart functionality, comprehensive product management, and order processing system.",
    techStack: ["MongoDB", "Express.js", "React", "Node.js", "JWT"],
    githubUrl: "https://github.com/vishalj6/AmazonClone",
    image: "https://private-user-images.githubusercontent.com/99495355/350350832-db941f9e-15f7-430f-84a7-f89bdc800322.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTM4NDE0MjIsIm5iZiI6MTc1Mzg0MTEyMiwicGF0aCI6Ii85OTQ5NTM1NS8zNTAzNTA4MzItZGI5NDFmOWUtMTVmNy00MzBmLTg0YTctZjg5YmRjODAwMzIyLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA3MzAlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNzMwVDAyMDUyMlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTBjZTlhYTM3OTU1NjE2YTExMjlkMDg3MTA5YWI1M2ZkNTllOTI3OTE3NGZmOTA2ODBiNjY0NmFkNjY5YzE5YmQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.-afaQ61Ao2iVGrDHnxDARwAvaR9g73bPBHPdgHHxstA",
  },
  {
    title: "Syncify",
    description:
      "An innovative automation tool that seamlessly syncs Spotify playlists from YouTube content. Utilizes Google and Spotify APIs to provide users with effortless music discovery and playlist management.",
    techStack: ["React", "Node.js", "Google APIs", "Spotify API", "Express.js"],
    githubUrl: "http://github.com/vishalj6/Syncify",
    liveUrl: "https://syncify-vishal.netlify.app/",
    image: "https://private-user-images.githubusercontent.com/99495355/358370814-6134fb24-3c34-4eff-8d93-e62dce46635f.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTM4NDExOTgsIm5iZiI6MTc1Mzg0MDg5OCwicGF0aCI6Ii85OTQ5NTM1NS8zNTgzNzA4MTQtNjEzNGZiMjQtM2MzNC00ZWZmLThkOTMtZTYyZGNlNDY2MzVmLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA3MzAlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNzMwVDAyMDEzOFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTg5N2I1ODIwYTE2ZTI1N2E3NjM0N2NiYzk4ZWYyNTAyNDhlODllMWUyYWEyNDM1OTdjYWFkYzRkMWVkNDdlMjEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.auGWwnotuaJGREe5kkBw1QePS69Xcpqo4nQveLLuWSQ",
  },
  {
    title: "User Management System",
    description:
      "A comprehensive user management platform built with ASP.NET Core. Features include JWT authentication, role-based access control, admin panel, and OTP verification for enhanced security.",
    techStack: ["ASP.NET Core", "Razor Pages", "Web API", "JWT", "SQL Server", "C#"],
    githubUrl: "https://github.com/vishalj6/User-Frontend",
    image: "https://private-user-images.githubusercontent.com/99495355/345045304-220bea70-4bef-4878-8802-94dca895ad05.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTM4NDE0OTMsIm5iZiI6MTc1Mzg0MTE5MywicGF0aCI6Ii85OTQ5NTM1NS8zNDUwNDUzMDQtMjIwYmVhNzAtNGJlZi00ODc4LTg4MDItOTRkY2E4OTVhZDA1LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA3MzAlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNzMwVDAyMDYzM1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTc1NTMwNjhiMjE0YWM2OTNjOTQxMWQ2MDg4ZDQxYzM3OWQwZDg3ZjVkZjY0YmEwOGIyMTc5MDc4MDE0ZmU2NTAmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.rQY4QywfczSIj_s4bula954BFFrA4jA0-pq3HfoRG08",
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
