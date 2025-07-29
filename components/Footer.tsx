import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Vishal Jadeja
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Full Stack Developer passionate about building scalable web applications and leading development teams
                to create innovative solutions.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/experience" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                    Experience
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Connect</h4>
              <div className="flex gap-4">
                <Link
                  href="https://github.com/vishalj6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                  aria-label="GitHub"
                >
                  <Github size={24} />
                </Link>
                <Link
                  href="https://linkedin.com/in/vishal-jadeja"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={24} />
                </Link>
                <Link
                  href="mailto:jadejavishal6@gmail.com"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                  aria-label="Email"
                >
                  <Mail size={24} />
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">© {new Date().getFullYear()} Vishal Jadeja. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
