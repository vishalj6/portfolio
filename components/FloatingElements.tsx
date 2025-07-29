"use client"

import { useEffect, useState } from "react"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  speedX: number
  speedY: number
  opacity: number
}

export default function FloatingElements() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    // Set initial dimensions
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    // Handle window resize
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)

    // Create initial particles
    const initialParticles: Particle[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 1,
      color: [
        "bg-blue-400",
        "bg-purple-400",
        "bg-cyan-400",
        "bg-pink-400",
        "bg-yellow-400",
        "bg-green-400",
        "bg-indigo-400",
      ][Math.floor(Math.random() * 7)],
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.6 + 0.2,
    }))

    setParticles(initialParticles)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    if (particles.length === 0 || dimensions.width === 0) return

    const animateParticles = () => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          let newX = particle.x + particle.speedX
          let newY = particle.y + particle.speedY
          let newSpeedX = particle.speedX
          let newSpeedY = particle.speedY

          // Bounce off edges
          if (newX <= 0 || newX >= dimensions.width) {
            newSpeedX = -particle.speedX
            newX = Math.max(0, Math.min(dimensions.width, newX))
          }
          if (newY <= 0 || newY >= dimensions.height) {
            newSpeedY = -particle.speedY
            newY = Math.max(0, Math.min(dimensions.height, newY))
          }

          return {
            ...particle,
            x: newX,
            y: newY,
            speedX: newSpeedX,
            speedY: newSpeedY,
          }
        }),
      )
    }

    const intervalId = setInterval(animateParticles, 50)
    return () => clearInterval(intervalId)
  }, [particles.length, dimensions])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Moving particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute rounded-full ${particle.color} transition-all duration-1000 ease-linear`}
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            filter: "blur(0.5px)",
          }}
        />
      ))}

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-xl animate-float-orb"></div>
      <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-xl animate-float-orb-delayed"></div>
      <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-xl animate-float-orb-slow"></div>

      {/* Moving geometric shapes */}
      <div className="absolute top-1/3 left-1/5 w-2 h-2 bg-blue-500/40 rotate-45 animate-drift-right"></div>
      <div className="absolute bottom-1/3 right-1/5 w-3 h-3 bg-purple-500/40 rotate-45 animate-drift-left"></div>
      <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-cyan-500/60 rotate-45 animate-drift-up"></div>
      <div className="absolute bottom-1/5 left-2/3 w-2 h-2 bg-pink-500/40 rotate-45 animate-drift-down"></div>

      {/* Pulsing dots */}
      <div className="absolute top-1/5 right-1/2 w-1 h-1 bg-yellow-400/80 rounded-full animate-pulse-glow"></div>
      <div className="absolute bottom-1/5 left-1/2 w-1 h-1 bg-green-400/80 rounded-full animate-pulse-glow-delayed"></div>
      <div className="absolute top-3/5 left-1/4 w-1 h-1 bg-indigo-400/80 rounded-full animate-pulse-glow-slow"></div>
    </div>
  )
}