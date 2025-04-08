"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Skull, Map, MessageSquare, Package, Users, Calendar, Award, LogOut, Settings, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import GlitchText from "@/components/glitch-text"

export default function GMDashboard() {
  const router = useRouter()
  const [lastActivity] = useState(new Date().toLocaleString())
  const [isGMLoggedIn, setIsGMLoggedIn] = useState(false); // Add state for GM login

  useEffect(() => {
    const loggedIn = sessionStorage.getItem('isGMLoggedIn') === 'true';
    setIsGMLoggedIn(loggedIn);

    if (!loggedIn) {
      router.push('/gm-login'); // Redirect to login if not logged in
    }
  }, [router]);

  const handleLogout = () => {
    try {
      sessionStorage.removeItem("isGMLoggedIn");
      sessionStorage.removeItem("gmUsername");
      sessionStorage.removeItem("gmLevel");
      sessionStorage.removeItem("gmPermissions");
    } catch (error) {
      console.error("Error logging out:", error)
    }

    router.push("/gm-login")
  }

  // Get GM username from session storage
  const getGMUsername = () => {
    try {
      return sessionStorage.getItem("gmUsername") || "Game Master"
    } catch (error) {
      return "Game Master"
    }
  }

  const adminModules = [
    {
      title: "Bounty Board",
      description: "Manage active bounties and rewards",
      icon: Skull,
      color: "text-red-500",
      bgColor: "bg-red-900/20",
      borderColor: "border-red-900/50",
      path: "/gm-dashboard/bounties",
    },
    {
      title: "Interactive Map",
      description: "Update locations and points of interest",
      icon: Map,
      color: "text-blue-500",
      bgColor: "bg-blue-900/20",
      borderColor: "border-blue-900/50",
      path: "/gm-dashboard/map",
    },
    {
      title: "Announcements",
      description: "Post news and lore updates",
      icon: MessageSquare,
      color: "text-green-500",
      bgColor: "bg-green-900/20",
      borderColor: "border-green-900/50",
      path: "/gm-dashboard/announcements",
    },
    {
      title: "Stock System",
      description: "Adjust market prices and availability",
      icon: Package,
      color: "text-purple-500",
      bgColor: "bg-purple-900/20",
      borderColor: "border-purple-900/50",
      path: "/gm-dashboard/stock",
    },
    {
      title: "Factions",
      description: "Manage NPC and player factions",
      icon: Users,
      color: "text-orange-500",
      bgColor: "bg-orange-900/20",
      borderColor: "border-orange-900/50",
      path: "/gm-dashboard/factions",
    },
    {
      title: "Events",
      description: "Schedule and manage special events",
      icon: Calendar,
      color: "text-pink-500",
      bgColor: "bg-pink-900/20",
      borderColor: "border-pink-900/50",
      path: "/gm-dashboard/events",
    },
    {
      title: "Achievements",
      description: "Create and assign player achievements",
      icon: Award,
      color: "text-yellow-500",
      bgColor: "bg-yellow-900/20",
      borderColor: "border-yellow-900/50",
      path: "/gm-dashboard/achievements",
    },
    {
      title: "System Settings",
      description: "Configure global system parameters",
      icon: Settings,
      color: "text-slate-400",
      bgColor: "bg-slate-900/20",
      borderColor: "border-slate-900/50",
      path: "/gm-dashboard/settings",
    },
  ]

  if (!isGMLoggedIn) {
    return <p>Redirecting to login...</p>;
  }

  return (
    <div className="min-h-screen bg-black text-slate-200">
      {/* Header */}
      <header className="border-b border-red-900/50 bg-black/70 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <GlitchText>
              <h1 className="text-3xl font-vt323 text-red-500">NOVATERRA GM</h1>
            </GlitchText>
            <div className="ml-2 h-3 w-3 rounded-full bg-red-500 animate-pulse"></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs md:text-sm font-mono text-red-400 opacity-70">
              <span className="hidden sm:inline">GM:</span> {getGMUsername()}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-red-900/50 text-red-400 hover:bg-red-900/20 hover:text-red-300"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              LOGOUT
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-vt323 text-red-400 mb-2">GAME MASTER CONTROL PANEL</h2>
          <p className="text-slate-400 text-sm">
            Welcome to the Novaterra GM dashboard. From here, you can manage all aspects of the Novaterra universe.
          </p>
        </div>

        {/* System status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-black/50 border-red-900/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-red-400 text-lg">System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-xs text-slate-500">Database</div>
                    <div className="text-xs text-green-400">Online</div>
                  </div>
                  <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: "95%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-xs text-slate-500">API</div>
                    <div className="text-xs text-green-400">Operational</div>
                  </div>
                  <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: "100%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-xs text-slate-500">Storage</div>
                    <div className="text-xs text-yellow-400">72% Free</div>
                  </div>
                  <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 rounded-full" style={{ width: "72%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-red-900/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-red-400 text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Last login</span>
                  <span>{lastActivity}</span>
                </div>
                <div className="flex justify-between">
                  <span>Last announcement</span>
                  <span>2 days ago</span>
                </div>
                <div className="flex justify-between">
                  <span>Last bounty update</span>
                  <span>12 hours ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-red-900/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-red-400 text-lg">Player Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-full">
                <BarChart className="h-16 w-16 text-red-500/50" />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full border-red-900/30 text-red-400/70">
                View Detailed Stats
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Admin modules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminModules.map((module) => (
            <Link key={module.title} href={module.path}>
              <Card
                className={`bg-black/50 ${module.borderColor} hover:border-opacity-80 transition-colors cursor-pointer group overflow-hidden h-full`}
              >
                <CardContent className="p-6 relative">
                  <div
                    className={`absolute inset-0 ${module.bgColor} opacity-0 group-hover:opacity-100 transition-opacity`}
                  ></div>
                  <module.icon className={`h-8 w-8 ${module.color} mb-4`} />
                  <CardTitle className={`text-xl font-vt323 ${module.color} mb-2`}>{module.title}</CardTitle>
                  <CardDescription className="text-slate-400">{module.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}