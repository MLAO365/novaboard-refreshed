"use client"

import { useState, useEffect, useRef } from "react"

export default function MusicVisualizer() {
  const [bars, setBars] = useState<number[]>([])
  const animationRef = useRef<number>(0)

  // Initialize bars
  useEffect(() => {
    const barCount = 16
    setBars(
      Array(barCount)
        .fill(0)
        .map(() => Math.random() * 0.5 + 0.1),
    )

    // Start animation
    const animate = () => {
      setBars((prev) =>
        prev.map((height) => {
          // Simulate audio reactivity with random changes
          const change = (Math.random() - 0.5) * 0.2
          const newHeight = Math.max(0.1, Math.min(1, height + change))
          return newHeight
        }),
      )
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <div className="w-full">
      <div className="text-xs text-blue-400/70 font-mono mb-2">AUDIO SPECTRUM</div>
      <div className="h-24 bg-black/40 rounded-lg border border-blue-900/30 p-2 overflow-hidden relative">
        {/* Frutiger Aero-style glossy background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-blue-900/5 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-blue-500/5"></div>

        {/* Glossy highlight */}
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/10 to-transparent rounded-t-lg"></div>

        {/* Visualizer bars */}
        <div className="relative h-full flex items-end justify-between z-10">
          {bars.map((height, index) => (
            <div
              key={index}
              className="w-1 rounded-t-sm bg-gradient-to-b from-blue-300/80 to-blue-500/80"
              style={{
                height: `${height * 100}%`,
                boxShadow: "0 0 5px rgba(59, 130, 246, 0.5)",
              }}
            >
              {/* Glossy highlight on each bar */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent"></div>
            </div>
          ))}
        </div>

        {/* Reflection effect */}
        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-blue-500/10 to-transparent"></div>
      </div>

      {/* Frequency labels */}
      <div className="flex justify-between mt-1 px-1">
        <span className="text-[8px] text-blue-400/50">50Hz</span>
        <span className="text-[8px] text-blue-400/50">1kHz</span>
        <span className="text-[8px] text-blue-400/50">8kHz</span>
        <span className="text-[8px] text-blue-400/50">16kHz</span>
      </div>
    </div>
  )
}

