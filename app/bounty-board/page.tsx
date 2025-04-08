"use client"

import { useState } from "react"
import { Search, Skull, AlertTriangle, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GlitchText from "@/components/glitch-text"
import PageHeader from "@/components/page-header"

// Sample bounty data
const bounties = [
  {
    id: "B-7291",
    target: "Captain Malakai",
    type: "Player",
    amount: 250000,
    description:
      "Wanted for piracy, theft of military-grade weapons, and destruction of Nova Fleet vessels. Last seen in the Crimson Nebula. Approach with extreme caution.",
    status: "active",
    danger: "high",
    lastSeen: "Crimson Nebula Center",
    postedBy: "Novaterra Bounty Association",
    image: "https://files.catbox.moe/ukv2j6.jpg",
  },
  {
    id: "B-L3V1A",
    target: "Plaguedoc",
    type: "Player",
    amount: 4000000,
    description:
      "Responsible for the killings of many bandit ships and NPC's across the game so far. They also have eliminated multiple players at once which makes them a high profile target. They are very destructive and appear to have also killed the former leader of The Sky Citadel and helped Integrasx94 with tasks.",
    status: "active",
    danger: "extreme",
    lastSeen: "The Sky Citadel",
    postedBy: "Novaterra Bounty Association",
    image: "https://files.catbox.moe/eaai5s.webp",
  },
  {
    id: "B-5872",
    target: "Nexus Infiltrator Sienna",
    type: "NPC",
    amount: 150000,
    description:
      "AI construct that has breached multiple secure systems. Responsible for data theft and system sabotage. Reward for information leading to neutralization.",
    status: "active",
    danger: "medium",
    lastSeen: "The Sky Citadel",
    postedBy: "Novaterra Bounty Association",
    image: "https://files.catbox.moe/0jet5y.jpg",
  },
  {
    id: "B-8103",
    target: "Valkyrae",
    type: "NPC",
    amount: 350000,
    description:
      "Wanted for being associated with Plague Doc and operating by her side, last reported by bandits at a trading outpost.",
    status: "active",
    danger: "high",
    lastSeen: "The Sky Citadel",
    postedBy: "Novaterra Bounty Association",
    image: "https://files.catbox.moe/90x8xj.jpg",
  },
  {
    id: "B-4519",
    target: "M3LINA",
    type: "Player",
    amount: 100000,
    description: "Assassinated a well recognized NPC leader in a trading outpost station",
    status: "active",
    danger: "extreme",
    lastSeen: "One of the trading outposts",
    postedBy: "Novaterra Bounty Association",
    image: "https://files.catbox.moe/lht87q.gif",
  },
  {
    id: "B-9274",
    target: "Rogue Scientist Dr. Nova",
    type: "NPC",
    amount: 450000,
    description:
      "Creator of illegal AI technology & Viruses. Responsible for multiple AI uprisings and subsequent casualties. Approach with caution.",
    status: "active",
    danger: "low",
    lastSeen: "Abandoned Research Facility",
    postedBy: "Novaterra Bounty Association",
    image: "https://files.catbox.moe/eoglnk.png",
  },
  {
    id: "B-3651",
    target: "The Ghost",
    type: "Player",
    amount: 200000,
    description:
      "Master thief responsible for stealing priceless artifacts from multiple museums and private collections. Known for leaving no trace.",
    status: "active",
    danger: "low",
    lastSeen: "Luxury District",
    postedBy: "Novaterra Bounty Association",
    image: "https://files.catbox.moe/42u5my.jpg",
  },
  // New bounties added below
  {
    id: "B-6723",
    target: "Commander Vex",
    type: "NPC",
    amount: 750000,
    description:
      "Former military commander who defected with classified intel on Novaterra defense systems. Highly trained in combat tactics and known to have a network of loyal followers.",
    status: "active",
    danger: "high",
    lastSeen: "Players Spawn Point",
    postedBy: "Novaterra Bounty Association",
    image: "https://files.catbox.moe/aivebp.jpg",
  },
  {
    id: "B-9981",
    target: "The Twins",
    type: "NPC",
    amount: 300000,
    description:
      "Pair of synthetic humanoids responsible for a series of precision heists targeting quantum technology. Always operate in tandem and share a neural link.",
    status: "active",
    danger: "low",
    lastSeen: "Barley's Trading Outpost",
    postedBy: "Novaterra Bounty Association",
    image: "https://files.catbox.moe/cbdc85.jpg",
  },
  {
    id: "B-2277",
    target: "Whisper",
    type: "Player",
    amount: 180000,
    description:
      "Information broker who has compromised multiple secure networks. Known for blackmailing officials and selling state secrets to the highest bidder.",
    status: "active",
    danger: "medium",
    lastSeen: "Players Spawn Point",
    postedBy: "Novaterra Bounty Association",
    image: "https://files.catbox.moe/fxc2dh.jpg",
  },
  {
    id: "B-8844",
    target: "Chronos",
    type: "NPC",
    amount: 2500000,
    description:
      "Rogue time manipulator who has caused multiple temporal anomalies. Suspected of attempting to alter key historical events in the Novaterra timeline.",
    status: "active",
    danger: "extreme",
    lastSeen: "Temporal Research Station",
    postedBy: "Chronological Preservation Authority",
    image: "https://files.catbox.moe/pll7nk.jpg",
  },
  {
    id: "B-3399",
    target: "MX-180",
    type: "Player",
    amount: 1200000,
    description:
      "A notorious thief who steals from NPC's and controls a significant portion of the black market and has infiltrated multiple legitimate businesses.",
    status: "active",
    danger: "high",
    lastSeen: "Barley's trading outpost.",
    postedBy: "Integrasx94",
    image: "https://files.catbox.moe/wiqhnz.jpg",
  },
  {
    id: "B-7755",
    target: "Eclipse",
    type: "NPC",
    amount: 650000,
    description:
      "Energy-based entity that has absorbed and corrupted multiple power grids. Responsible for citywide blackouts and the destruction of three fusion reactors.",
    status: "active",
    danger: "high",
    lastSeen: "Players Spawn Point",
    postedBy: "Novaterra Bounty Association",
    image: "https://files.catbox.moe/05e5rv.jpg",
  },
  {
    id: "B-1122",
    target: "ShisuiDreams",
    type: "Player",
    amount: 900000,
    description:
      "A player who got their hands on illegal reality-warping technology at the start of the game. Has created multiple unstable pocket that can lure demonds anywhere.",
    status: "active",
    danger: "medium",
    lastSeen: "The Sky Citadel",
    postedBy: "The Rogue Collective",
    image: "https://files.catbox.moe/0qr672.jpg",
  },
  // New bounty for Integrasx94
  {
    id: "B-4278",
    target: "Integrasx94",
    type: "Player",
    amount: 2800000,
    description:
      "Captain of the Celestial Dominion, known for her ruthless efficiency in eliminating bandit groups across multiple areas. Wanted for unauthorized executions and disrupting the criminal underworld power balance. Extremely dangerous.",
    status: "active",
    danger: "high",
    lastSeen: "The Sky Citadel",
    postedBy: "The Rogue Collective",
    image: "https://files.catbox.moe/n0ko01.gif", // Using placeholder image, replace with actual image when available
  },
]

const getDangerBadge = (danger: string) => {
  switch (danger) {
    case "low":
      return <Badge className="bg-blue-900/50 text-blue-400 border-blue-500/50">LOW</Badge>
    case "medium":
      return <Badge className="bg-yellow-900/50 text-yellow-400 border-yellow-500/50">MEDIUM</Badge>
    case "high":
      return <Badge className="bg-red-900/50 text-red-400 border-red-500/50">HIGH</Badge>
    case "extreme":
      return <Badge className="bg-purple-900/50 text-purple-400 border-purple-500/50 animate-pulse">EXTREME</Badge>
    default:
      return <Badge className="bg-slate-900/50 text-slate-400 border-slate-500/50">UNKNOWN</Badge>
  }
}

export default function BountyBoard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"amount" | "danger">("amount")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const filteredBounties = bounties.filter(
    (bounty) =>
      bounty.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bounty.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bounty.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedBounties = [...filteredBounties].sort((a, b) => {
    if (sortBy === "amount") {
      return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount
    } else {
      const dangerLevel = { low: 1, medium: 2, high: 3, extreme: 4 }
      const aDanger = dangerLevel[a.danger as keyof typeof dangerLevel]
      const bDanger = dangerLevel[b.danger as keyof typeof dangerLevel]
      return sortOrder === "asc" ? aDanger - bDanger : bDanger - aDanger
    }
  })

  const toggleSort = (field: "amount" | "danger") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("desc")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="BOUNTY BOARD"
        subtitle="Active bounties across the Novaterra universe"
        icon={<Skull className="h-6 w-6 text-red-500" />}
        accentColor="red"
      />

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Search bounties..."
            className="pl-10 bg-black/50 border-red-900/50 text-slate-300 placeholder:text-slate-600 focus:border-red-500/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-red-900/50 text-slate-400 hover:bg-red-900/20 hover:text-red-400"
            onClick={() => toggleSort("amount")}
          >
            <ArrowUpDown className="h-4 w-4 mr-1" />
            Reward {sortBy === "amount" && (sortOrder === "asc" ? "↑" : "↓")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-red-900/50 text-slate-400 hover:bg-red-900/20 hover:text-red-400"
            onClick={() => toggleSort("danger")}
          >
            <AlertTriangle className="h-4 w-4 mr-1" />
            Danger {sortBy === "danger" && (sortOrder === "asc" ? "↑" : "↓")}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="bg-black/50 border border-red-900/50">
          <TabsTrigger value="all" className="data-[state=active]:bg-red-900/30 data-[state=active]:text-red-400">
            All Bounties
          </TabsTrigger>
          <TabsTrigger value="players" className="data-[state=active]:bg-red-900/30 data-[state=active]:text-red-400">
            Players
          </TabsTrigger>
          <TabsTrigger value="npcs" className="data-[state=active]:bg-red-900/30 data-[state=active]:text-red-400">
            NPCs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-1 gap-4">
            {sortedBounties.map((bounty) => (
              <BountyCard key={bounty.id} bounty={bounty} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="players" className="mt-4">
          <div className="grid grid-cols-1 gap-4">
            {sortedBounties
              .filter((b) => b.type === "Player")
              .map((bounty) => (
                <BountyCard key={bounty.id} bounty={bounty} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="npcs" className="mt-4">
          <div className="grid grid-cols-1 gap-4">
            {sortedBounties
              .filter((b) => b.type === "NPC")
              .map((bounty) => (
                <BountyCard key={bounty.id} bounty={bounty} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="text-center text-xs text-red-500/70 mt-8">
        <p>NOTICE: All bounty hunters must register with local authorities before pursuing targets.</p>
        <p>Unauthorized pursuit may result in legal action. Bounty Board updated daily at 00:00 GST.</p>
      </div>
    </div>
  )
}

function BountyCard({ bounty }: { bounty: any }) {
  return (
    <Card className="bg-black/50 border-red-900/50 hover:border-red-500/30 transition-colors overflow-hidden group">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-40 h-40 bg-red-900/20 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <img
              src={bounty.image || "/placeholder.svg"}
              alt={bounty.target}
              className="h-32 w-32 object-cover filter grayscale group-hover:grayscale-0 transition-all"
            />
            <div className="absolute bottom-1 left-1 right-1 text-center">
              <div className="text-xs text-red-500/70">{bounty.id}</div>
            </div>
          </div>

          <div className="flex-1 p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
              <div>
                <GlitchText>
                  <h3 className="text-xl font-vt323 text-red-500">{bounty.target}</h3>
                </GlitchText>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="bg-black/50 text-slate-400 border-slate-700/50">
                    {bounty.type}
                  </Badge>
                  {getDangerBadge(bounty.danger)}
                </div>
              </div>
              <div className="mt-2 md:mt-0 text-right">
                <div className="text-xs text-slate-500">REWARD</div>
                <div className="text-xl font-vt323 text-green-500">{bounty.amount.toLocaleString()} CR</div>
              </div>
            </div>

            <p className="text-sm text-slate-400 mb-3">{bounty.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs">
              <div className="flex items-center">
                <span className="text-slate-500 mr-1">LAST SEEN:</span>
                <span className="text-slate-300">{bounty.lastSeen}</span>
              </div>
              <div className="flex items-center">
                <span className="text-slate-500 mr-1">POSTED BY:</span>
                <span className="text-slate-300">{bounty.postedBy}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

