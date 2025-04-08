"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface GlitchTextProps {
  children: React.ReactNode
  className?: string
  onHover?: boolean
}

export default function GlitchText({ children, className, onHover = false }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    if (!onHover) {
      const glitchInterval = setInterval(() => {
        setIsGlitching(true)
        setTimeout(() => {
          setIsGlitching(false)
        }, 200)
      }, 5000)

      return () => clearInterval(glitchInterval)
    }
  }, [onHover])

  return (
    <div
      className={cn(
        "relative inline-block",
        onHover && "hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-green-400 to-blue-500",
        className,
      )}
      onMouseEnter={() => onHover && setIsGlitching(true)}
      onMouseLeave={() => onHover && setIsGlitching(false)}
    >
      <span className={cn(isGlitching && "glitch-text")}>{children}</span>
      {isGlitching && (
        <>
          <span className="absolute top-0 left-0 w-full glitch-text-r" aria-hidden="true">
            {children}
          </span>
          <span className="absolute top-0 left-0 w-full glitch-text-g" aria-hidden="true">
            {children}
          </span>
        </>
      )}
    </div>
  )
}

