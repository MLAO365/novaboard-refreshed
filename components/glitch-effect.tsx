"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface GlitchEffectProps {
  children: React.ReactNode
  className?: string
  intensity?: "low" | "medium" | "high"
  interval?: number
}

export default function GlitchEffect({
  children,
  className,
  intensity = "medium",
  interval = 3000,
}: GlitchEffectProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => {
        setIsGlitching(false)
      }, 200)
    }, interval)

    return () => clearInterval(glitchInterval)
  }, [interval])

  const getIntensityClass = () => {
    switch (intensity) {
      case "low":
        return "animate-glitch-low"
      case "high":
        return "animate-glitch-high"
      default:
        return "animate-glitch"
    }
  }

  return (
    <div className={cn("relative inline-block", className)}>
      <div className={cn(isGlitching && getIntensityClass())}>{children}</div>
      {isGlitching && (
        <>
          <div
            className="absolute top-0 left-0 w-full h-full opacity-50 mix-blend-screen"
            style={{ clipPath: "inset(50% 0 0 0)" }}
          >
            {children}
          </div>
          <div
            className="absolute top-0 left-0 w-full h-full opacity-50 mix-blend-multiply"
            style={{ clipPath: "inset(0 0 50% 0)" }}
          >
            {children}
          </div>
        </>
      )}
    </div>
  )
}

