import TechStack from "@/components/TechStack"
import ExperienceTimeline from "@/components/ExperienceTimeline"
import AnimatedSection from "./AnimatedSection"

export default function About() {
  return (
    <section id="about" className="min-h-screen py-20 bg-gray-800/30 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              About Me
            </h2>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={200}>
            <div className="mb-16">
              <div className="bg-gray-800 rounded-lg p-8 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group">
                <h3 className="text-2xl font-semibold mb-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                  Background
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6 group-hover:text-gray-200 transition-colors duration-300">
                  I'm a passionate Full Stack Developer with expertise in modern web technologies. I specialize in
                  building scalable applications using the MERN stack, Next.js, and TypeScript. My journey in software
                  development has been driven by a love for creating efficient, user-friendly solutions that solve
                  real-world problems.
                </p>
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  Currently working at Glitchover, I've progressed from an intern to leading development teams, building
                  microservices, implementing CI/CD pipelines, and integrating payment gateways. I'm always eager to
                  learn new technologies and take on challenging projects that push the boundaries of what's possible.
                </p>
              </div>
            </div>
          </AnimatedSection>

          <TechStack />
          <ExperienceTimeline />
        </div>
      </div>
    </section>
  )
}
