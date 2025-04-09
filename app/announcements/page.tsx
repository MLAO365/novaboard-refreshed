"use client"

import { useState } from "react"
import { MessageSquare, Calendar, User, Radio, AlertCircle, Search } from "lucide-react"
import { Button, Card, CardContent, Badge, Input, Tabs, TabsList, TabsTrigger } from "@/components/ui"
import GlitchText from "@/components/glitch-text"
import PageHeader from "@/components/page-header"

// Announcements array with both the system update and the new alert
const announcements = [
  {
    id: "ann-001",
    title: "All Dashboards Released to Players",
    content:
      "We're excited to announce that all dashboards have been successfully released to all players. You now have full access to monitor your gameplay statistics, track your progress, and customize your experience. If you encounter any issues with dashboard functionality, please report them to your admin",
    date: "2024-04-03",
    author: "Novaterra Staff",
    type: "announcement",
    category: "system",
  },
  {
    id: "ann-002",
    title: "⚠️ Incoming Demonic Warships Approaching Sky Citadel",
    content:
      "This is a critical alert to all residents and guardians of the Sky Citadel: multiple demonic warships have been sighted on the outer rim of the celestial defense perimeter. Prepare all defensive wards, rally strike units, and ensure all civilians are guided to the underground sanctums. The threat is imminent—this is not a drill.",
    date: "2025-04-07",
    author: "Sky Citadel Command",
    type: "alert",
    category: "system",
  },
  {
    id: "ann-003",
    title: "Stock Market Now Live at Trading Outposts",
    content:
      "The Novaterra Stock Market has officially launched! Visit any Trading Outpost to interact with our StockBrokers (NPCs) who will assist you in buying and managing your stock portfolio. This new feature allows you to invest in various companies and assets across the Novaterra universe. Start your investment journey today!",
    date: "2025-04-08",
    author: "Novaterra Financial Services",
    type: "announcement",
    category: "system",
  },
]

// Utility functions for icons and badges
const getTypeIcon = (type: string) => {
  switch (type) {
    case "alert":
      return <AlertCircle className="h-5 w-5 text-red-500" />
    case "announcement":
      return <Radio className="h-5 w-5 text-blue-500" />
    case "episode":
      return <MessageSquare className="h-5 w-5 text-purple-500" />
    case "transmission":
      return <Radio className="h-5 w-5 text-yellow-500" />
    default:
      return <MessageSquare className="h-5 w-5 text-green-500" />
  }
}

const getTypeBadge = (type: string) => {
  switch (type) {
    case "alert":
      return <Badge className="bg-red-900/50 text-red-400 border-red-500/50">ALERT</Badge>
    case "announcement":
      return <Badge className="bg-blue-900/50 text-blue-400 border-blue-500/50">ANNOUNCEMENT</Badge>
    case "episode":
      return <Badge className="bg-purple-900/50 text-purple-400 border-purple-500/50">EPISODE</Badge>
    case "transmission":
      return <Badge className="bg-yellow-900/50 text-yellow-400 border-yellow-500/50">TRANSMISSION</Badge>
    default:
      return <Badge className="bg-green-900/50 text-green-400 border-green-500/50">UPDATE</Badge>
  }
}

export default function AnnouncementsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredAnnouncements = announcements.filter(
    (announcement) =>
      (announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        announcement.content.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (activeCategory === "all" || announcement.category === activeCategory),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="ANNOUNCEMENTS & UPDATES"
        subtitle="Latest news from across the Novaterra universe"
        icon={<MessageSquare className="h-6 w-6 text-green-500" />}
        accentColor="green"
      />

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Search announcements..."
            className="pl-10 bg-black/50 border-green-900/50 text-slate-300 placeholder:text-slate-600 focus:border-green-500/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full sm:w-auto">
            <TabsList className="bg-black/50 border border-green-900/50 w-full sm:w-auto">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-green-900/30 data-[state=active]:text-green-400"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="system"
                className="data-[state=active]:bg-green-900/30 data-[state=active]:text-green-400"
              >
                System
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="space-y-6">
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map((announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))
        ) : (
          <div className="text-center py-12">
            <div className="text-green-500 mb-2">No announcements found matching your criteria.</div>
            <Button
              variant="outline"
              className="border-green-900/50 text-green-400 hover:bg-green-900/20"
              onClick={() => {
                setSearchTerm("")
                setActiveCategory("all")
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

function AnnouncementCard({ announcement }: { announcement: any }) {
  const [expanded, setExpanded] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card
      className={`bg-black/50 border-green-900/50 hover:border-green-500/30 transition-colors overflow-hidden ${announcement.type === "alert" ? "border-l-4 border-l-red-500" : announcement.type === "transmission" ? "border-l-4 border-l-yellow-500" : ""}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="mt-1">{getTypeIcon(announcement.type)}</div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
              <GlitchText>
                <h3 className="text-xl font-vt323 text-green-500">{announcement.title}</h3>
              </GlitchText>
              <div className="flex items-center gap-2 mt-1 sm:mt-0">{getTypeBadge(announcement.type)}</div>
            </div>

            <div className="flex items-center text-xs text-slate-500 mb-3 gap-4">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {formatDate(announcement.date)}
              </div>
              <div className="flex items-center">
                <User className="h-3 w-3 mr-1" />
                {announcement.author}
              </div>
            </div>

            <div
              className={`text-sm text-slate-400 ${!expanded && announcement.content.length > 300 ? "line-clamp-3" : ""}`}
            >
              {announcement.content}
            </div>

            {announcement.content.length > 300 && (
              <Button variant="link" className="text-green-500 p-0 h-auto mt-2" onClick={() => setExpanded(!expanded)}>
                {expanded ? "Show Less" : "Read More"}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
