"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Map, Compass, Layers, Info, AlertCircle, Crosshair } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import GlitchText from "@/components/glitch-text"
import PageHeader from "@/components/page-header"

// Map location data
const locations = [
  {
    id: "central-hub",
    name: "Central Hub",
    type: "station",
    x: 62,
    y: 41,
    description: "The main command center of Novaterra. Houses the central government and military headquarters.",
    status: "secure",
    population: "High",
    resources: ["Fuel", "Food", "Medical"],
    danger: "low",
  },
  {
    id: "crimson-nebula",
    name: "Crimson Nebula",
    type: "region",
    x: 75,
    y: 30,
    description: "A dangerous region filled with cosmic radiation and pirate activity. Rich in rare minerals.",
    status: "contested",
    population: "Low",
    resources: ["Minerals", "Dark Matter"],
    danger: "high",
  },
  {
    id: "abandoned-research",
    name: "Research Station Omega",
    type: "station",
    x: 25,
    y: 70,
    description: "Abandoned research facility where illegal experiments were conducted. Now a ghost station.",
    status: "abandoned",
    population: "None",
    resources: ["Technology", "Data"],
    danger: "extreme",
  },
  {
    id: "digital-network",
    name: "Digital Network Hub",
    type: "digital",
    x: 59,
    y: 78,
    description: "The central node of Novaterra's digital infrastructure. Heavily protected against cyber attacks.",
    status: "secure",
    population: "Virtual",
    resources: ["Data", "AI"],
    danger: "medium",
  },
  {
    id: "outer-rim",
    name: "Outer Rim Territories",
    type: "region",
    x: 20,
    y: 20,
    description: "Lawless region at the edge of known space. Haven for rebels and those seeking to escape authority.",
    status: "lawless",
    population: "Medium",
    resources: ["Contraband", "Fuel"],
    danger: "high",
  },
  {
    id: "black-market",
    name: "Black Market District",
    type: "area",
    x: 40,
    y: 40,
    description:
      "Underground marketplace where illegal goods and services are traded. Operated by the Shadow Syndicate.",
    status: "restricted",
    population: "High",
    resources: ["Contraband", "Weapons", "Tech"],
    danger: "medium",
  },
  {
    id: "luxury-district",
    name: "Luxury District",
    type: "area",
    x: 65,
    y: 45,
    description: "Exclusive area for the wealthy elite of Novaterra. Features high-end shops and residences.",
    status: "secure",
    population: "Medium",
    resources: ["Luxury Goods", "Art"],
    danger: "low",
  },
  // New locations
  {
    id: "nova-fleet-hq",
    name: "Nova Bounty Association Headquarters",
    type: "military",
    x: 63,
    y: 50,
    description: "The primary military base of Bounty Association. Houses the fleet's flagship and command operations.",
    status: "secure",
    population: "High",
    resources: ["Military", "Technology", "Medical"],
    danger: "low",
  },
  {
    id: "mining-colony-beta",
    name: "Mining Colony Beta",
    type: "colony",
    x: 97,
    y: 54,
    description: "Major mining operation extracting rare minerals and resources. Vital to Novaterra's economy.",
    status: "secure",
    population: "Medium",
    resources: ["Minerals", "Fuel", "Labor"],
    danger: "low",
  },
  {
    id: "void-gate-alpha",
    name: "Void Gate Alpha",
    type: "gate",
    x: 35,
    y: 15,
    description: "Ancient structure of unknown origin. Appears to be a gateway to other regions of space.",
    status: "restricted",
    population: "None",
    resources: ["Unknown Technology"],
    danger: "high",
  },
  {
    id: "medical-center",
    name: "Medical Center",
    type: "facility",
    x: 48,
    y: 55,
    description: "Advanced medical facility providing healthcare and research for all of Novaterra.",
    status: "secure",
    population: "High",
    resources: ["Medical", "Research", "Cybernetics"],
    danger: "low",
  },
  {
    id: "docking-station-alpha",
    name: "Docking Station Alpha",
    type: "station",
    x: 49,
    y: 23,
    description: "Primary docking facility for civilian and commercial vessels. Hub of trade and transportation.",
    status: "secure",
    population: "High",
    resources: ["Fuel", "Ship Parts", "Trade Goods"],
    danger: "low",
  },
  {
    id: "research-station-gamma",
    name: "Research Station Gamma",
    type: "station",
    x: 69,
    y: 74,
    description: "Active research facility focused on advanced technology and scientific breakthroughs.",
    status: "restricted",
    population: "Medium",
    resources: ["Technology", "Research Data"],
    danger: "medium",
  },
  {
    id: "military-outpost",
    name: "Military Outpost",
    type: "military",
    x: 30,
    y: 40,
    description: "Forward operating base for Nova Fleet. Monitors activity in nearby regions.",
    status: "secure",
    population: "Medium",
    resources: ["Military", "Surveillance"],
    danger: "medium",
  },
  {
    id: "sky-citadel",
    name: "The Sky Citadel",
    type: "colony/trading outpost",
    x: 32,
    y: 68,
    description: "A floating trading hub known for exotic goods and fair prices. Popular stop for merchants and traders.",
    status: "secure",
    population: "Medium",
    resources: ["Trade Goods", "Information", "Luxury Items"],
    danger: "low",
  },
  {
    id: "abandoned-colony",
    name: "Abandoned Colony",
    type: "colony",
    x: 14,
    y: 69,
    description: "Once-thriving colony mysteriously abandoned. Rumors of strange occurrences keep most visitors away.",
    status: "abandoned",
    population: "None",
    resources: ["Salvage", "Unknown"],
    danger: "high",
  },
  {
    id: "quantum-research-lab",
    name: "Quantum Research Lab",
    type: "facility",
    x: 86,
    y: 31,
    description: "Secretive facility researching quantum physics and experimental technologies.",
    status: "restricted",
    population: "Low",
    resources: ["Advanced Technology", "Quantum Materials"],
    danger: "medium",
  },
  {
    id: "asteroid-mining-field",
    name: "Asteroid Mining Field",
    type: "region",
    x: 90,
    y: 75,
    description: "Dense field of resource-rich asteroids. Heavily mined but dangerous due to unstable formations.",
    status: "caution",
    population: "Low",
    resources: ["Minerals", "Rare Elements"],
    danger: "medium",
  },
  {
    id: "deep-space-relay",
    name: "Deep Space Relay",
    type: "digital",
    x: 10,
    y: 85,
    description: "Communication relay station extending Novaterra's network to the farthest reaches of known space.",
    status: "secure",
    population: "Low",
    resources: ["Communication", "Data"],
    danger: "low",
  },
  {
    id: "smugglers-haven",
    name: "Smuggler's Haven",
    type: "area",
    x: 13,
    y: 30,
    description: "Hidden outpost frequented by smugglers and those looking to avoid official attention.",
    status: "lawless",
    population: "Medium",
    resources: ["Contraband", "Information"],
    danger: "high",
  },
  {
    id: "plague-fleet-location",
    name: "Your Location",
    type: "na",
    x: 32,
    y: 65,
    description:
      "This is where you are!",
    status: "quarantine",
    population: "Unknown",
    resources: ["Bioweapons", "Experimental Technology"],
    danger: "extreme",
    isSpecial: true,
  },
  {
    id: "barleys-outpost",
    name: "Barley's Trading Outpost",
    type: "colony/trading outpost",
    x: 46,
    y: 56,
    description: "A bustling trading hub known for its diverse merchandise and fair deals. Run by the charismatic trader Barley.",
    status: "secure",
    population: "Medium",
    resources: ["Trade Goods", "Food", "Ship Parts"],
    danger: "low",
  },
  {
    id: "starfall-market",
    name: "Starfall Market",
    type: "colony/trading outpost",
    x: 82,
    y: 32,
    description: "An elegant trading post specializing in luxury goods and rare artifacts. Popular among wealthy merchants.",
    status: "secure",
    population: "Medium",
    resources: ["Luxury Goods", "Art", "Exotic Materials"],
    danger: "low",
  },
  {
    id: "frontier-exchange",
    name: "Frontier Exchange",
    type: "colony/trading outpost",
    x: 10,
    y: 45,
    description: "A rough-and-tumble trading post on the frontier. Known for black market goods and no-questions-asked deals.",
    status: "lawless",
    population: "Medium",
    resources: ["Contraband", "Weapons", "Information"],
    danger: "high",
  },
  {
    id: "nebula-bazaar",
    name: "Nebula Bazaar",
    type: "colony/trading outpost",
    x: 71,
    y: 15,
    description: "A trading outpost nestled in the crimson nebula. Specializes in rare minerals and experimental technology.",
    status: "caution",
    population: "Medium",
    resources: ["Rare Minerals", "Technology", "Research Data"],
    danger: "medium",
  },
]

const getSpecialLocationMarker = (location: any) => {
  if (location.isSpecial) {
    return (
      <div
        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
        style={{
          left: `${location.x}%`,
          top: `${location.y}%`,
        }}
      >
        <div className="relative">
          <div className="absolute -inset-1 bg-blue-500/30 rounded-full animate-ping"></div>
          <div className="absolute -inset-1 bg-blue-500/50 rounded-full animate-pulse"></div>
          <div className="h-3 w-3 bg-blue-500 rounded-full relative z-10"></div>
        </div>
      </div>
    )
  }
  return null
}

const getLocationIcon = (type: string) => {
  switch (type) {
    case "station":
      return "◉"
    case "region":
      return "◈"
    case "area":
      return "◇"
    case "digital":
      return "⊡"
    case "military":
      return "⚔"
    case "colony/trading outpost":
      return "⌂"
    case "gate":
      return "⎊"
    case "facility":
      return "⚕"
    case "fleet":
      return "⚓"
    default:
      return "○"
  }
}

const getLocationColor = (danger: string) => {
  switch (danger) {
    case "low":
      return "text-blue-500"
    case "medium":
      return "text-yellow-500"
    case "high":
      return "text-red-500"
    case "extreme":
      return "text-purple-500"
    default:
      return "text-gray-500"
  }
}

export default function MapPage() {
  const [selectedLocation, setSelectedLocation] = useState<any>(null)
  const [mapLayer, setMapLayer] = useState("standard")
  const [isScanning, setIsScanning] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapSize, setMapSize] = useState({ width: 0, height: 0 })
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 })
  const [showCoords, setShowCoords] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mapRef.current) return

    const rect = mapRef.current.getBoundingClientRect()
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100)
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100)

    setMouseCoords({ x, y })
    setShowCoords(true)
  }

  const handleMouseLeave = () => {
    setShowCoords(false)
  }

  useEffect(() => {
    const updateMapSize = () => {
      if (mapRef.current) {
        setMapSize({
          width: mapRef.current.offsetWidth,
          height: mapRef.current.offsetHeight,
        })
      }
    }

    updateMapSize()
    window.addEventListener("resize", updateMapSize)

    return () => window.removeEventListener("resize", updateMapSize)
  }, [])

  const handleLocationClick = (location: any) => {
    setSelectedLocation(location)
  }

  const handleScan = () => {
    setIsScanning(true)
    setTimeout(() => {
      setIsScanning(false)
    }, 3000)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "secure":
        return <Badge className="bg-green-900/50 text-green-400 border-green-500/50">SECURE</Badge>
      case "contested":
        return <Badge className="bg-yellow-900/50 text-yellow-400 border-yellow-500/50">CONTESTED</Badge>
      case "abandoned":
        return <Badge className="bg-slate-900/50 text-slate-400 border-slate-500/50">ABANDONED</Badge>
      case "restricted":
        return <Badge className="bg-red-900/50 text-red-400 border-red-500/50">RESTRICTED</Badge>
      case "lawless":
        return <Badge className="bg-purple-900/50 text-purple-400 border-purple-500/50">LAWLESS</Badge>
      case "caution":
        return <Badge className="bg-orange-900/50 text-orange-400 border-orange-500/50">CAUTION</Badge>
      case "quarantine":
        return <Badge className="bg-red-900/50 text-red-400 border-red-500/50 animate-pulse">QUARANTINE</Badge>
      default:
        return <Badge className="bg-slate-900/50 text-slate-400 border-slate-500/50">UNKNOWN</Badge>
    }
  }

  const getDangerBadge = (danger: string) => {
    switch (danger) {
      case "low":
        return <Badge className="bg-blue-900/50 text-blue-400 border-blue-500/50">LOW RISK</Badge>
      case "medium":
        return <Badge className="bg-yellow-900/50 text-yellow-400 border-yellow-500/50">MEDIUM RISK</Badge>
      case "high":
        return <Badge className="bg-red-900/50 text-red-400 border-red-500/50">HIGH RISK</Badge>
      case "extreme":
        return (
          <Badge className="bg-purple-900/50 text-purple-400 border-purple-500/50 animate-pulse">EXTREME RISK</Badge>
        )
      default:
        return <Badge className="bg-slate-900/50 text-slate-400 border-slate-500/50">UNKNOWN</Badge>
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="UNIVERSE MAP"
        subtitle="Navigate the Novaterra universe"
        icon={<Map className="h-6 w-6 text-blue-500" />}
        accentColor="blue"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-black/50 border-blue-900/50 h-[600px] relative overflow-hidden">
            <CardContent className="p-0 h-full">
              <div className="absolute top-4 left-4 z-10 flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-900/50 text-blue-400 hover:bg-blue-900/20"
                  onClick={handleScan}
                  disabled={isScanning}
                >
                  {isScanning ? "SCANNING..." : "SCAN AREA"}
                </Button>
              </div>

              <div className="absolute top-4 right-4 z-10">
                <Tabs value={mapLayer} onValueChange={setMapLayer}>
                  <TabsList className="bg-black/70 border border-blue-900/50">
                    <TabsTrigger
                      value="standard"
                      className="data-[state=active]:bg-blue-900/30 data-[state=active]:text-blue-400 text-xs"
                    >
                      Standard
                    </TabsTrigger>
                    <TabsTrigger
                      value="tactical"
                      className="data-[state=active]:bg-blue-900/30 data-[state=active]:text-blue-400 text-xs"
                    >
                      Tactical
                    </TabsTrigger>
                    <TabsTrigger
                      value="resource"
                      className="data-[state=active]:bg-blue-900/30 data-[state=active]:text-blue-400 text-xs"
                    >
                      Resources
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div
                ref={mapRef}
                className="relative w-full h-full overflow-hidden cursor-crosshair"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {/* Background map image */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Novaterra%20Space%20Map%20March%2017.png-ZXNM8qpXKadYyF2A168ilei8rNYlwA.jpeg)",
                  }}
                ></div>

                {/* Coordinates display */}
                {showCoords && (
                  <div className="absolute top-16 right-4 bg-black/80 border border-blue-900/50 px-3 py-2 rounded-md z-30 flex items-center">
                    <Crosshair className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-blue-400 font-mono text-sm">
                      X: {mouseCoords.x} Y: {mouseCoords.y}
                    </span>
                  </div>
                )}

                {/* Special location markers (like Plague Doctor fleet) */}
                {locations
                  .filter((location) => location.isSpecial)
                  .map((location) => getSpecialLocationMarker(location))}

                {/* Map scan effect */}
                {isScanning && (
                  <div className="absolute inset-0 bg-blue-500/10 animate-pulse z-10">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500/50 animate-scan"></div>
                  </div>
                )}

                {/* Map layers */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${mapLayer === "tactical" ? "opacity-20" : "opacity-0"}`}
                >
                  <div className="absolute inset-0 bg-red-500/10"></div>
                  <div className="absolute top-[30%] right-[20%] w-[30%] h-[25%] border border-red-500/30 rounded-md">
                    <div className="absolute top-2 left-2 text-xs text-red-500">CONTESTED ZONE</div>
                  </div>
                </div>

                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${mapLayer === "resource" ? "opacity-20" : "opacity-0"}`}
                >
                  <div className="absolute top-[30%] left-[20%] w-[15%] h-[15%] bg-green-500/20 rounded-full"></div>
                  <div className="absolute bottom-[20%] right-[30%] w-[20%] h-[20%] bg-purple-500/20 rounded-full"></div>
                </div>

                {/* Location markers */}
                {locations.map((location) => (
                  <TooltipProvider key={location.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${getLocationColor(location.danger)} text-2xl hover:scale-125 transition-transform ${selectedLocation?.id === location.id ? "animate-pulse" : ""}`}
                          style={{
                            left: `${location.x}%`,
                            top: `${location.y}%`,
                          }}
                          onClick={() => handleLocationClick(location)}
                        >
                          {getLocationIcon(location.type)}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="bg-black/90 border-blue-900/50 text-blue-400">
                        <p>{location.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}

                {/* Compass */}
                <div className="absolute bottom-4 right-4 h-16 w-16 border border-blue-900/50 rounded-full bg-black/50 flex items-center justify-center">
                  <Compass className="h-10 w-10 text-blue-500/70" />
                </div>

                {/* Scale */}
                <div className="absolute bottom-4 left-4 flex flex-col items-center">
                  <div className="text-xs text-blue-500/70 mb-1">SCALE</div>
                  <div className="h-1 w-16 bg-gradient-to-r from-blue-500/70 to-blue-500/20"></div>
                  <div className="text-xs text-blue-500/70 mt-1">100 LIGHT YEARS</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-black/50 border-blue-900/50 h-[600px] overflow-hidden flex flex-col">
            <CardContent className="p-4 flex-1 overflow-y-auto">
              {selectedLocation ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <GlitchText>
                      <h3 className="text-xl font-vt323 text-blue-500">{selectedLocation.name}</h3>
                    </GlitchText>
                    <div className="flex space-x-2">
                      {getStatusBadge(selectedLocation.status)}
                      {getDangerBadge(selectedLocation.danger)}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="text-xs text-slate-500 mb-1">DESCRIPTION</div>
                      <p className="text-sm text-slate-300">{selectedLocation.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-slate-500 mb-1">TYPE</div>
                        <p className="text-sm text-slate-300 capitalize">{selectedLocation.type}</p>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 mb-1">POPULATION</div>
                        <p className="text-sm text-slate-300">{selectedLocation.population}</p>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-slate-500 mb-1">AVAILABLE RESOURCES</div>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedLocation.resources.map((resource: string) => (
                          <Badge
                            key={resource}
                            variant="outline"
                            className="bg-black/50 text-blue-400 border-blue-900/50"
                          >
                            {resource}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-blue-900/30 pt-4 mt-4">
                      <div className="text-xs text-slate-500 mb-2">NAVIGATION DATA</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-blue-900/20 p-2 rounded border border-blue-900/50">
                          <div className="text-slate-500">COORDINATES</div>
                          <div className="text-blue-400 font-mono">
                            X: {selectedLocation.x} Y: {selectedLocation.y}
                          </div>
                        </div>
                        <div className="bg-blue-900/20 p-2 rounded border border-blue-900/50">
                          <div className="text-slate-500">REGION</div>
                          <div className="text-blue-400 font-mono">{selectedLocation.id.toUpperCase()}</div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-blue-900/30 pt-4 mt-4">
                      <div className="flex items-center">
                        <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
                        <div className="text-xs text-yellow-500">TRAVEL ADVISORY</div>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        {selectedLocation.danger === "low" &&
                          "Standard precautions advised. Area is generally safe for travel."}
                        {selectedLocation.danger === "medium" &&
                          "Exercise caution when traveling to this area. Increased security recommended."}
                        {selectedLocation.danger === "high" &&
                          "Travel not recommended without proper security measures. High risk of hostile encounters."}
                        {selectedLocation.danger === "extreme" &&
                          "EXTREME DANGER. Restricted area. Authorization required for access. Lethal force authorized."}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <Info className="h-10 w-10 text-blue-500/50 mb-4" />
                  <h3 className="text-lg font-vt323 text-blue-500 mb-2">No Location Selected</h3>
                  <p className="text-sm text-slate-400 max-w-xs">
                    Select a location marker on the map to view detailed information.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-6">
        <Card className="bg-black/50 border-blue-900/50">
          <CardContent className="p-4">
            <div className="flex items-center mb-4">
              <Layers className="h-5 w-5 text-blue-500 mr-2" />
              <h3 className="text-lg font-vt323 text-blue-400">MAP LEGEND</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center">
                <span className="text-blue-500 text-2xl mr-2">◉</span>
                <span className="text-sm text-slate-300">Station</span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-500 text-2xl mr-2">◈</span>
                <span className="text-sm text-slate-300">Region</span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-500 text-2xl mr-2">◇</span>
                <span className="text-sm text-slate-300">Area</span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-500 text-2xl mr-2">⊡</span>
                <span className="text-sm text-slate-300">Digital Node</span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-500 text-2xl mr-2">⚔</span>
                <span className="text-sm text-slate-300">Military</span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-500 text-2xl mr-2">⌂</span>
                <span className="text-sm text-slate-300">Colony/Trading Outpost</span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-500 text-2xl mr-2">⎊</span>
                <span className="text-sm text-slate-300">Gate</span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-500 text-2xl mr-2">⚕</span>
                <span className="text-sm text-slate-300">Facility</span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-500 text-2xl mr-2">⚓</span>
                <span className="text-sm text-slate-300">Fleet</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 bg-blue-500 rounded-full mr-2 relative">
                  <div className="absolute -inset-1 bg-blue-500/30 rounded-full animate-ping"></div>
                </div>
                <span className="text-sm text-slate-300">Your Location</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="flex items-center">
                <div className="h-3 w-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-sm text-slate-300">Low Risk</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 bg-yellow-500 rounded-full mr-2"></div>
                <span className="text-sm text-slate-300">Medium Risk</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 bg-red-500 rounded-full mr-2"></div>
                <span className="text-sm text-slate-300">High Risk</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 bg-purple-500 rounded-full mr-2"></div>
                <span className="text-sm text-slate-300">Extreme Risk</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
