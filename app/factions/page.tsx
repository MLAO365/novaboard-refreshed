"use client"

import { useState } from "react"
import { Users, Search, Filter, Shield, Skull, Briefcase, Zap, FlaskRoundIcon as Flask, Flag } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import PageHeader from "@/components/page-header"
import GlitchText from "@/components/glitch-text"

// Sample faction data
const factionData = [
  // NPC Factions
  {
    id: "faction-001",
    name: "Nova Bounty Association",
    description:
      "The official military and peacekeeping force of Novaterra. Responsible for maintaining order and protecting citizens from external threats.",
    leader: "Admiral Kaine",
    headquarters: "Central Hub",
    color: "blue",
    icon: Shield,
    status: "hostile",
    type: "npc",
    influence: 85,
    territories: ["Central Hub", "Military District", "Orbital Defense Platform"],
    specialization: "Military Operations",
  },
  {
    id: "faction-002",
    name: "Shadow Syndicate",
    description:
      "A powerful criminal organization that controls much of the black market. Deals in contraband, weapons, and illegal technology.",
    leader: "Unknown",
    headquarters: "Black Market District",
    color: "red",
    icon: Skull,
    status: "neutral",
    type: "npc",
    influence: 65,
    territories: ["Black Market District", "Undercity", "Smuggler's Bay"],
    specialization: "Black Market Operations",
  },
  {
    id: "faction-003",
    name: "Commerce Guild",
    description:
      "Controls trade routes and regulates commerce throughout Novaterra. Wields significant economic and political influence.",
    leader: "Director Voss",
    headquarters: "Luxury District",
    color: "green",
    icon: Briefcase,
    status: "neutral",
    type: "npc",
    influence: 75,
    territories: ["Luxury District", "Trade Hub", "Financial Center"],
    specialization: "Economic Control",
  },
  {
    id: "faction-004",
    name: "Freedom Coalition & The Rogue Collective",
    description:
      "A loose alliance of rebels, bandits, rogue bounty hunters, and freedom fighters opposing what they see as corrupt governance. Operates primarily from the Outer Rim.",
    leader: "Commander Tsu",
    headquarters: "Outer Rim Territories",
    color: "yellow",
    icon: Flag,
    status: "hostile",
    type: "npc",
    influence: 45,
    territories: ["Outer Rim Territories", "Abandoned Outposts", "Rebel Hideouts"],
    specialization: "Guerrilla Operations",
  },
  {
    id: "faction-005",
    name: "T-5000",
    description:
      "Oversees all scientific research and development. Enforces strict regulations on AI, genetic engineering, and other advanced technologies.",
    leader: "Chief Scientist Lin",
    headquarters: "Research Station Gamma",
    color: "purple",
    icon: Flask,
    status: "neutral",
    type: "npc",
    influence: 70,
    territories: ["Research Station Gamma", "Bio-Engineering Complex", "Quantum Computing Center"],
    specialization: "Scientific Research",
  }
]

export default function FactionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  // Filter factions based on search query and filters
  const filteredFactions = factionData.filter((faction) => {
    // Filter by tab (all, npc, player)
    if (activeTab !== "all" && faction.type !== activeTab) return false

    // Filter by search query
    if (
      searchQuery &&
      !faction.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !faction.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false

    // Filter by status
    if (statusFilter !== "all" && faction.status !== statusFilter) return false

    // Filter by type
    if (typeFilter !== "all" && faction.type !== typeFilter) return false

    return true
  })

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

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "npc":
        return <Badge className="bg-purple-900/50 text-purple-400 border-purple-500/50">NPC</Badge>
      case "player":
        return <Badge className="bg-green-900/50 text-green-400 border-green-500/50">PLAYER</Badge>
      default:
        return <Badge className="bg-slate-900/50 text-slate-400 border-slate-500/50">UNKNOWN</Badge>
    }
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
      case "indigo":
        return "text-indigo-500"
      case "amber":
        return "text-amber-500"
      case "slate":
        return "text-slate-400"
      case "violet":
        return "text-violet-500"
      case "emerald":
        return "text-emerald-500"
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
      case "indigo":
        return "border-indigo-900/50"
      case "amber":
        return "border-amber-900/50"
      case "slate":
        return "border-slate-900/50"
      case "violet":
        return "border-violet-900/50"
      case "emerald":
        return "border-emerald-900/50"
      default:
        return "border-slate-900/50"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="FACTION DATABASE"
        subtitle="Information on all known factions in Novaterra"
        icon={<Users className="h-6 w-6 text-orange-500" />}
        accentColor="yellow"
      />

      <div className="mt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-black/50 border border-orange-900/50 w-full sm:w-auto">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-orange-900/30 data-[state=active]:text-orange-400"
            >
              All Factions
            </TabsTrigger>
            <TabsTrigger
              value="npc"
              className="data-[state=active]:bg-purple-900/30 data-[state=active]:text-purple-400"
            >
              NPC Factions
            </TabsTrigger>
            <TabsTrigger
              value="player"
              className="data-[state=active]:bg-green-900/30 data-[state=active]:text-green-400"
            >
              Player Factions
            </TabsTrigger>
          </TabsList>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-orange-500/50" />
              <Input
                type="text"
                placeholder="Search factions..."
                className="pl-9 bg-black/50 border-orange-900/50 text-orange-50 placeholder:text-orange-500/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px] bg-black/50 border-orange-900/50 text-orange-50">
                  <Filter className="h-4 w-4 mr-2 text-orange-500" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-orange-900/50">
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="allied">Allied</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                  <SelectItem value="suspicious">Suspicious</SelectItem>
                  <SelectItem value="hostile">Hostile</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[140px] bg-black/50 border-orange-900/50 text-orange-50">
                  <Filter className="h-4 w-4 mr-2 text-orange-500" />
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-orange-900/50">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="npc">NPC</SelectItem>
                  <SelectItem value="player">Player</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value={activeTab} className="mt-6">
            {filteredFactions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredFactions.map((faction) => (
                  <Card
                    key={faction.id}
                    className={`bg-black/50 ${getFactionBorderColor(faction.color)} hover:border-${faction.color}-500/30 transition-colors`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div
                            className={`h-8 w-8 rounded-full bg-${faction.color}-900/50 flex items-center justify-center mr-3`}
                          >
                            <faction.icon className={`h-4 w-4 ${getFactionIconColor(faction.color)}`} />
                          </div>
                          <div>
                            <GlitchText>
                              <CardTitle className={`text-lg font-vt323 ${getFactionIconColor(faction.color)}`}>
                                {faction.name}
                              </CardTitle>
                            </GlitchText>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {getStatusBadge(faction.status)}
                          {getTypeBadge(faction.type)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-sm text-slate-400 mb-4">{faction.description}</p>

                      <div className="mb-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-500">INFLUENCE</span>
                          <span className={getFactionIconColor(faction.color)}>{faction.influence}/100</span>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${getFactionIconColor(faction.color)}`}
                            style={{ width: `${faction.influence}%` }}
                          />
                        </div>
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
                        <div>
                          <span className="text-slate-500">SPECIALIZATION:</span>
                          <span className="text-slate-300 ml-1">{faction.specialization}</span>
                        </div>
                        {faction.type === "player" && (
                          <div>
                            <span className="text-slate-500">MEMBERS:</span>
                            <span className="text-slate-300 ml-1">{(faction as any).memberCount}</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-3">
                        <div className="text-xs text-slate-500 mb-1">TERRITORIES:</div>
                        <div className="flex flex-wrap gap-1">
                          {faction.territories.map((territory, index) => (
                            <Badge key={index} className="bg-black/50 text-slate-400 border-slate-500/50">
                              {territory}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 border border-orange-900/30 rounded-md bg-black/30">
                <Users className="h-12 w-12 text-orange-500/30 mx-auto mb-4" />
                <h3 className="text-lg font-vt323 text-orange-400 mb-2">No Factions Found</h3>
                <p className="text-slate-400 max-w-md mx-auto">
                  No factions match your current search criteria. Try adjusting your filters or search query.
                </p>
                <Button
                  variant="outline"
                  className="mt-4 border-orange-900/50 text-orange-400 hover:bg-orange-900/20"
                  onClick={() => {
                    setSearchQuery("")
                    setStatusFilter("all")
                    setTypeFilter("all")
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

