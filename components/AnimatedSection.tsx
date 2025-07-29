"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  animation?: "fadeInUp" | "fadeInLeft" | "fadeInRight" | "scaleIn" | "slideInUp"
  delay?: number
}

export default function AnimatedSection({
  children,
  className = "",
  animation = "fadeInUp",
  delay = 0,
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [delay])

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0 translate-x-0 scale-100"
          : animation === "fadeInUp"
            ? "opacity-0 translate-y-8"
            : animation === "fadeInLeft"
              ? "opacity-0 -translate-x-8"
              : animation === "fadeInRight"
                ? "opacity-0 translate-x-8"
                : animation === "scaleIn"
                  ? "opacity-0 scale-95"
                  : animation === "slideInUp"
                    ? "opacity-0 translate-y-12"
                    : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  )
}
