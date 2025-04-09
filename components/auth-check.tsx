"use client"

import type React from "react"
import Image from "next/image"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Loader2 } from "lucide-react"
import Navigation from "@/components/navigation"
import ScrollingNotificationBar from "@/components/scrolling-notification-bar"
import MusicPlayer from "@/components/music-player"
import NightmareDialogueWrapper from "@/components/nightmare-dialogue-wrapper"
import MusicVisualizer from "@/components/music-visualizer"
import GlitchEffect from "@/components/glitch-effect"

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isGM, setIsGM] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = () => {
      try {
        const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true"
        const userIsGM = sessionStorage.getItem("isGM") === "true"

        setIsAuthenticated(isLoggedIn)
        setIsGM(userIsGM)

        // If not logged in and not on login page, redirect to login
        if (!isLoggedIn && pathname !== "/login") {
          router.push("/login")
        }

        // If logged in and on login page, redirect to appropriate dashboard
        if (isLoggedIn && pathname === "/login") {
          if (userIsGM) {
            router.push("/gm-dashboard")
          } else {
            router.push("/")
          }
        }

        // If not GM but trying to access GM pages
        if (isLoggedIn && !userIsGM && pathname.startsWith("/gm-")) {
          router.push("/")
        }
      } catch (error) {
        console.error("Error checking authentication:", error)
        // In case of error, allow access
        setIsAuthenticated(true)
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [pathname, router])

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 text-green-500 animate-spin mb-4" />
          <p className="text-green-500/70 text-sm">INITIALIZING SYSTEM...</p>
        </div>
      </div>
    )
  }

  // If on login page, render only the login page without navigation or other components
  if (pathname === "/login") {
    return <>{children}</>
  }

  // If on GM dashboard pages and authenticated as GM, render without regular navigation
  if (pathname.startsWith("/gm-dashboard") && isAuthenticated && isGM) {
    return <>{children}</>
  }

  // If authenticated, render the full layout with navigation and other components
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col relative">
        <div className="absolute inset-0 z-0">
          <div className="fixed inset-0 w-full h-full">
            <Image 
              src="/background.gif" 
              alt="Background" 
              fill 
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        </div>
        <header className="border-b border-green-900/50 bg-black/70 backdrop-blur-sm sticky top-0 z-50 relative">
          <div className="w-full px-4 py-3 flex justify-between items-center">
            <div className="flex items-center">
              <GlitchEffect>
                <h1 className="text-3xl md:text-4xl font-vt323 text-green-500">NOVATERRA</h1>
              </GlitchEffect>
              <div className="ml-2 h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
            </div>
            <div className="text-xs md:text-sm font-mono text-green-400 opacity-70">
              <span className="hidden sm:inline">SYSTEM:</span> ONLINE
            </div>
          </div>
        </header>

        {/* Add the ScrollingNotificationBar here */}
        <div className="sticky top-[53px] z-40">
          <ScrollingNotificationBar />
        </div>

        <div className="flex flex-col md:flex-row flex-1 relative z-10">
          <Navigation />
          <main className="flex-1 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
            <div className="absolute inset-0 bg-noise-pattern opacity-10 pointer-events-none"></div>
            {children}
          </main>

          {/* Right sidebar with music player and visualizer */}
          <div className="md:w-64 lg:w-72 border-l border-green-900/50 bg-black/50 backdrop-blur-sm hidden md:flex flex-col">
            <div className="p-3 border-b border-green-900/30 flex-shrink-0">
              <MusicPlayer />
            </div>
            <div className="p-3 border-b border-green-900/30 flex-shrink-0">
              <MusicVisualizer />
            </div>
          </div>
        </div>

        <footer className="border-t border-green-900/50 py-3 text-center text-xs text-green-500/70 bg-black backdrop-blur-sm relative z-10">
          <div className="container mx-auto px-4">
            <p>NOVATERRA TERMINAL v2.4.3 // AUTHORIZED ACCESS ONLY</p>
            <p className="mt-1">© {new Date().getFullYear()} NOVATERRA COMMAND</p>
          </div>
        </footer>

        {/* Nightmare Leviathan Easter Egg */}
        <NightmareDialogueWrapper />
      </div>
    )
  }

  // This should not be reached due to the redirect in useEffect
  return null
}

