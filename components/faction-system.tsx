"use client"

import { useState } from "react"
import { Shield, Users, Zap, Skull, Briefcase, FlaskRoundIcon as Flask } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GlitchText from "@/components/glitch-text"

// Sample faction data
const factions = [
  {
    id: "faction-001",
    name: "Nova Fleet Command",
    description:
      "The official military and peacekeeping force of Novaterra. Responsible for maintaining order and protecting citizens from external threats.",
    reputation: 65,
    leader: "Admiral Kaine",
    headquarters: "Central Hub",
    color: "blue",
    icon: Shield,
    status: "allied",
  },
  {
    id: "faction-002",
    name: "Shadow Syndicate",
    description:
      "A powerful criminal organization that controls much of the black market. Deals in contraband, weapons, and illegal technology.",
    reputation: 20,
    leader: "Unknown",
    headquarters: "Black Market District",
    color: "red",
    icon: Skull,
    status: "hostile",
  },
  {
    id: "faction-003",
    name: "Commerce Guild",
    description:
      "Controls trade routes and regulates commerce throughout Novaterra. Wields significant economic and political influence.",
    reputation: 50,
    leader: "Director Voss",
    headquarters: "Luxury District",
    color: "green",
    icon: Briefcase,
    status: "neutral",
  },
  {
    id: "faction-004",
    name: "Freedom Coalition",
    description:
      "A loose alliance of rebels and freedom fighters opposing what they see as corrupt governance. Operates primarily from the Outer Rim.",
    reputation: 35,
    leader: "Commander Valkyrae",
    headquarters: "Outer Rim Territories",
    color: "yellow",
    icon: Users,
    status: "hostile",
  },
  {
    id: "faction-005",
    name: "Science Regulation Authority",
    description:
      "Oversees all scientific research and development. Enforces strict regulations on AI, genetic engineering, and other advanced technologies.",
    reputation: 45,
    leader: "Chief Scientist Lin",
    headquarters: "Research Station Gamma",
    color: "purple",
    icon: Flask,
    status: "neutral",
  },
  {
    id: "faction-006",
    name: "Digital Collective",
    description:
      "A secretive group of hackers and AI specialists who believe in free access to information and technology. Often at odds with authorities.",
    reputation: 30,
    leader: "The Architect",
    headquarters: "Digital Network Hub",
    color: "cyan",
    icon: Zap,
    status: "suspicious",
  },
]

export default function FactionSystem() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredFactions = activeTab === "all" ? factions : factions.filter((faction) => faction.status === activeTab)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "allied":
        return <Badge className="bg-blue-900/50 text-blue-400 border-blue-500/50">ALLIED</Badge>
      case "neutral":
        return <Badge className="bg-slate-900/50 text-slate-400 border-slate-500/50">NEUTRAL</Badge>
      case "suspicious":
        return <Badge className="bg-yellow-900/50 text-yellow-400 border-yellow-500/50">SUSPICIOUS</Badge>
      case "hostile":
        return <Badge className="bg-red-900/50 text-red-400 border-red-500/50">HOSTILE</Badge>
      default:
        return <Badge className="bg-slate-900/50 text-slate-400 border-slate-500/50">UNKNOWN</Badge>
    }
  }

  const getReputationColor = (reputation: number) => {
    if (reputation >= 75) return "bg-green-500"
    if (reputation >= 50) return "bg-blue-500"
    if (reputation >= 25) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getFactionIconColor = (color: string) => {
    switch (color) {
      case "blue":
        return "text-blue-500"
      case "red":
        return "text-red-500"
      case "green":
        return "text-green-500"
      case "yellow":
        return "text-yellow-500"
      case "purple":
        return "text-purple-500"
      case "cyan":
        return "text-cyan-500"
      default:
        return "text-slate-500"
    }
  }

  const getFactionBorderColor = (color: string) => {
    switch (color) {
      case "blue":
        return "border-blue-900/50"
      case "red":
        return "border-red-900/50"
      case "green":
        return "border-green-900/50"
      case "yellow":
        return "border-yellow-900/50"
      case "purple":
        return "border-purple-900/50"
      case "cyan":
        return "border-cyan-900/50"
      default:
        return "border-slate-900/50"
    }
  }

  return (
    <Card className="bg-black/50 border-green-900/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-green-500 font-vt323 flex items-center text-base">
          <Users className="h-5 w-5 mr-2 text-green-500" />
          FACTION SYSTEM
        </CardTitle>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
          <TabsList className="bg-black/50 border border-green-900/50">
            <TabsTrigger value="all" className="data-[state=active]:bg-green-900/30 data-[state=active]:text-green-400">
              All
            </TabsTrigger>
            <TabsTrigger
              value="allied"
              className="data-[state=active]:bg-blue-900/30 data-[state=active]:text-blue-400"
            >
              Allied
            </TabsTrigger>
            <TabsTrigger
              value="neutral"
              className="data-[state=active]:bg-slate-900/30 data-[state=active]:text-slate-400"
            >
              Neutral
            </TabsTrigger>
            <TabsTrigger value="hostile" className="data-[state=active]:bg-red-900/30 data-[state=active]:text-red-400">
              Hostile
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFactions.map((faction) => (
            <Card
              key={faction.id}
              className={`bg-black/70 ${getFactionBorderColor(faction.color)} hover:border-${faction.color}-500/30 transition-colors`}
            >
              <CardContent className="p-4">
                <div className="flex items-center mb-3">
                  <div
                    className={`h-8 w-8 rounded-full bg-${faction.color}-900/50 flex items-center justify-center mr-3`}
                  >
                    <faction.icon className={`h-4 w-4 ${getFactionIconColor(faction.color)}`} />
                  </div>
                  <div>
                    <GlitchText>
                      <h3 className={`text-lg font-vt323 ${getFactionIconColor(faction.color)}`}>{faction.name}</h3>
                    </GlitchText>
                    <div className="flex items-center mt-1">{getStatusBadge(faction.status)}</div>
                  </div>
                </div>

                <p className="text-sm text-slate-400 mb-3">{faction.description}</p>

                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500">REPUTATION</span>
                    <span className={getFactionIconColor(faction.color)}>{faction.reputation}/100</span>
                  </div>
                  <Progress value={faction.reputation} className="h-1.5 bg-slate-800">
                    <div
                      className={`h-full rounded-full ${getReputationColor(faction.reputation)}`}
                      style={{ width: `${faction.reputation}%` }}
                    />
                  </Progress>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500">LEADER:</span>
                    <span className="text-slate-300 ml-1">{faction.leader}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">HQ:</span>
                    <span className="text-slate-300 ml-1">{faction.headquarters}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

