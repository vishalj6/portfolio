import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import FloatingElements from "@/components/FloatingElements"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Vishal Jadeja - Full Stack Developer Portfolio",
  description:
    "Full Stack Developer specializing in MERN stack, Next.js, and modern web technologies. View my projects, experience, and get in touch for opportunities.",
  keywords: ["Full Stack Developer", "React", "Next.js", "Node.js", "TypeScript", "MERN Stack", "Portfolio"],
  authors: [{ name: "Vishal Jadeja" }],
  openGraph: {
    title: "Vishal Jadeja - Full Stack Developer Portfolio",
    description: "Full Stack Developer specializing in MERN stack, Next.js, and modern web technologies.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vishal Jadeja - Full Stack Developer Portfolio",
    description: "Full Stack Developer specializing in MERN stack, Next.js, and modern web technologies.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-white min-h-screen overflow-x-hidden`}>
        <FloatingElements />
        <Navigation />
        <main className="pt-16 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
