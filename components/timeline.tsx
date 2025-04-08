"use client"

import { useState } from "react"
import { Clock, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import GlitchText from "@/components/glitch-text"

// Sample timeline events
const timelineEvents = [
  {
    id: "event-001",
    date: "2187-04-12",
    title: "Region 7 Lockdown",
    description: "Unidentified threat detected in Region 7. All access restricted until further notice.",
    category: "security",
    importance: "high",
  },
  {
    id: "event-002",
    date: "2187-04-10",
    title: "New Trade Routes Established",
    description:
      "The Commerce Guild has established new trade routes connecting the Outer Rim Territories with the Central Hub.",
    category: "economy",
    importance: "medium",
  },
  {
    id: "event-003",
    date: "2187-04-08",
    title: "Commander Valkyrae Sighting",
    description: "Wanted fugitive Commander Valkyrae spotted in the Outer Rim Territories. Security forces dispatched.",
    category: "security",
    importance: "high",
  },
  {
    id: "event-004",
    date: "2187-04-05",
    title: "AI Restrictions Implemented",
    description: "New restrictions on artificial intelligence development and deployment following recent incidents.",
    category: "technology",
    importance: "medium",
  },
  {
    id: "event-005",
    date: "2187-04-03",
    title: "Mysterious Transmission Received",
    description: "Encrypted transmission from unknown source claiming responsibility for the Region 9 outbreak.",
    category: "security",
    importance: "high",
  },
  {
    id: "event-006",
    date: "2187-04-01",
    title: "Research Station Discovery",
    description: "Abandoned research station found with evidence of illegal experiments. Investigation ongoing.",
    category: "science",
    importance: "medium",
  },
  {
    id: "event-007",
    date: "2187-03-28",
    title: "Resource Shortage Warning",
    description: "Several essential resources in short supply due to supply chain disruptions. Rationing implemented.",
    category: "economy",
    importance: "high",
  },
  {
    id: "event-008",
    date: "2187-03-25",
    title: "Digital Network Breach",
    description: "Major security breach in the Digital Network Hub. Systems temporarily offline for security audit.",
    category: "technology",
    importance: "critical",
  },
  {
    id: "event-009",
    date: "2187-03-20",
    title: "Luxury District Gala",
    description:
      "Annual gala held in the Luxury District. High-profile attendees included government officials and corporate leaders.",
    category: "social",
    importance: "low",
  },
  {
    id: "event-010",
    date: "2187-03-15",
    title: "Pirate Activity Increase",
    description: "Significant increase in pirate activity reported in the Crimson Nebula. Travel advisory issued.",
    category: "security",
    importance: "medium",
  },
]

export default function Timeline() {
  const [expanded, setExpanded] = useState(false)
  const [filter, setFilter] = useState<string | null>(null)

  const displayEvents = expanded ? timelineEvents : timelineEvents.slice(0, 5)

  const filteredEvents = filter ? displayEvents.filter((event) => event.category === filter) : displayEvents

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "security":
        return <Badge className="bg-red-900/50 text-red-400 border-red-500/50">SECURITY</Badge>
      case "economy":
        return <Badge className="bg-green-900/50 text-green-400 border-green-500/50">ECONOMY</Badge>
      case "technology":
        return <Badge className="bg-blue-900/50 text-blue-400 border-blue-500/50">TECHNOLOGY</Badge>
      case "science":
        return <Badge className="bg-purple-900/50 text-purple-400 border-purple-500/50">SCIENCE</Badge>
      case "social":
        return <Badge className="bg-yellow-900/50 text-yellow-400 border-yellow-500/50">SOCIAL</Badge>
      default:
        return <Badge className="bg-slate-900/50 text-slate-400 border-slate-500/50">OTHER</Badge>
    }
  }

  const getImportanceIndicator = (importance: string) => {
    switch (importance) {
      case "critical":
        return <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></div>
      case "high":
        return <div className="h-3 w-3 rounded-full bg-red-500"></div>
      case "medium":
        return <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
      case "low":
        return <div className="h-3 w-3 rounded-full bg-green-500"></div>
      default:
        return <div className="h-3 w-3 rounded-full bg-slate-500"></div>
    }
  }

  return (
    <Card className="bg-black/50 border-green-900/50">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-green-500 font-vt323 flex items-center text-base">
          <Clock className="h-5 w-5 mr-2 text-green-500" />
          EVENT TIMELINE
        </CardTitle>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className={`h-7 px-2 border-green-900/50 hover:bg-green-900/20 ${filter === null ? "text-green-400" : "text-slate-400"}`}
            onClick={() => setFilter(null)}
          >
            All
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`h-7 px-2 border-green-900/50 hover:bg-green-900/20 ${filter === "security" ? "text-red-400" : "text-slate-400"}`}
            onClick={() => setFilter("security")}
          >
            Security
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`h-7 px-2 border-green-900/50 hover:bg-green-900/20 ${filter === "economy" ? "text-green-400" : "text-slate-400"}`}
            onClick={() => setFilter("economy")}
          >
            Economy
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`h-7 px-2 border-green-900/50 hover:bg-green-900/20 ${filter === "technology" ? "text-blue-400" : "text-slate-400"}`}
            onClick={() => setFilter("technology")}
          >
            Tech
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="relative border-l border-green-900/50 ml-4 mt-2 mb-2 space-y-8">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div key={event.id} className="ml-6">
                <div className="absolute -left-1.5 mt-1.5">{getImportanceIndicator(event.importance)}</div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                  <GlitchText>
                    <h3 className="text-base font-vt323 text-green-500">{event.title}</h3>
                  </GlitchText>
                  <div className="flex items-center gap-2 mt-1 sm:mt-0">
                    <time className="text-xs font-mono text-green-500/70">{event.date}</time>
                    {getCategoryBadge(event.category)}
                  </div>
                </div>
                <p className="text-sm text-slate-400">{event.description}</p>
              </div>
            ))
          ) : (
            <div className="ml-6 py-4 text-center">
              <p className="text-slate-400">No events match the selected filter.</p>
              <Button variant="link" className="text-green-500 p-0 h-auto mt-2" onClick={() => setFilter(null)}>
                Show all events
              </Button>
            </div>
          )}
        </div>

        <div className="text-center mt-4">
          <Button
            variant="ghost"
            className="text-green-500 hover:text-green-400 hover:bg-green-900/20"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-2" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-2" />
                Show More
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

