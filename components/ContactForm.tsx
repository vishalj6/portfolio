"use client"

import type React from "react"
import { useState } from "react"
import { Send, CheckCircle } from "lucide-react"

interface FormData {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitted(true)
    setIsSubmitting(false)
    setFormData({ name: "", email: "", message: "" })

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-gray-800 rounded-lg p-8 text-center animate-bounce-in">
        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-scale-in">
          <CheckCircle className="w-8 h-8 text-white animate-check" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2 animate-fade-in-up">Message Sent!</h3>
        <p className="text-gray-300 animate-fade-in-up delay-200">
          Thank you for reaching out. I'll get back to you as soon as possible.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 rounded-lg p-8 space-y-6 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500"
    >
      <h2 className="text-2xl font-semibold mb-6 text-white">Send Me a Message</h2>

      <div className="group">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-blue-400 transition-colors duration-300"
        >
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white hover:bg-gray-650 ${errors.name ? "border-red-500 animate-shake" : "border-gray-600"
            }`}
          placeholder="Your full name"
        />
        {errors.name && <p className="mt-1 text-sm text-red-400 animate-fade-in">{errors.name}</p>}
      </div>

      <div className="group">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-blue-400 transition-colors duration-300"
        >
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white hover:bg-gray-650 ${errors.email ? "border-red-500 animate-shake" : "border-gray-600"
            }`}
          placeholder="your.email@example.com"
        />
        {errors.email && <p className="mt-1 text-sm text-red-400 animate-fade-in">{errors.email}</p>}
      </div>

      <div className="group">
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-blue-400 transition-colors duration-300"
        >
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white resize-none hover:bg-gray-650 ${errors.message ? "border-red-500 animate-shake" : "border-gray-600"
            }`}
          placeholder="Tell me about your project or just say hello..."
        />
        {errors.message && <p className="mt-1 text-sm text-red-400 animate-fade-in">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300 transform hover:shadow-md hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 group cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 transition-transform duration-300" />
            Send Message
          </>
        )}
      </button>
    </form>
  )
}
