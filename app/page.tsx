"use client"

import { useEffect, useState, useRef } from "react"
import { Terminal, ChevronLeft, ChevronRight, Command } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import GlitchText from "@/components/glitch-text"
import TerminalComponent from "@/components/terminal"
import IntroSequence from "@/components/intro-sequence"
import { cn } from "@/lib/utils"

// Define the card data
const cards = [
  {
    title: "BOUNTY BOARD",
    icon: "⚠",
    color: "red",
    description: "View active bounties on players and NPCs across the Novaterra universe.",
    href: "/bounty-board",
  },
  {
    title: "INTERACTIVE MAP",
    icon: "◎",
    color: "blue",
    description: "Navigate through the Novaterra universe and discover key locations.",
    href: "/map",
  },
  {
    title: "ANNOUNCEMENTS",
    icon: "⌘",
    color: "green",
    description: "Read the latest news, lore updates, and episode summaries.",
    href: "/announcements",
  },
  {
    title: "STOCK SYSTEM",
    icon: "⚙",
    color: "purple",
    description: "Check current stock levels for various in-game commodities and items.",
    href: "/stock-system",
  },
  {
    title: "FACTIONS",
    icon: "⚔",
    color: "orange",
    description: "Explore NPC and player factions across the Novaterra universe.",
    href: "/factions",
  },
  {
    title: "EVENTS",
    icon: "📅",
    color: "pink",
    description: "View upcoming special events, digital auctions, and tournaments.",
    href: "/events",
  },
  {
    title: "ACHIEVEMENTS",
    icon: "🏆",
    color: "yellow",
    description: "Track your progress and earn rewards for completing challenges.",
    href: "/achievements",
  },
]

// Map color names to actual Tailwind classes to avoid string interpolation issues
const colorMap = {
  red: {
    bg: "bg-red-900/40",
    text: "text-red-500",
    textLight: "text-red-400",
    border: "border-red-900/50",
    gradientFrom: "from-red-900/40",
    pulse: "bg-red-500",
    glow: "shadow-glow-red",
  },
  blue: {
    bg: "bg-blue-900/40",
    text: "text-blue-500",
    textLight: "text-blue-400",
    border: "border-blue-900/50",
    gradientFrom: "from-blue-900/40",
    pulse: "bg-blue-500",
    glow: "shadow-glow-blue",
  },
  green: {
    bg: "bg-green-900/40",
    text: "text-green-500",
    textLight: "text-green-400",
    border: "border-green-900/50",
    gradientFrom: "from-green-900/40",
    pulse: "bg-green-500",
    glow: "shadow-glow-green",
  },
  purple: {
    bg: "bg-purple-900/40",
    text: "text-purple-500",
    textLight: "text-purple-400",
    border: "border-purple-900/50",
    gradientFrom: "from-purple-900/40",
    pulse: "bg-purple-500",
    glow: "shadow-glow-purple",
  },
  orange: {
    bg: "bg-orange-900/40",
    text: "text-orange-500",
    textLight: "text-orange-400",
    border: "border-orange-900/50",
    gradientFrom: "from-orange-900/40",
    pulse: "bg-orange-500",
    glow: "shadow-glow-orange",
  },
  pink: {
    bg: "bg-pink-900/40",
    text: "text-pink-500",
    textLight: "text-pink-400",
    border: "border-pink-900/50",
    gradientFrom: "from-pink-900/40",
    pulse: "bg-pink-500",
    glow: "shadow-glow-pink",
  },
  yellow: {
    bg: "bg-yellow-900/40",
    text: "text-yellow-500",
    textLight: "text-yellow-400",
    border: "border-yellow-900/50",
    gradientFrom: "from-yellow-900/40",
    pulse: "bg-yellow-500",
    glow: "shadow-glow-yellow",
  },
}

export default function Home() {
  const [showIntro, setShowIntro] = useState(true)
  const [bootSequence, setBootSequence] = useState<string[]>([])
  const [bootComplete, setBootComplete] = useState(false)
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Skip intro if it's already been shown in this session
  useEffect(() => {
    try {
      const hasSeenIntro = sessionStorage.getItem("hasSeenIntro")
      if (hasSeenIntro) {
        setShowIntro(false)
      } else {
        // Set a flag in sessionStorage so the intro only plays once per session
        sessionStorage.setItem("hasSeenIntro", "true")
      }
    } catch (error) {
      // If sessionStorage is not available (e.g., in private browsing mode)
      console.log("Session storage not available:", error)
      setShowIntro(false) // Skip intro if there's an issue with sessionStorage
    }
  }, [])

  useEffect(() => {
    // Only start boot sequence after intro is complete
    if (showIntro) return

    const bootMessages = [
      "Initializing NOVATERRA terminal...",
      "Establishing secure connection...",
      "Authenticating user credentials...",
      "Accessing central database...",
      "Loading navigation protocols...",
      "Decrypting communication channels...",
      "Scanning for system threats...",
      "Calibrating quantum interface...",
      "Synchronizing with fleet command...",
      "Terminal ready. Welcome to NOVATERRA.",
    ]

    let index = 0
    const interval = setInterval(() => {
      if (index < bootMessages.length) {
        setBootSequence((prev) => [...prev, bootMessages[index]])
        index++
      } else {
        clearInterval(interval)
        setTimeout(() => {
          setBootComplete(true)
        }, 1000)
      }
    }, 400)

    return () => clearInterval(interval)
  }, [showIntro])

  // Function to scroll to a specific card
  const scrollToCard = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      // Calculate the exact position to scroll to for perfect centering
      const cards = container.querySelectorAll(".card-item")
      if (cards[index]) {
        const card = cards[index] as HTMLElement
        const containerWidth = container.offsetWidth
        const cardWidth = card.offsetWidth
        const scrollLeft = card.offsetLeft - containerWidth / 2 + cardWidth / 2

        container.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        })
        setActiveCardIndex(index)
      }
    }
  }

  // Function to handle scroll navigation
  const handleScroll = (direction: "left" | "right") => {
    const newIndex =
      direction === "left" ? Math.max(0, activeCardIndex - 1) : Math.min(cards.length - 1, activeCardIndex + 1)

    scrollToCard(newIndex)
  }

  // Handle scroll events to update active card
  const handleScrollEvent = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const containerWidth = container.offsetWidth
      const scrollPosition = container.scrollLeft + containerWidth / 2

      const cards = container.querySelectorAll(".card-item")
      let closestCardIndex = 0
      let closestDistance = Number.POSITIVE_INFINITY

      cards.forEach((card, index) => {
        const cardElement = card as HTMLElement
        const cardCenter = cardElement.offsetLeft + cardElement.offsetWidth / 2
        const distance = Math.abs(scrollPosition - cardCenter)

        if (distance < closestDistance) {
          closestDistance = distance
          closestCardIndex = index
        }
      })

      if (closestCardIndex !== activeCardIndex) {
        setActiveCardIndex(closestCardIndex)
      }
    }
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", handleScrollEvent)
      return () => container.removeEventListener("scroll", handleScrollEvent)
    }
  }, [activeCardIndex])

  return (
    <>
      {showIntro && <IntroSequence onComplete={() => setShowIntro(false)} />}

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {!bootComplete ? (
            <div className="font-mono text-green-500 space-y-2 p-4 border border-green-900/50 bg-black/50 rounded-md">
              {bootSequence.map((message, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-green-400 mr-2">{">"}</span>
                  <span className={index === bootSequence.length - 1 ? "typing-animation" : ""}>{message}</span>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="mb-12 text-center">
                <GlitchText>
                  <h1 className="text-4xl md:text-6xl font-vt323 text-green-400 mb-4">NOVATERRA COMMAND</h1>
                </GlitchText>
                <p className="text-green-500/80 max-w-2xl mx-auto">
                  Official information hub for the Novaterra universe. Access the bounty board, interactive map,
                  announcements, and stock system.
                </p>
              </div>

              {/* Enhanced Horizontal Gallery */}
              <div className="relative mt-8 mb-12">
                {/* Navigation buttons */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-black/70 border border-green-900/50 text-green-500 hover:bg-black/90 hover:text-green-400 shadow-lg shadow-green-900/20"
                  onClick={() => handleScroll("left")}
                  disabled={activeCardIndex === 0}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-black/70 border border-green-900/50 text-green-500 hover:bg-black/90 hover:text-green-400 shadow-lg shadow-green-900/20"
                  onClick={() => handleScroll("right")}
                  disabled={activeCardIndex === cards.length - 1}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>

                {/* Scrolling container with enhanced cards */}
                <div
                  ref={scrollContainerRef}
                  className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar py-8 px-4"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {cards.map((card, index) => {
                    const colors = colorMap[card.color as keyof typeof colorMap]
                    const isActive = activeCardIndex === index

                    return (
                      <div
                        key={index}
                        className="card-item min-w-[300px] sm:min-w-[350px] md:min-w-[400px] flex-shrink-0 snap-center px-4"
                      >
                        <Link href={card.href} className="block">
                          <Card
                            className={cn(
                              "bg-black/80 border-green-900/50 hover:border-green-500/50 transition-all cursor-pointer group overflow-hidden",
                              "transform transition-all duration-500 h-[520px]",
                              isActive
                                ? `scale-100 ${colors.border} ${colors.glow}`
                                : "scale-95 opacity-80 hover:scale-97 hover:opacity-90",
                            )}
                          >
                            {/* Card image area with enhanced visuals */}
                            <div className="relative w-full h-[320px] overflow-hidden">
                              {/* Animated background */}
                              <div className="absolute inset-0 bg-grid-pattern opacity-20 animate-grid-flow"></div>

                              {/* Color overlay with gradient */}
                              <div
                                className={`absolute inset-0 bg-gradient-to-b ${colors.gradientFrom} to-black/90 z-10 opacity-80`}
                              ></div>

                              {/* Animated particles effect */}
                              <div className="absolute inset-0 z-10 opacity-30">
                                <div className="particles-container"></div>
                              </div>

                              {/* Card icon (large, centered) with enhanced styling */}
                              <div className="absolute inset-0 flex items-center justify-center z-20">
                                <span
                                  className={`${colors.text} text-9xl opacity-40 group-hover:opacity-60 transition-all duration-700 transform group-hover:scale-110 filter blur-[1px] group-hover:blur-0`}
                                >
                                  {card.icon}
                                </span>
                              </div>

                              {/* Animated circuit lines */}
                              <div className="absolute inset-0 z-15 circuit-pattern opacity-10 group-hover:opacity-20 transition-opacity"></div>

                              {/* Status indicator with pulse effect */}
                              <div className="absolute top-4 right-4 z-20 flex items-center">
                                <div className={`w-2 h-2 rounded-full ${colors.pulse} mr-2 animate-pulse`}></div>
                                <span className={`${colors.textLight} text-xs font-mono`}>ONLINE</span>
                              </div>

                              {/* Card title overlay at bottom of image area */}
                              <div className="absolute bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-black/90 to-transparent">
                                <h2 className={`text-3xl font-vt323 ${colors.text} flex items-center`}>
                                  <span className="mr-2 text-xl">{card.icon}</span> {card.title}
                                </h2>
                              </div>
                            </div>

                            {/* Card content area with enhanced styling */}
                            <CardContent className="p-6 relative h-[200px] flex flex-col justify-between bg-gradient-to-b from-black/60 to-black/90">
                              <div>
                                <p className="text-slate-300 text-sm leading-relaxed">{card.description}</p>

                                {/* Technical details section */}
                                <div className="mt-4 grid grid-cols-2 gap-2 text-[10px] font-mono">
                                  <div className={`${colors.text} opacity-70`}>
                                    <div className="uppercase">Status</div>
                                    <div className="text-slate-300">Operational</div>
                                  </div>
                                  <div className={`${colors.text} opacity-70`}>
                                    <div className="uppercase">Access Level</div>
                                    <div className="text-slate-300">Authorized</div>
                                  </div>
                                  <div className={`${colors.text} opacity-70`}>
                                    <div className="uppercase">Last Update</div>
                                    <div className="text-slate-300">Today 08:42</div>
                                  </div>
                                  <div className={`${colors.text} opacity-70`}>
                                    <div className="uppercase">Security</div>
                                    <div className="text-slate-300">Level 3</div>
                                  </div>
                                </div>
                              </div>

                              {/* Action prompt with animated effect */}
                              <div
                                className={`mt-4 ${colors.text} text-xs font-mono flex justify-between items-center border-t border-dashed ${colors.border} pt-3 opacity-80`}
                              >
                                <span>CLEARANCE GRANTED</span>
                                <span className="animate-pulse flex items-center">
                                  ACCESS <span className="ml-1 animate-blink">▶</span>
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      </div>
                    )
                  })}
                </div>

                {/* Enhanced pagination indicators */}
                <div className="flex justify-center mt-6 space-x-2">
                  {cards.map((card, index) => {
                    const colors = colorMap[card.color as keyof typeof colorMap]
                    return (
                      <button
                        key={index}
                        className={cn(
                          "h-2 rounded-full transition-all duration-300",
                          activeCardIndex === index
                            ? `${colors.pulse} w-8`
                            : "bg-green-900/50 hover:bg-green-700/50 w-2",
                        )}
                        onClick={() => scrollToCard(index)}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    )
                  })}
                </div>
              </div>

              <div className="mt-8 p-4 border border-green-900/50 bg-black/50 rounded-md backdrop-blur-sm shadow-lg shadow-green-900/10">
                <div className="flex items-center mb-2">
                  <Terminal className="h-4 w-4 text-green-500 mr-2" />
                  <h3 className="text-green-400 font-mono text-sm">TERMINAL STATUS</h3>
                </div>
                <div className="text-xs text-green-500/80 space-y-1">
                  <p>&gt; System operational. All modules functioning within normal parameters.</p>
                  <p>&gt; WARNING: Unauthorized access attempts detected from sector 7.</p>
                  <p>&gt; Security protocols engaged. Tracing origin...</p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Button
                  variant="outline"
                  className="border-green-900 text-green-500 hover:bg-green-900/20 hover:text-green-400 shadow-md shadow-green-900/10"
                >
                  EMERGENCY PROTOCOLS
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Terminal component with open/close functionality */}
        {isTerminalOpen && <TerminalComponent isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />}

        {/* Terminal button */}
        <div className="fixed bottom-4 left-4 z-40">
          <button
            className="bg-black/90 border border-green-900/50 text-green-500 hover:bg-green-900/20 hover:text-green-400 px-4 py-2 rounded flex items-center space-x-2 shadow-lg shadow-green-900/20"
            onClick={() => setIsTerminalOpen(true)}
          >
            <Command className="h-4 w-4" />
            <span>Open Terminal</span>
          </button>
        </div>
      </div>
    </>
  )
}

