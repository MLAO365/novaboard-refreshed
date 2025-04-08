"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import GlitchText from "@/components/glitch-text"

interface IntroSequenceProps {
  onComplete: () => void
}

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [phase, setPhase] = useState(0)
  const [showLogo, setShowLogo] = useState(false)
  const [showText, setShowText] = useState(false)
  const [showGrid, setShowGrid] = useState(false)
  const [showScanline, setShowScanline] = useState(false)
  const [showFinalText, setShowFinalText] = useState(false)
  const [showAccessGranted, setShowAccessGranted] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  const ambientRef = useRef<HTMLAudioElement>(null)
  const beep1Ref = useRef<HTMLAudioElement>(null)
  const beep2Ref = useRef<HTMLAudioElement>(null)
  const accessRef = useRef<HTMLAudioElement>(null)
  const scanRef = useRef<HTMLAudioElement>(null)

  // Text for the terminal output
  const terminalLines = [
    "INITIALIZING QUANTUM CORE...",
    "ESTABLISHING NEURAL INTERFACE...",
    "CALIBRATING DIMENSIONAL STABILIZERS...",
    "SYNCHRONIZING TEMPORAL MATRIX...",
    "LOADING NOVATERRA PROTOCOLS...",
    "DECRYPTING SECURITY ALGORITHMS...",
    "SCANNING BIOMETRIC SIGNATURE...",
    "VERIFYING CREDENTIALS...",
    "ESTABLISHING SECURE CONNECTION...",
    "ACCESSING NOVATERRA MAINFRAME...",
  ]

  const [terminalOutput, setTerminalOutput] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [typingText, setTypingText] = useState("")
  const [typingIndex, setTypingIndex] = useState(0)

  // Handle typing animation for terminal
  useEffect(() => {
    if (phase >= 1 && currentLine < terminalLines.length) {
      const line = terminalLines[currentLine]

      if (typingIndex < line.length) {
        const timer = setTimeout(() => {
          setTypingText((prev) => prev + line[typingIndex])
          setTypingIndex((prev) => prev + 1)
        }, 30)

        return () => clearTimeout(timer)
      } else {
        const timer = setTimeout(() => {
          setTerminalOutput((prev) => [...prev, typingText])
          setTypingText("")
          setTypingIndex(0)
          setCurrentLine((prev) => prev + 1)

          // Play beep sound for each completed line
          // Play beep sound for each completed line with error handling
          safePlayAudio(beep1Ref)
        }, 300)

        return () => clearTimeout(timer)
      }
    }
  }, [phase, currentLine, typingIndex, terminalLines])

  // Sequence timing
  // Add error handling for audio playback
  // Modify the useEffect that handles sequence timing

  // Replace the audio play calls with this safer approach
  // For example, replace:
  // if (ambientRef.current) {
  //   ambientRef.current.volume = 0.3
  //   ambientRef.current.play()
  // }

  // With this safer version that includes error handling:
  const safePlayAudio = (audioRef: React.RefObject<HTMLAudioElement>, volume = 1.0) => {
    if (audioRef.current) {
      audioRef.current.volume = volume

      // Only try to play if the src attribute exists and is not empty
      if (audioRef.current.src && audioRef.current.src !== window.location.href) {
        audioRef.current.play().catch((err) => {
          // Silently catch the error - this allows the visual sequence to continue
          console.log("Audio playback prevented:", err.message)
        })
      }
    }
  }

  // Update the useEffect that handles sequence timing
  useEffect(() => {
    // Start ambient sound with error handling
    safePlayAudio(ambientRef, 0.3)

    // Phase 0: Initial fade in
    const timer1 = setTimeout(() => {
      setPhase(1)
      safePlayAudio(beep2Ref)
    }, 1000)

    // Phase 1: Show grid
    const timer2 = setTimeout(() => {
      setShowGrid(true)
      safePlayAudio(scanRef, 0.2)
    }, 2000)

    // Phase 2: Show scanline
    const timer3 = setTimeout(() => {
      setShowScanline(true)
    }, 3000)

    // Phase 3: Show logo
    const timer4 = setTimeout(() => {
      setShowLogo(true)
      safePlayAudio(beep2Ref)
    }, 4000)

    // Phase 4: Show text
    const timer5 = setTimeout(() => {
      setShowText(true)
    }, 5000)

    // Phase 5: Show final text
    const timer6 = setTimeout(() => {
      setShowFinalText(true)
    }, 12000)

    // Phase 6: Show access granted
    const timer7 = setTimeout(() => {
      setShowAccessGranted(true)
      safePlayAudio(accessRef)
    }, 14000)

    // Phase 7: Fade out
    const timer8 = setTimeout(() => {
      setFadeOut(true)
      if (ambientRef.current) {
        // Fade out ambient sound
        const fadeAudio = setInterval(() => {
          if (ambientRef.current && ambientRef.current.volume > 0.1) {
            ambientRef.current.volume -= 0.1
          } else {
            clearInterval(fadeAudio)
            if (ambientRef.current) ambientRef.current.pause()
          }
        }, 200)
      }
    }, 16000)

    // Complete
    const timer9 = setTimeout(() => {
      onComplete()
    }, 18000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearTimeout(timer5)
      clearTimeout(timer6)
      clearTimeout(timer7)
      clearTimeout(timer8)
      clearTimeout(timer9)
    }
  }, [onComplete])

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden transition-opacity duration-1000",
        fadeOut ? "opacity-0" : "opacity-100",
      )}
    >
      {/* Audio elements with fallback content */}
      <audio ref={ambientRef} preload="none">
        <source src="/intro-ambient.mp3" type="audio/mpeg" />
        {/* Fallback text for browsers that don't support audio */}
      </audio>
      <audio ref={beep1Ref} preload="none">
        <source src="/intro-beep-1.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={beep2Ref} preload="none">
        <source src="/intro-beep-2.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={accessRef} preload="none">
        <source src="/intro-access.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={scanRef} preload="none">
        <source src="/intro-scan.mp3" type="audio/mpeg" />
      </audio>

      {/* Background elements */}
      {showGrid && <div className="absolute inset-0 bg-grid-pattern opacity-20 animate-pulse"></div>}

      {showScanline && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="h-1 w-full bg-green-500/30 absolute animate-scan"></div>
        </div>
      )}

      <div className="relative w-full max-w-4xl mx-auto h-full max-h-screen flex flex-col items-center justify-center p-8">
        {/* Central logo */}
        <div
          className={cn(
            "relative transition-all duration-1000 transform",
            showLogo ? "opacity-100 scale-100" : "opacity-0 scale-50",
          )}
        >
          <div className="relative">
            {/* Outer ring */}
            <div className="w-64 h-64 rounded-full border-2 border-green-500/30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin-slow"></div>

            {/* Middle ring */}
            <div className="w-48 h-48 rounded-full border border-green-400/40 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin-reverse"></div>

            {/* Inner ring with segments */}
            <div className="w-32 h-32 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-full h-full rounded-full border border-green-300/50 flex items-center justify-center">
                <div className="absolute inset-0">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="absolute w-full h-full" style={{ transform: `rotate(${i * 30}deg)` }}>
                      <div className="h-1 w-3 bg-green-400/70 absolute top-0 left-1/2 transform -translate-x-1/2"></div>
                    </div>
                  ))}
                </div>

                {/* Central emblem */}
                <div className="w-20 h-20 rounded-full bg-black border border-green-500/50 flex items-center justify-center overflow-hidden">
                  <div className="text-green-400 text-4xl font-vt323 animate-pulse">N</div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-1/2 left-1/2 w-80 h-80 transform -translate-x-1/2 -translate-y-1/2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="absolute w-full h-full" style={{ transform: `rotate(${i * 90}deg)` }}>
                  <div className="h-2 w-2 bg-green-500/80 absolute top-0 left-1/2 transform -translate-x-1/2 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main title */}
        <div
          className={cn(
            "mt-12 text-center transition-all duration-1000",
            showText ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10",
          )}
        >
          <GlitchText>
            <h1 className="text-5xl md:text-6xl font-vt323 text-green-400 tracking-wider">NOVATERRA</h1>
          </GlitchText>
          <p className="text-green-500/70 mt-2 text-lg">QUANTUM NEURAL INTERFACE</p>
        </div>

        {/* Terminal output */}
        <div
          className={cn(
            "mt-8 w-full max-w-lg bg-black/80 border border-green-900/50 rounded-md p-4 font-mono text-sm text-green-500/90 transition-all duration-1000",
            showText ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10",
          )}
        >
          <div className="flex flex-col space-y-1">
            {terminalOutput.map((line, index) => (
              <div key={index} className="flex">
                <span className="text-green-400 mr-2">&gt;</span>
                <span>{line}</span>
              </div>
            ))}
            {typingText && (
              <div className="flex">
                <span className="text-green-400 mr-2">&gt;</span>
                <span>{typingText}</span>
                <span className="animate-blink ml-1">_</span>
              </div>
            )}
          </div>
        </div>

        {/* Final text */}
        <div
          className={cn(
            "mt-8 text-center transition-all duration-1000",
            showFinalText ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10",
          )}
        >
          <p className="text-green-400/90 text-lg">SYSTEM INITIALIZATION COMPLETE</p>
        </div>

        {/* Access granted */}
        <div
          className={cn(
            "mt-4 text-center transition-all duration-500",
            showAccessGranted ? "opacity-100 scale-100" : "opacity-0 scale-90",
          )}
        >
          <div className="inline-block bg-green-900/30 border border-green-500/50 px-6 py-2 rounded">
            <p className="text-green-400 font-bold tracking-wider">ACCESS GRANTED</p>
          </div>
        </div>
      </div>
    </div>
  )
}

