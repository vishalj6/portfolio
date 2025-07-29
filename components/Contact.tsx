import ContactForm from "@/components/ContactForm"
import ContactInfo from "@/components/ContactInfo"

export default function Contact() {
  return (
    <section id="contact" className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            I'm always interested in new opportunities and exciting projects. Feel free to reach out if you'd like to
            work together!
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
