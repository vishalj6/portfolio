import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { DM_Sans, JetBrains_Mono, Playfair_Display } from "next/font/google";
import DynamicChat from "@/components/PortfolioChat/DynamicChat";
import DynamicCursor from "@/components/DynamicCursor";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700", "800"],
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
    "SDE-1",
    "Scalable Systems",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Anti-flicker: apply theme before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var saved=localStorage.getItem('theme');if(!saved){saved=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';localStorage.setItem('theme',saved);}var d=document.documentElement;if(saved==='dark'){d.classList.add('dark');}else{d.classList.remove('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${dmSans.variable} ${jetbrainsMono.variable} ${playfairDisplay.variable} antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
        <DynamicCursor />
        <DynamicChat />
      </body>
    </html>
  );
}
