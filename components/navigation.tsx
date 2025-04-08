"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Command,
  Skull,
  Map,
  MessageSquare,
  Package,
  Menu,
  X,
  Terminal,
  Users,
  Calendar,
  Award,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import StockMarket from "@/components/stock-market"

export default function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const routes = [
    {
      name: "COMMAND",
      path: "/",
      icon: Command,
      color: "text-slate-400",
    },
    {
      name: "FACTIONS",
      path: "/factions",
      icon: Users,
      color: "text-orange-500",
    },
    {
      name: "BOUNTY BOARD",
      path: "/bounty-board",
      icon: Skull,
      color: "text-red-500",
    },
    {
      name: "MAP",
      path: "/map",
      icon: Map,
      color: "text-blue-500",
    },
    {
      name: "ANNOUNCEMENTS",
      path: "/announcements",
      icon: MessageSquare,
      color: "text-green-500",
    },
    {
      name: "STOCK SYSTEM",
      path: "/stock-system",
      icon: Package,
      color: "text-purple-500",
    },
    {
      name: "EVENTS",
      path: "/events",
      icon: Calendar,
      color: "text-pink-500",
    },
    {
      name: "ACHIEVEMENTS",
      path: "/achievements",
      icon: Award,
      color: "text-yellow-500",
    },
  ]

  const handleLogout = () => {
    try {
      sessionStorage.removeItem("isLoggedIn")
      sessionStorage.removeItem("username")
      sessionStorage.removeItem("isGM")
    } catch (error) {
      console.error("Error logging out:", error)
    }

    router.push("/login")
  }

  // Get username from session storage
  const getUsername = () => {
    try {
      return sessionStorage.getItem("username") || "User"
    } catch (error) {
      return "User"
    }
  }

  // Check if user is a GM
  const isGM = () => {
    try {
      return sessionStorage.getItem("isGM") === "true"
    } catch (error) {
      return false
    }
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full bg-black border-green-900 text-green-500 hover:bg-green-900/20 hover:text-green-400"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile navigation */}
      <div
        className={cn(
          "fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center md:hidden transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <nav className="flex flex-col items-center space-y-4 w-full px-8 max-h-[80vh] overflow-y-auto py-8">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center w-full py-3 px-4 rounded-md transition-colors",
                pathname === route.path
                  ? "bg-green-900/20 text-green-400 border border-green-900/50"
                  : "text-slate-400 hover:text-green-400 hover:bg-green-900/10",
              )}
            >
              <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
              <span className="font-mono text-lg">{route.name}</span>
            </Link>
          ))}

          {/* GM Dashboard link for mobile (only visible to GMs) */}
          {isGM() && (
            <Link
              href="/gm-dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center w-full py-3 px-4 rounded-md transition-colors text-red-400 hover:text-red-300 hover:bg-red-900/10 border border-red-900/50"
            >
              <Terminal className="h-5 w-5 mr-3 text-red-500" />
              <span className="font-mono text-lg">GM DASHBOARD</span>
            </Link>
          )}

          <Button
            variant="outline"
            className="flex items-center w-full py-3 px-4 rounded-md transition-colors text-red-400 hover:text-red-300 hover:bg-red-900/10 border-red-900/50 mt-4"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-3 text-red-500" />
            <span className="font-mono text-lg">LOGOUT</span>
          </Button>
        </nav>
      </div>

      {/* Desktop navigation */}
      <div className="hidden md:block w-64 border-r border-green-900/50 bg-black/90 backdrop-blur-sm h-screen overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-6 px-2">
            <Terminal className="h-5 w-5 text-green-500" />
            <div className="text-sm font-mono text-green-400">NAVIGATION</div>
          </div>

          <nav className="space-y-2">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  "flex items-center w-full py-2 px-3 rounded-md transition-colors",
                  pathname === route.path
                    ? "bg-green-900/20 text-green-400 border border-green-900/50"
                    : "text-slate-400 hover:text-green-400 hover:bg-green-900/10",
                )}
              >
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                <span className="font-mono text-sm">{route.name}</span>
              </Link>
            ))}

            {/* GM Dashboard link (only visible to GMs) */}
            {isGM() && (
              <Link
                href="/gm-dashboard"
                className="flex items-center w-full py-2 px-3 rounded-md transition-colors text-red-400 hover:text-red-300 hover:bg-red-900/10 border border-red-900/50 mt-2"
              >
                <Terminal className="h-5 w-5 mr-3 text-red-500" />
                <span className="font-mono text-sm">GM DASHBOARD</span>
              </Link>
            )}
          </nav>
        </div>

        <div className="mt-8 p-4 border-t border-green-900/30">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs text-green-500/70 font-mono">LOGGED IN AS</div>
            <div className="text-sm text-green-400 font-mono">{getUsername()}</div>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-full border-red-900/50 text-red-400 hover:bg-red-900/20 hover:text-red-300"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            LOGOUT
          </Button>
        </div>

        <div className="mt-4 p-4 border-t border-green-900/30">
          <div className="text-xs text-green-500/70 font-mono mb-2">SYSTEM STATUS</div>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="text-xs text-slate-500">Network</div>
                <div className="text-xs text-green-400">Online</div>
              </div>
              <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: "92%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="text-xs text-slate-500">Security</div>
                <div className="text-xs text-green-400">Active</div>
              </div>
              <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: "85%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="text-xs text-slate-500">Database</div>
                <div className="text-xs text-yellow-400">Syncing</div>
              </div>
              <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 rounded-full" style={{ width: "75%" }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Market Analysis Section */}
        <div className="mt-4 p-4 border-t border-green-900/30 max-h-96 overflow-y-auto">
          <StockMarket />
        </div>
      </div>
    </>
  )
}

