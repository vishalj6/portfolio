import Image from "next/image"
import { ArrowRight, Download } from "lucide-react"
import TypewriterText from "./TypewriterText"
import AnimatedSection from "./AnimatedSection"

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5 animate-gradient-shift"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <AnimatedSection animation="fadeInLeft">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  Hi, I'm{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent animate-gradient-text">
                    Vishal Jadeja
                  </span>
                </h1>
              </AnimatedSection>

              <AnimatedSection animation="fadeInLeft" delay={200}>
                <h2 className="text-xl md:text-2xl text-gray-400 mb-6 h-8">
                  <TypewriterText
                    texts={[
                      "Full Stack Developer",
                      "MERN Stack Expert",
                      "React Specialist",
                      "Node.js Developer",
                      "TypeScript Enthusiast",
                    ]}
                    className="text-blue-400"
                  />
                </h2>
              </AnimatedSection>

              <AnimatedSection animation="fadeInLeft" delay={400}>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  I specialize in building scalable web applications using modern technologies like React, Next.js,
                  Node.js, and TypeScript. Currently leading development teams at Glitchover and passionate about
                  creating efficient, user-friendly solutions.
                </p>
              </AnimatedSection>

              <AnimatedSection animation="fadeInUp" delay={600}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a
                    href="#projects"
                    className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:shadow-md hover:shadow-blue-500/25"
                  >
                    View My Work
                    <ArrowRight
                      className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                      size={20}
                    />
                  </a>
                  <a
                    href="#contact"
                    className="group inline-flex items-center px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-blue-400 hover:text-blue-400 hover:bg-blue-400/5 transition-all duration-300"
                  >
                    <Download className="mr-2 transition-transform duration-300 group-hover:scale-110" size={20} />
                    Get In Touch
                  </a>
                </div>
              </AnimatedSection>
            </div>

            <AnimatedSection animation="scaleIn" delay={800} className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-80 h-80 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 p-1">
                  <div className="w-full h-full rounded-full bg-gray-900 p-4 cursor-pointer">
                    <Image
                      // src="/placeholder.svg?height=300&width=300"
                      src="https://scontent-bom2-3.cdninstagram.com/v/t51.29350-15/469065705_544260191746861_7439630566956587917_n.heic?stp=dst-jpg_e35_tt6&cb=9b69d9bc-cc9a4304&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTgwMC5zZHIuZjI5MzUwLmRlZmF1bHRfaW1hZ2UuYzIifQ&_nc_ht=scontent-bom2-3.cdninstagram.com&_nc_cat=101&_nc_oc=Q6cZ2QFj1z1WTLK09G7PTo6W3Y-M7S04nor7ftvnxA23L8wuiPxQ6chsC5HYolt8SRVPJHA&_nc_ohc=6SyO6b9-FEgQ7kNvwH4yImp&_nc_gid=R6AVNmBLqon67jHp0o8yDA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzUxNDM5NTM1Njk5OTA2NTgzMA%3D%3D.3-ccb7-5-cb9b69d9bc-cc9a4304&oh=00_AfQ_mg9iz3cM5tqWbKcg8tUxQCrMGSbpzSxIaL8B3VNTOw&oe=688EC3DF&_nc_sid=7a9f4b"
                      alt="Vishal Jadeja - Full Stack Developer"
                      width={300}
                      height={300}
                      className="rounded-full object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                      priority
                    />
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500 rounded-full opacity-20 animate-bounce-slow"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500 rounded-full opacity-20 animate-pulse-slow delay-1000"></div>
                <div className="absolute top-1/2 -left-8 w-16 h-16 bg-cyan-400 rounded-full opacity-10 animate-float"></div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  )
}
