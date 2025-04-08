"use client"

import { useState, useEffect } from "react"
import { X, AlertTriangle, Info, Bell, Skull, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Notification {
  id: number
  title: string
  message: string
  type: "info" | "warning" | "bounty" | "stock" | "security"
  timestamp: Date
}

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [showNotifications, setShowNotifications] = useState(false)

  // Sample notifications to simulate incoming alerts
  const sampleNotifications = [
    {
      title: "New Bounty Available",
      message: "Target: Rogue AI in Designated Zone 7",
      type: "bounty" as const,
    },
    {
      title: "Stock Alert",
      message: "Fuel Cells inventory below 30%",
      type: "stock" as const,
    },
    {
      title: "Security Alert",
      message: "Unauthorized access attempt detected",
      type: "security" as const,
    },
    {
      title: "System Update",
      message: "Database synchronization complete",
      type: "info" as const,
    },
    {
      title: "Travel Advisory",
      message: "Increased pirate activity in Crimson Nebula",
      type: "warning" as const,
    },
  ]

  // Simulate incoming notifications
  useEffect(() => {
    // Add initial notification
    setTimeout(() => {
      const initialNotification = {
        id: Date.now(),
        title: "System Connected",
        message: "Welcome to Novaterra Information Hub",
        type: "info" as const,
        timestamp: new Date(),
      }
      setNotifications([initialNotification])

      // Play notification sound
      const audio = new Audio("/notification.mp3")
      audio.volume = 0.3
      audio.play().catch((e) => console.log("Audio play prevented:", e))
    }, 3000)

    // Add security alert notification after a delay
    setTimeout(() => {
      const securityNotification = {
        id: Date.now(),
        title: "ALERT: Unknown Fleet Detected",
        message: "Unidentified fleet movement near Research Station Omega",
        type: "security" as const,
        timestamp: new Date(),
      }
      setNotifications((prev) => [securityNotification, ...prev])

      // Play notification sound
      const audio = new Audio("/alert.mp3")
      audio.volume = 0.3
      audio.play().catch((e) => console.log("Audio play prevented:", e))
    }, 15000)

    // Random notifications
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        const randomNotification = sampleNotifications[Math.floor(Math.random() * sampleNotifications.length)]
        const newNotification = {
          id: Date.now(),
          ...randomNotification,
          timestamp: new Date(),
        }

        setNotifications((prev) => {
          // Keep only the last 5 notifications
          const updated = [newNotification, ...prev]
          return updated.slice(0, 5)
        })

        // Play notification sound
        const audio = new Audio("/notification.mp3")
        audio.volume = 0.3
        audio.play().catch((e) => console.log("Audio play prevented:", e))
      }
    }, 45000) // Every 45 seconds

    return () => clearInterval(interval)
  }, [])

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "bounty":
        return <Skull className="h-4 w-4 text-red-500" />
      case "stock":
        return <Package className="h-4 w-4 text-purple-500" />
      case "security":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Info className="h-4 w-4 text-green-500" />
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <>
      {/* Notification bell */}
      <Button
        variant="ghost"
        size="icon"
        className="relative text-slate-400 hover:text-slate-100 fixed top-4 right-20 z-50"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <Bell className="h-5 w-5" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
        )}
      </Button>

      {/* Notification panel */}
      <div
        className={cn(
          "fixed top-16 right-4 w-80 bg-black/90 border border-green-900/50 rounded-md z-50 transition-all duration-300 transform",
          showNotifications ? "translate-x-0 opacity-100" : "translate-x-full opacity-0",
        )}
      >
        <div className="p-3 border-b border-green-900/50 flex items-center justify-between">
          <div className="text-sm font-mono text-green-500 flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            NOTIFICATIONS
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-green-500 hover:text-green-400 hover:bg-green-900/20"
            onClick={() => setShowNotifications(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="p-3 border-b border-green-900/20 hover:bg-green-900/10 transition-colors relative"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 absolute top-2 right-2 text-slate-500 hover:text-slate-300 hover:bg-transparent"
                  onClick={() => removeNotification(notification.id)}
                >
                  <X className="h-3 w-3" />
                </Button>

                <div className="flex items-start">
                  <div className="mt-0.5 mr-2">{getNotificationIcon(notification.type)}</div>
                  <div>
                    <div className="text-sm font-medium text-slate-300">{notification.title}</div>
                    <div className="text-xs text-slate-400 mt-1">{notification.message}</div>
                    <div className="text-xs text-slate-500 mt-1">{formatTime(notification.timestamp)}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-slate-400 text-sm">No notifications</div>
          )}
        </div>
      </div>

      {/* Toast notifications */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2 pointer-events-none">
        {notifications.slice(0, 1).map((notification) => (
          <div
            key={`toast-${notification.id}`}
            className="bg-black/90 border border-green-900/50 p-3 rounded-md max-w-xs animate-slideIn pointer-events-auto"
            style={{ animationDuration: "0.5s" }}
          >
            <div className="flex items-start">
              <div className="mt-0.5 mr-2">{getNotificationIcon(notification.type)}</div>
              <div className="flex-1">
                <div className="text-sm font-medium text-slate-300">{notification.title}</div>
                <div className="text-xs text-slate-400 mt-1">{notification.message}</div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 text-slate-500 hover:text-slate-300 hover:bg-transparent -mt-1 -mr-1"
                onClick={() => removeNotification(notification.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

