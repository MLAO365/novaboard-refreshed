import type React from "react"
import { cn } from "@/lib/utils"
import GlitchText from "@/components/glitch-text"

interface PageHeaderProps {
  title: string
  subtitle: string
  icon: React.ReactNode
  accentColor: "red" | "blue" | "green" | "purple" | "cyan" | "yellow"
}

export default function PageHeader({ title, subtitle, icon, accentColor = "green" }: PageHeaderProps) {
  const getAccentColor = () => {
    switch (accentColor) {
      case "red":
        return "border-red-900/50"
      case "blue":
        return "border-blue-900/50"
      case "green":
        return "border-green-900/50"
      case "purple":
        return "border-purple-900/50"
      case "cyan":
        return "border-cyan-900/50"
      case "yellow":
        return "border-yellow-900/50"
      default:
        return "border-green-900/50"
    }
  }

  return (
    <div className={cn("mb-8 pb-4 border-b", getAccentColor())}>
      <div className="flex items-center mb-2">
        <div className="mr-3">{icon}</div>
        <GlitchText>
          <h1
            className={cn(
              "text-3xl font-vt323",
              accentColor === "red" && "text-red-500",
              accentColor === "blue" && "text-blue-500",
              accentColor === "green" && "text-green-500",
              accentColor === "purple" && "text-purple-500",
              accentColor === "cyan" && "text-cyan-500",
              accentColor === "yellow" && "text-yellow-500",
            )}
          >
            {title}
          </h1>
        </GlitchText>
      </div>
      <p className="text-slate-400 max-w-3xl">{subtitle}</p>
    </div>
  )
}

