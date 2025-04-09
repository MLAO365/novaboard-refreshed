"use client"

import { useEffect, useState } from "react"
import { AlertTriangle, Info } from "lucide-react"
import { cn } from "@/lib/utils"

interface NotificationItem {
  id: number
  text: string
  type: "info" | "alert" | "warning"
}

export default function ScrollingNotificationBar() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: 1, text: "BREAKING: Bandit fleets detected near Research Station Omega", type: "alert" },
    { id: 2, text: "Supply convoy scheduled to arrive at Central Hub on April 14th, 2025", type: "info" },
    { id: 3, text: "Security alert: Unauthorized NPC's were spotted in Barley's Trading Post", type: "warning" },
    { id: 4, text: "New bounty posted: The Ghost - 200,000 CR - Last seen in Crimson Nebula", type: "info" },
    { id: 5, text: "Fuel prices for all ships have increased by 15% due to recent pirate activity", type: "info" },
    { id: 6, text: "URGENT: All ships advised to avoid Designated Zone 9 due to radiation storm", type: "alert" },
    { id: 7, text: "All the times and dates have been adjusted to your timezone, which is EST! If this is incorrect, please let your developer know.", type: "info" },
  ])

  const [scrollPosition, setScrollPosition] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Calculate total width of all notifications
  const getNotificationWidth = () => {
    const notificationElement = document.getElementById("scrolling-notifications")
    return notificationElement ? notificationElement.scrollWidth : 0
  }

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (!isPaused) {
        setScrollPosition((prev) => {
          const totalWidth = getNotificationWidth()
          const containerWidth = window.innerWidth

          // Reset position when all notifications have scrolled past
          if (prev > totalWidth) {
            return -containerWidth
          }

          return prev + 1 // Scroll speed
        })
      }
    }, 30) // Update interval

    return () => clearInterval(scrollInterval)
  }, [isPaused])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="h-3 w-3 text-red-500 mr-2 flex-shrink-0" />
      case "warning":
        return <AlertTriangle className="h-3 w-3 text-yellow-500 mr-2 flex-shrink-0" />
      default:
        return <Info className="h-3 w-3 text-blue-500 mr-2 flex-shrink-0" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "alert":
        return "text-red-400"
      case "warning":
        return "text-yellow-400"
      default:
        return "text-blue-400"
    }
  }

  return (
    <div
      className="bg-black/80 border-b border-green-900/30 py-1 overflow-hidden relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        id="scrolling-notifications"
        className="whitespace-nowrap font-mono text-xs flex items-center"
        style={{ transform: `translateX(-${scrollPosition}px)` }}
      >
        {notifications.map((notification, index) => (
          <div key={notification.id} className={cn("inline-flex items-center px-4", getTypeColor(notification.type))}>
            {getTypeIcon(notification.type)}
            <span>{notification.text}</span>
            {index < notifications.length - 1 && <span className="mx-6 text-green-500/50">•</span>}
          </div>
        ))}

        {/* Duplicate the notifications to create a seamless loop */}
        {notifications.map((notification, index) => (
          <div
            key={`duplicate-${notification.id}`}
            className={cn("inline-flex items-center px-4", getTypeColor(notification.type))}
          >
            {getTypeIcon(notification.type)}
            <span>{notification.text}</span>
            {index < notifications.length - 1 && <span className="mx-6 text-green-500/50">•</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

