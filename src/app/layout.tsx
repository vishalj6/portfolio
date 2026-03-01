import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vishal Jadeja | Software Engineer",
  description:
    "Full Stack Engineer specializing in scalable backend systems, real-time architecture, microservices, and high-performance APIs. MERN stack expert with 1500+ concurrent user systems.",
  keywords: [
    "Vishal Jadeja",
    "Full Stack Developer",
    "Software Engineer",
    "Software Developer",
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
    title: "Vishal Jadeja | Software Engineer",
    description:
      "Full Stack Engineer building scalable backend systems and real-time architecture.",
    url: "https://vishaljadeja.dev",
    siteName: "Vishal Jadeja Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vishal Jadeja | Software Engineer",
    description: "Full Stack Engineer building scalable backend systems and real-time architecture.",
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
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />

      </body>
    </html>
  );
}
