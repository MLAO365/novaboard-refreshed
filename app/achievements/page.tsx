"use client"

import { useState } from "react"
import {
  Award,
  Search,
  Filter,
  Lock,
  Check,
  Star,
  Zap,
  Skull,
  Crosshair,
  Shield,
  Ship,
  Rocket,
  Target,
  Bomb,
  Flame,
  Compass,
  Radar,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import PageHeader from "@/components/page-header"
import GlitchText from "@/components/glitch-text"

// Sample achievements data
const achievementsData = [
  {
    id: "ach-001",
    title: "First Blood",
    description: "Eliminate your first enemy ship.",
    reward: 500,
    category: "combat",
    difficulty: "easy",
    status: "completed",
    icon: Crosshair,
  },
  {
    id: "ach-002",
    title: "Ambush Predator",
    description: "Successfully ambush an enemy in a nebula cloud.",
    reward: 1000,
    category: "stealth",
    difficulty: "medium",
    status: "completed",
    icon: Ship,
  },
  {
    id: "ach-003",
    title: "Plague Spreader",
    description: "Eliminate 10 ships without taking hull damage.",
    reward: 2000,
    category: "combat",
    difficulty: "hard",
    status: "completed",
    icon: Skull,
  },
  {
    id: "ach-004",
    title: "Ghost Protocol",
    description: "Complete a mission without being detected by hostile ships.",
    reward: 1500,
    category: "stealth",
    difficulty: "medium",
    status: "completed",
    icon: Shield,
  },
  {
    id: "ach-005",
    title: "Reaper's Harvest",
    description: "Eliminate 50 enemy ships across the Novaterra Universe.",
    reward: 5000,
    category: "combat",
    difficulty: "hard",
    status: "in-progress",
    icon: Skull,
  },
  {
    id: "ach-006",
    title: "Ship Scavenger",
    description: "Salvage components from 25 destroyed enemy vessels.",
    reward: 3000,
    category: "exploration",
    difficulty: "medium",
    status: "in-progress",
    icon: Ship,
  },
  {
    id: "ach-007",
    title: "Black Market Kingpin",
    description: "Sell 100,000 credits worth of illegal salvage on the black market.",
    reward: 2500,
    category: "commerce",
    difficulty: "medium",
    status: "in-progress",
    icon: Skull,
  },
  {
    id: "ach-008",
    title: "Fleet Commander",
    description: "Command a fleet of 5 ships simultaneously in combat.",
    reward: 7500,
    category: "leadership",
    difficulty: "expert",
    status: "locked",
    icon: Ship,
    requirement: "Reach Captain Rank 5",
  },
  {
    id: "ach-009",
    title: "Notorious Pirate",
    description: "Become wanted throughout the Novaterra Universe with a bounty exceeding 50,000 credits.",
    reward: 10000,
    category: "infamy",
    difficulty: "expert",
    status: "locked",
    icon: Skull,
    requirement: "Complete 'Reaper's Harvest' achievement",
  },
  {
    id: "ach-010",
    title: "System Domination",
    description: "Control a significant region of the Novaterra Universe by eliminating all opposition.",
    reward: 15000,
    category: "leadership",
    difficulty: "expert",
    status: "locked",
    icon: Crosshair,
    requirement: "Reach maximum reputation with Shadow Syndicate",
  },
  {
    id: "ach-011",
    title: "The Plague",
    description:
      "Become so feared throughout the Novaterra Universe that enemy ships attempt to flee upon your arrival.",
    reward: 20000,
    category: "infamy",
    difficulty: "legendary",
    status: "locked",
    icon: Skull,
    requirement: "Complete all combat achievements",
  },
  {
    id: "ach-012",
    title: "Void Sovereign",
    description: "Defeat a capital ship single-handedly without taking critical damage.",
    reward: 25000,
    category: "combat",
    difficulty: "legendary",
    status: "locked",
    icon: Ship,
    requirement: "Complete 'The Plague' achievement",
  },
  // New achievements
  {
    id: "ach-013",
    title: "Boarding Party",
    description: "Successfully board and capture an enemy vessel without destroying it.",
    reward: 3500,
    category: "combat",
    difficulty: "hard",
    status: "in-progress",
    icon: Rocket,
  },
  {
    id: "ach-014",
    title: "Ace Pilot",
    description: "Destroy 5 enemy ships in a single engagement without taking damage.",
    reward: 4000,
    category: "combat",
    difficulty: "hard",
    status: "in-progress",
    icon: Target,
  },
  {
    id: "ach-015",
    title: "Weapons Specialist",
    description: "Upgrade all weapon systems on your ship to maximum level.",
    reward: 5000,
    category: "equipment",
    difficulty: "medium",
    status: "in-progress",
    icon: Crosshair,
  },
  {
    id: "ach-016",
    title: "Shield Master",
    description: "Survive an engagement with 3 or more enemy ships without shield failure.",
    reward: 3000,
    category: "defense",
    difficulty: "medium",
    status: "completed",
    icon: Shield,
  },
  {
    id: "ach-017",
    title: "Bounty Hunter",
    description: "Complete 10 bounty hunting missions successfully.",
    reward: 4500,
    category: "combat",
    difficulty: "medium",
    status: "in-progress",
    icon: Target,
  },
  {
    id: "ach-018",
    title: "Smuggler's Run",
    description: "Successfully transport illegal cargo through heavily patrolled areas of the Novaterra Universe.",
    reward: 3500,
    category: "stealth",
    difficulty: "hard",
    status: "in-progress",
    icon: Rocket,
  },
  {
    id: "ach-019",
    title: "Asteroid Ace",
    description: "Navigate through an asteroid field at maximum speed without taking damage.",
    reward: 2500,
    category: "piloting",
    difficulty: "hard",
    status: "locked",
    icon: Compass,
    requirement: "Upgrade engines to Tier 3",
  },
  {
    id: "ach-020",
    title: "Demolition Expert",
    description: "Destroy a space station or large installation.",
    reward: 8000,
    category: "combat",
    difficulty: "expert",
    status: "locked",
    icon: Bomb,
    requirement: "Acquire heavy ordnance weapons",
  },
  {
    id: "ach-021",
    title: "Lone Wolf",
    description: "Complete 20 missions without any allies or fleet support.",
    reward: 5000,
    category: "combat",
    difficulty: "hard",
    status: "in-progress",
    icon: Ship,
  },
  {
    id: "ach-022",
    title: "Salvage King",
    description: "Collect over 100,000 credits worth of salvage in a single expedition.",
    reward: 6000,
    category: "exploration",
    difficulty: "medium",
    status: "locked",
    icon: Radar,
    requirement: "Upgrade cargo hold to maximum capacity",
  },
  {
    id: "ach-023",
    title: "Scorched Space",
    description: "Leave no survivors in 10 consecutive hostile encounters.",
    reward: 7500,
    category: "infamy",
    difficulty: "expert",
    status: "locked",
    icon: Flame,
    requirement: "Complete 'Reaper's Harvest' achievement",
  },
  {
    id: "ach-024",
    title: "Untouchable",
    description: "Complete a full combat mission without taking any damage to your ship.",
    reward: 4000,
    category: "piloting",
    difficulty: "hard",
    status: "in-progress",
    icon: Shield,
  },
]

export default function AchievementsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [difficultyFilter, setDifficultyFilter] = useState("all")

  // Calculate total achievements and completion stats
  const totalAchievements = achievementsData.length
  const completedAchievements = achievementsData.filter((ach) => ach.status === "completed").length
  const inProgressAchievements = achievementsData.filter((ach) => ach.status === "in-progress").length
  const lockedAchievements = achievementsData.filter((ach) => ach.status === "locked").length
  const completionPercentage = Math.round((completedAchievements / totalAchievements) * 100)

  // Calculate total rewards
  const earnedRewards = achievementsData
    .filter((ach) => ach.status === "completed")
    .reduce((total, ach) => total + ach.reward, 0)

  const potentialRewards = achievementsData
    .filter((ach) => ach.status !== "completed")
    .reduce((total, ach) => total + ach.reward, 0)

  // Filter achievements based on search query and filters
  const filteredAchievements = achievementsData.filter((achievement) => {
    // Filter by search query
    if (
      searchQuery &&
      !achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !achievement.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false

    // Filter by category
    if (categoryFilter !== "all" && achievement.category !== categoryFilter) return false

    // Filter by status
    if (statusFilter !== "all" && achievement.status !== statusFilter) return false

    // Filter by difficulty
    if (difficultyFilter !== "all" && achievement.difficulty !== difficultyFilter) return false

    return true
  })

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return <Badge className="bg-green-900/50 text-green-400 border-green-500/50">EASY</Badge>
      case "medium":
        return <Badge className="bg-blue-900/50 text-blue-400 border-blue-500/50">MEDIUM</Badge>
      case "hard":
        return <Badge className="bg-orange-900/50 text-orange-400 border-orange-500/50">HARD</Badge>
      case "expert":
        return <Badge className="bg-red-900/50 text-red-400 border-red-500/50">EXPERT</Badge>
      case "legendary":
        return <Badge className="bg-purple-900/50 text-purple-400 border-purple-500/50">LEGENDARY</Badge>
      default:
        return <Badge className="bg-slate-900/50 text-slate-400 border-slate-500/50">UNKNOWN</Badge>
    }
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "combat":
        return <Badge className="bg-red-900/50 text-red-400 border-red-500/50">COMBAT</Badge>
      case "stealth":
        return <Badge className="bg-slate-900/50 text-slate-400 border-slate-500/50">STEALTH</Badge>
      case "exploration":
        return <Badge className="bg-cyan-900/50 text-cyan-400 border-cyan-500/50">EXPLORATION</Badge>
      case "leadership":
        return <Badge className="bg-indigo-900/50 text-indigo-400 border-indigo-500/50">LEADERSHIP</Badge>
      case "commerce":
        return <Badge className="bg-green-900/50 text-green-400 border-green-500/50">COMMERCE</Badge>
      case "infamy":
        return <Badge className="bg-purple-900/50 text-purple-400 border-purple-500/50">INFAMY</Badge>
      case "equipment":
        return <Badge className="bg-yellow-900/50 text-yellow-400 border-yellow-500/50">EQUIPMENT</Badge>
      case "defense":
        return <Badge className="bg-blue-900/50 text-blue-400 border-blue-500/50">DEFENSE</Badge>
      case "piloting":
        return <Badge className="bg-cyan-900/50 text-cyan-400 border-cyan-500/50">PILOTING</Badge>
      default:
        return <Badge className="bg-slate-900/50 text-slate-400 border-slate-500/50">MISC</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <Check className="h-5 w-5 text-green-500" />
      case "in-progress":
        return <Zap className="h-5 w-5 text-yellow-500" />
      case "locked":
        return <Lock className="h-5 w-5 text-slate-500" />
      default:
        return <Award className="h-5 w-5 text-slate-500" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="ACHIEVEMENT SYSTEM"
        subtitle="Track your progress and earn rewards"
        icon={<Award className="h-6 w-6 text-yellow-500" />}
        accentColor="yellow"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <Card className="bg-black/50 border-yellow-900/50">
          <CardContent className="p-4 flex items-center">
            <div className="h-12 w-12 rounded-full bg-yellow-900/30 flex items-center justify-center mr-4">
              <Award className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <div className="text-sm text-slate-500">Total Achievements</div>
              <div className="text-2xl font-vt323 text-yellow-400">{totalAchievements}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-yellow-900/50">
          <CardContent className="p-4 flex items-center">
            <div className="h-12 w-12 rounded-full bg-green-900/30 flex items-center justify-center mr-4">
              <Check className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <div className="text-sm text-slate-500">Completion Rate</div>
              <div className="text-2xl font-vt323 text-green-400">{completionPercentage}%</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-yellow-900/50">
          <CardContent className="p-4 flex items-center">
            <div className="h-12 w-12 rounded-full bg-blue-900/30 flex items-center justify-center mr-4">
              <Star className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <div className="text-sm text-slate-500">Earned Rewards</div>
              <div className="text-2xl font-vt323 text-blue-400">{earnedRewards.toLocaleString()}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-yellow-900/50">
          <CardContent className="p-4 flex items-center">
            <div className="h-12 w-12 rounded-full bg-purple-900/30 flex items-center justify-center mr-4">
              <Zap className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <div className="text-sm text-slate-500">Potential Rewards</div>
              <div className="text-2xl font-vt323 text-purple-400">{potentialRewards.toLocaleString()}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-yellow-500/50" />
          <Input
            type="text"
            placeholder="Search achievements..."
            className="pl-9 bg-black/50 border-yellow-900/50 text-yellow-50 placeholder:text-yellow-500/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[140px] bg-black/50 border-yellow-900/50 text-yellow-50">
              <Filter className="h-4 w-4 mr-2 text-yellow-500" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-black/90 border-yellow-900/50">
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="combat">Combat</SelectItem>
              <SelectItem value="stealth">Stealth</SelectItem>
              <SelectItem value="exploration">Exploration</SelectItem>
              <SelectItem value="leadership">Leadership</SelectItem>
              <SelectItem value="commerce">Commerce</SelectItem>
              <SelectItem value="infamy">Infamy</SelectItem>
              <SelectItem value="equipment">Equipment</SelectItem>
              <SelectItem value="defense">Defense</SelectItem>
              <SelectItem value="piloting">Piloting</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px] bg-black/50 border-yellow-900/50 text-yellow-50">
              <Filter className="h-4 w-4 mr-2 text-yellow-500" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-black/90 border-yellow-900/50">
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="locked">Locked</SelectItem>
            </SelectContent>
          </Select>

          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-[140px] bg-black/50 border-yellow-900/50 text-yellow-50">
              <Filter className="h-4 w-4 mr-2 text-yellow-500" />
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent className="bg-black/90 border-yellow-900/50">
              <SelectItem value="all">All Difficulties</SelectItem>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
              <SelectItem value="expert">Expert</SelectItem>
              <SelectItem value="legendary">Legendary</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-6">
        {filteredAchievements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAchievements.map((achievement) => (
              <Card
                key={achievement.id}
                className={`bg-black/50 border-yellow-900/50 ${
                  achievement.status === "locked" ? "opacity-70" : "hover:border-yellow-500/30"
                } transition-colors`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`h-12 w-12 rounded-full flex items-center justify-center ${
                        achievement.status === "completed"
                          ? "bg-green-900/30"
                          : achievement.status === "in-progress"
                            ? "bg-yellow-900/30"
                            : "bg-slate-900/30"
                      }`}
                    >
                      {getStatusIcon(achievement.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <GlitchText>
                          <h3
                            className={`text-lg font-vt323 ${
                              achievement.status === "completed"
                                ? "text-green-400"
                                : achievement.status === "in-progress"
                                  ? "text-yellow-400"
                                  : "text-slate-400"
                            }`}
                          >
                            {achievement.title}
                          </h3>
                        </GlitchText>
                        <div className="flex gap-2">
                          {getCategoryBadge(achievement.category)}
                          {getDifficultyBadge(achievement.difficulty)}
                        </div>
                      </div>

                      <p className="text-sm text-slate-400 mb-3">{achievement.description}</p>

                      {achievement.status === "locked" && achievement.requirement && (
                        <div className="flex items-center mb-3 text-xs text-slate-500">
                          <Lock className="h-3 w-3 mr-1 text-slate-500" />
                          <span>Requirement: {achievement.requirement}</span>
                        </div>
                      )}

                      <div className="flex items-center text-xs">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 mr-1 text-yellow-500" />
                          <span className="text-slate-500 mr-1">REWARD:</span>
                          <span className="text-yellow-400">{achievement.reward.toLocaleString()} credits</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 border border-yellow-900/30 rounded-md bg-black/30">
            <Award className="h-12 w-12 text-yellow-500/30 mx-auto mb-4" />
            <h3 className="text-lg font-vt323 text-yellow-400 mb-2">No Achievements Found</h3>
            <p className="text-slate-400 max-w-md mx-auto">
              No achievements match your current search criteria. Try adjusting your filters or search query.
            </p>
            <Button
              variant="outline"
              className="mt-4 border-yellow-900/50 text-yellow-400 hover:bg-yellow-900/20"
              onClick={() => {
                setSearchQuery("")
                setCategoryFilter("all")
                setStatusFilter("all")
                setDifficultyFilter("all")
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

