"use client"

import { useState } from "react"
import { Package, Search, ArrowUpDown, BarChart3, TrendingUp, TrendingDown, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GlitchText from "@/components/glitch-text"
import PageHeader from "@/components/page-header"

// Sample stock data - this would be replaced with the editable data in a real implementation
const stockItems = [
  {
    id: "item-001",
    name: "Medical Supplies",
    category: "essentials",
    currentStock: 75,
    maxStock: 100,
    trend: "stable",
    price: 1200,
    location: "Central Hub",
    lastUpdated: "2187-04-12",
  },
  {
    id: "item-002",
    name: "Ammunition",
    category: "weapons",
    currentStock: 45,
    maxStock: 100,
    trend: "down",
    price: 800,
    location: "Military Outpost",
    lastUpdated: "2187-04-11",
  },
  {
    id: "item-003",
    name: "Fuel Cells",
    category: "resources",
    currentStock: 30,
    maxStock: 100,
    trend: "down",
    price: 1500,
    location: "Docking Station Alpha",
    lastUpdated: "2187-04-10",
  },
  {
    id: "item-004",
    name: "Food Rations",
    category: "essentials",
    currentStock: 85,
    maxStock: 100,
    trend: "up",
    price: 500,
    location: "Central Hub",
    lastUpdated: "2187-04-12",
  },
  {
    id: "item-005",
    name: "Rare Minerals",
    category: "resources",
    currentStock: 15,
    maxStock: 100,
    trend: "up",
    price: 3000,
    location: "Mining Colony Beta",
    lastUpdated: "2187-04-09",
  },
  {
    id: "item-006",
    name: "Advanced Electronics",
    category: "technology",
    currentStock: 60,
    maxStock: 100,
    trend: "stable",
    price: 2500,
    location: "Research Station Gamma",
    lastUpdated: "2187-04-11",
  },
  {
    id: "item-007",
    name: "Cybernetic Implants",
    category: "technology",
    currentStock: 25,
    maxStock: 100,
    trend: "up",
    price: 5000,
    location: "Medical Center",
    lastUpdated: "2187-04-10",
  },
  {
    id: "item-008",
    name: "Luxury Goods",
    category: "special",
    currentStock: 40,
    maxStock: 100,
    trend: "stable",
    price: 7500,
    location: "Luxury District",
    lastUpdated: "2187-04-08",
  },
  {
    id: "item-009",
    name: "Contraband",
    category: "special",
    currentStock: 10,
    maxStock: 100,
    trend: "down",
    price: 10000,
    location: "Black Market District",
    lastUpdated: "2187-04-07",
  },
  {
    id: "item-010",
    name: "Ship Parts",
    category: "resources",
    currentStock: 50,
    maxStock: 100,
    trend: "down",
    price: 2000,
    location: "Docking Station Alpha",
    lastUpdated: "2187-04-11",
  },
]

export default function StockSystemPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"name" | "stock" | "price">("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredItems = stockItems.filter(
    (item) =>
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (activeCategory === "all" || item.category === activeCategory),
  )

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "name") {
      return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    } else if (sortBy === "stock") {
      const aPercentage = (a.currentStock / a.maxStock) * 100
      const bPercentage = (b.currentStock / b.maxStock) * 100
      return sortOrder === "asc" ? aPercentage - bPercentage : bPercentage - aPercentage
    } else {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price
    }
  })

  const toggleSort = (field: "name" | "stock" | "price") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      case "stable":
        return <BarChart3 className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  const getStockStatus = (current: number, max: number) => {
    const percentage = (current / max) * 100
    if (percentage <= 20) {
      return <Badge className="bg-red-900/50 text-red-400 border-red-500/50">LOW</Badge>
    } else if (percentage <= 50) {
      return <Badge className="bg-yellow-900/50 text-yellow-400 border-yellow-500/50">MEDIUM</Badge>
    } else {
      return <Badge className="bg-green-900/50 text-green-400 border-green-500/50">HIGH</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="STOCK SYSTEM"
        subtitle="Current inventory levels across Novaterra"
        icon={<Package className="h-6 w-6 text-purple-500" />}
        accentColor="purple"
      />

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Search items or locations..."
            className="pl-10 bg-black/50 border-purple-900/50 text-slate-300 placeholder:text-slate-600 focus:border-purple-500/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full sm:w-auto">
            <TabsList className="bg-black/50 border border-purple-900/50 w-full sm:w-auto">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-purple-900/30 data-[state=active]:text-purple-400"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="essentials"
                className="data-[state=active]:bg-purple-900/30 data-[state=active]:text-purple-400"
              >
                Essentials
              </TabsTrigger>
              <TabsTrigger
                value="resources"
                className="data-[state=active]:bg-purple-900/30 data-[state=active]:text-purple-400"
              >
                Resources
              </TabsTrigger>
              <TabsTrigger
                value="technology"
                className="data-[state=active]:bg-purple-900/30 data-[state=active]:text-purple-400"
              >
                Technology
              </TabsTrigger>
              <TabsTrigger
                value="weapons"
                className="data-[state=active]:bg-purple-900/30 data-[state=active]:text-purple-400"
              >
                Weapons
              </TabsTrigger>
              <TabsTrigger
                value="special"
                className="data-[state=active]:bg-purple-900/30 data-[state=active]:text-purple-400"
              >
                Special
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <Card className="bg-black/50 border-purple-900/50 mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <BarChart3 className="h-5 w-5 text-purple-500 mr-2" />
              <h3 className="text-lg font-vt323 text-purple-400">INVENTORY OVERVIEW</h3>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-purple-900/50 text-slate-400 hover:bg-purple-900/20 hover:text-purple-400"
                onClick={() => toggleSort("name")}
              >
                <ArrowUpDown className="h-4 w-4 mr-1" />
                Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-purple-900/50 text-slate-400 hover:bg-purple-900/20 hover:text-purple-400"
                onClick={() => toggleSort("stock")}
              >
                <ArrowUpDown className="h-4 w-4 mr-1" />
                Stock {sortBy === "stock" && (sortOrder === "asc" ? "↑" : "↓")}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-purple-900/50 text-slate-400 hover:bg-purple-900/20 hover:text-purple-400"
                onClick={() => toggleSort("price")}
              >
                <ArrowUpDown className="h-4 w-4 mr-1" />
                Price {sortBy === "price" && (sortOrder === "asc" ? "↑" : "↓")}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {sortedItems.length > 0 ? (
              sortedItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-black/70 border border-purple-900/50 rounded-md p-4 hover:border-purple-500/30 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                    <div>
                      <GlitchText>
                        <h4 className="text-lg font-vt323 text-purple-500">{item.name}</h4>
                      </GlitchText>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="bg-black/50 text-slate-400 border-slate-700/50 capitalize">
                          {item.category}
                        </Badge>
                        {getStockStatus(item.currentStock, item.maxStock)}
                      </div>
                    </div>
                    <div className="mt-2 md:mt-0 flex items-center gap-2">
                      <div className="text-right">
                        <div className="text-xs text-slate-500">PRICE</div>
                        <div className="text-lg font-vt323 text-green-500">{item.price} CR</div>
                      </div>
                      <div className="ml-2">{getTrendIcon(item.trend)}</div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-xs text-slate-500">STOCK LEVEL</div>
                      <div className="text-xs text-slate-400">
                        {item.currentStock}/{item.maxStock}
                      </div>
                    </div>
                    <Progress value={(item.currentStock / item.maxStock) * 100} className="h-2 bg-slate-800">
                      <div
                        className={`h-full rounded-full ${
                          item.currentStock <= item.maxStock * 0.2
                            ? "bg-red-500"
                            : item.currentStock <= item.maxStock * 0.5
                              ? "bg-yellow-500"
                              : "bg-green-500"
                        }`}
                        style={{ width: `${(item.currentStock / item.maxStock) * 100}%` }}
                      />
                    </Progress>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs">
                    <div className="flex items-center">
                      <span className="text-slate-500 mr-1">LOCATION:</span>
                      <span className="text-slate-300">{item.location}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-slate-500 mr-1">UPDATED:</span>
                      <span className="text-slate-300">{formatDate(item.lastUpdated)}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="text-purple-500 mb-2">No items found matching your criteria.</div>
                <Button
                  variant="outline"
                  className="border-purple-900/50 text-purple-400 hover:bg-purple-900/20"
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
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-black/50 border-purple-900/50">
          <CardContent className="p-4">
            <div className="flex items-center mb-4">
              <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
              <h3 className="text-lg font-vt323 text-purple-400">CRITICAL STOCK ALERTS</h3>
            </div>

            <div className="space-y-3">
              {stockItems
                .filter((item) => (item.currentStock / item.maxStock) * 100 <= 30)
                .slice(0, 3)
                .map((item) => (
                  <div
                    key={`alert-${item.id}`}
                    className="flex items-center justify-between p-2 border border-yellow-900/30 bg-yellow-900/10 rounded-md"
                  >
                    <div className="flex items-center">
                      <TrendingDown className="h-4 w-4 text-yellow-500 mr-2" />
                      <span className="text-slate-300">{item.name}</span>
                    </div>
                    <div className="text-yellow-500 font-mono">
                      {item.currentStock}/{item.maxStock}
                    </div>
                  </div>
                ))}

              {stockItems.filter((item) => (item.currentStock / item.maxStock) * 100 <= 30).length === 0 && (
                <div className="text-center py-4 text-slate-400">No critical stock alerts at this time.</div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-purple-900/50">
          <CardContent className="p-4">
            <div className="flex items-center mb-4">
              <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
              <h3 className="text-lg font-vt323 text-purple-400">MARKET TRENDS</h3>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-black/70 border border-purple-900/30 p-3 rounded-md text-center">
                  <div className="text-xs text-slate-500 mb-1">RISING</div>
                  <div className="text-lg font-vt323 text-green-500">
                    {stockItems.filter((item) => item.trend === "up").length}
                  </div>
                </div>
                <div className="bg-black/70 border border-purple-900/30 p-3 rounded-md text-center">
                  <div className="text-xs text-slate-500 mb-1">STABLE</div>
                  <div className="text-lg font-vt323 text-blue-500">
                    {stockItems.filter((item) => item.trend === "stable").length}
                  </div>
                </div>
                <div className="bg-black/70 border border-purple-900/30 p-3 rounded-md text-center">
                  <div className="text-xs text-slate-500 mb-1">FALLING</div>
                  <div className="text-lg font-vt323 text-red-500">
                    {stockItems.filter((item) => item.trend === "down").length}
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-400 mt-2">
                <p>
                  Market volatility index: <span className="text-purple-400">MEDIUM</span>
                </p>
                <p className="mt-1">
                  Projected stabilization: <span className="text-purple-400">7-10 DAYS</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center text-xs text-purple-500/70">
        <p>NOTICE: Stock levels are updated daily at 00:00 GST.</p>
        <p>For emergency requisitions, contact Resource Management directly.</p>
      </div>
    </div>
  )
}

