import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react"
import Link from "next/link"

const contactDetails = [
  {
    icon: <Mail className="w-5 h-5" />,
    label: "Email",
    value: "jadejavishal6@gmail.com",
    href: "mailto:jadejavishal6@gmail.com",
  },
  {
    icon: <Phone className="w-5 h-5" />,
    label: "Phone",
    value: "+91 7359907544",
    href: "tel:+917359907544",
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    label: "Location",
    value: "Ahmedabad, India",
    href: "#",
  },
]

const socialLinks = [
  {
    icon: <Github className="w-6 h-6" />,
    label: "GitHub",
    href: "https://github.com/vishalj6",
  },
  {
    icon: <Linkedin className="w-6 h-6" />,
    label: "LinkedIn",
    href: "https://linkedin.com/in/vishal-jadeja",
  },
]

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-white">Contact Information</h2>
        <div className="space-y-4">
          {contactDetails.map((detail, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="text-blue-400">{detail.icon}</div>
              <div>
                <p className="text-gray-400 text-sm">{detail.label}</p>
                {detail.href !== "#" ? (
                  <Link href={detail.href} className="text-white hover:text-blue-400 transition-colors duration-200">
                    {detail.value}
                  </Link>
                ) : (
                  <p className="text-white">{detail.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4 text-white">Connect With Me</h3>
        <div className="flex gap-4">
          {socialLinks.map((social, index) => (
            <Link
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 bg-gray-800 rounded-lg hover:bg-blue-600 transition-all duration-200 transform hover:scale-110"
              aria-label={social.label}
            >
              <div className="text-gray-300 hover:text-white">{social.icon}</div>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-white">Let's Work Together</h3>
        <p className="text-gray-300 leading-relaxed">
          I'm always interested in new opportunities and exciting projects. Whether you're looking for a full-time
          developer or need help with a specific project, I'd love to hear from you!
        </p>
      </div>
    </div>
  )
}
