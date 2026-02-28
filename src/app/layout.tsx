import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vishal Jadeja | Full Stack Developer",
  description:
    "Full Stack Engineer specializing in scalable backend systems, real-time architecture, microservices, and high-performance APIs. MERN stack expert with 1500+ concurrent user systems.",
  keywords: [
    "Vishal Jadeja",
    "Full Stack Developer",
    "Backend Engineer",
    "MERN Stack",
    "Node.js",
    "React",
    "Next.js",
    "WebSockets",
    "Microservices",
    "MongoDB",
    "TypeScript",
  ],
  authors: [{ name: "Vishal Jadeja" }],
  openGraph: {
    title: "Vishal Jadeja | Full Stack Developer",
    description:
      "Full Stack Engineer building scalable backend systems and real-time architecture.",
    url: "https://vishaljadeja.dev",
    siteName: "Vishal Jadeja Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vishal Jadeja | Full Stack Developer",
    description:
      "Full Stack Engineer building scalable backend systems and real-time architecture.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
