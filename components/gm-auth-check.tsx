"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function GMAuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if GM is logged in
    const checkAuth = () => {
      try {
        const isGMLoggedIn = sessionStorage.getItem("isGMLoggedIn") === "true"
        setIsAuthenticated(isGMLoggedIn)

        // If not logged in and on a GM page, redirect to GM login
        if (!isGMLoggedIn && pathname.startsWith("/gm-")) {
          router.push("/gm-login")
        }
      } catch (error) {
        console.error("Error checking GM authentication:", error)
        // In case of error, deny access
        setIsAuthenticated(false)
        router.push("/gm-login")
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
          <Loader2 className="h-8 w-8 text-red-500 animate-spin mb-4" />
          <p className="text-red-500/70 text-sm">INITIALIZING GM SYSTEM...</p>
        </div>
      </div>
    )
  }

  // If authenticated, render the children
  if (isAuthenticated) {
    return <>{children}</>
  }

  // This should not be reached due to the redirect in useEffect
  return null
}

