"use client"

import { useState, useEffect } from "react"
import { Cloud, Wind, Zap, Thermometer, Droplets, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import GlitchText from "@/components/glitch-text"

// Sample environment data
const regions = [
  {
    id: "region-001",
    name: "Central Hub",
    condition: "Normal atmospheric conditions",
    status: "normal",
    statusColor: "green",
    temperature: 22,
    radiation: 5,
    pressure: 95,
    oxygen: 98,
    hazards: [],
  },
  {
    id: "region-002",
    name: "Crimson Nebula",
    condition: "High radiation levels, cosmic storms",
    status: "hazardous",
    statusColor: "red",
    temperature: 45,
    radiation: 85,
    pressure: 65,
    oxygen: 30,
    hazards: ["Radiation", "Cosmic Storms"],
  },
  {
    id: "region-003",
    name: "Research Station Omega",
    condition: "Biohazard containment breach",
    status: "quarantine",
    statusColor: "purple",
    temperature: 18,
    radiation: 15,
    pressure: 90,
    oxygen: 92,
    hazards: ["Biohazard"],
  },
  {
    id: "region-004",
    name: "Digital Network Hub",
    condition: "Electromagnetic interference",
    status: "caution",
    statusColor: "yellow",
    temperature: 35,
    radiation: 25,
    pressure: 100,
    oxygen: 100,
    hazards: ["Electromagnetic Interference"],
  },
  {
    id: "region-005",
    name: "Outer Rim Territories",
    condition: "Extreme temperature fluctuations",
    status: "warning",
    statusColor: "yellow",
    temperature: -5,
    radiation: 30,
    pressure: 75,
    oxygen: 85,
    hazards: ["Temperature Fluctuations"],
  },
  {
    id: "region-006",
    name: "Black Market District",
    condition: "Air quality issues, toxic fumes",
    status: "caution",
    statusColor: "yellow",
    temperature: 28,
    radiation: 10,
    pressure: 92,
    oxygen: 80,
    hazards: ["Toxic Fumes"],
  },
]

export default function EnvironmentSystem() {
  const [selectedRegion, setSelectedRegion] = useState(regions[0])
  const [environmentalEvents, setEnvironmentalEvents] = useState<string[]>([])

  // Simulate random environmental events
  useEffect(() => {
    const events = [
      "Cosmic storm detected in Crimson Nebula",
      "Temperature dropping in Outer Rim Territories",
      "Radiation spike in Research Station Omega",
      "Atmospheric pressure stabilizing in Central Hub",
      "Oxygen levels decreasing in Black Market District",
      "Electromagnetic pulse detected in Digital Network Hub",
    ]

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const randomEvent = events[Math.floor(Math.random() * events.length)]
        setEnvironmentalEvents((prev) => {
          const updated = [randomEvent, ...prev]
          return updated.slice(0, 3) // Keep only the last 3 events
        })
      }
    }, 30000) // Every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "normal":
        return <Badge className="bg-green-900/50 text-green-400 border-green-500/50">NORMAL</Badge>
      case "caution":
        return <Badge className="bg-yellow-900/50 text-yellow-400 border-yellow-500/50">CAUTION</Badge>
      case "warning":
        return <Badge className="bg-yellow-900/50 text-yellow-400 border-yellow-500/50 animate-pulse">WARNING</Badge>
      case "hazardous":
        return <Badge className="bg-red-900/50 text-red-400 border-red-500/50 animate-pulse">HAZARDOUS</Badge>
      case "quarantine":
        return <Badge className="bg-purple-900/50 text-purple-400 border-purple-500/50 animate-pulse">QUARANTINE</Badge>
      default:
        return <Badge className="bg-slate-900/50 text-slate-400 border-slate-500/50">UNKNOWN</Badge>
    }
  }

  const getValueColor = (value: number, type: string) => {
    if (type === "temperature") {
      if (value < 0 || value > 30) return "text-red-500"
      if (value < 10 || value > 25) return "text-yellow-500"
      return "text-green-500"
    }

    if (type === "radiation") {
      if (value > 50) return "text-red-500"
      if (value > 20) return "text-yellow-500"
      return "text-green-500"
    }

    if (type === "pressure" || type === "oxygen") {
      if (value < 70) return "text-red-500"
      if (value < 85) return "text-yellow-500"
      return "text-green-500"
    }

    return "text-slate-500"
  }

  return (
    <Card className="bg-black/50 border-green-900/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-green-500 font-vt323 flex items-center text-base">
          <Cloud className="h-5 w-5 mr-2 text-green-500" />
          ENVIRONMENTAL CONDITIONS
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {regions.map((region) => (
            <div
              key={region.id}
              className={`p-3 border rounded-md cursor-pointer transition-colors ${
                selectedRegion.id === region.id
                  ? `bg-${region.statusColor}-900/20 border-${region.statusColor}-900/50`
                  : "bg-black/50 border-slate-900/50 hover:border-green-900/50"
              }`}
              onClick={() => setSelectedRegion(region)}
            >
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-medium text-slate-300">{region.name}</h4>
                {getStatusBadge(region.status)}
              </div>
              <p className="text-xs text-slate-500">{region.condition}</p>
            </div>
          ))}
        </div>

        <div className="bg-black/70 border border-green-900/50 rounded-md p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
            <GlitchText>
              <h3 className={`text-lg font-vt323 text-${selectedRegion.statusColor}-500`}>{selectedRegion.name}</h3>
            </GlitchText>
            <div className="mt-2 sm:mt-0">{getStatusBadge(selectedRegion.status)}</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="flex items-center mb-2">
                <Thermometer className="h-4 w-4 text-red-500 mr-2" />
                <div className="text-xs text-slate-500">TEMPERATURE</div>
                <div
                  className={`ml-auto text-sm font-mono ${getValueColor(selectedRegion.temperature, "temperature")}`}
                >
                  {selectedRegion.temperature}°C
                </div>
              </div>
              <Progress value={((selectedRegion.temperature + 20) / 70) * 100} className="h-1.5 bg-slate-800">
                <div
                  className={`h-full rounded-full bg-gradient-to-r from-blue-500 via-green-500 to-red-500`}
                  style={{ width: `${((selectedRegion.temperature + 20) / 70) * 100}%` }}
                />
              </Progress>
            </div>

            <div>
              <div className="flex items-center mb-2">
                <Zap className="h-4 w-4 text-yellow-500 mr-2" />
                <div className="text-xs text-slate-500">RADIATION</div>
                <div className={`ml-auto text-sm font-mono ${getValueColor(selectedRegion.radiation, "radiation")}`}>
                  {selectedRegion.radiation}%
                </div>
              </div>
              <Progress value={selectedRegion.radiation} className="h-1.5 bg-slate-800">
                <div
                  className={`h-full rounded-full ${
                    selectedRegion.radiation > 50
                      ? "bg-red-500"
                      : selectedRegion.radiation > 20
                        ? "bg-yellow-500"
                        : "bg-green-500"
                  }`}
                  style={{ width: `${selectedRegion.radiation}%` }}
                />
              </Progress>
            </div>

            <div>
              <div className="flex items-center mb-2">
                <Wind className="h-4 w-4 text-blue-500 mr-2" />
                <div className="text-xs text-slate-500">PRESSURE</div>
                <div className={`ml-auto text-sm font-mono ${getValueColor(selectedRegion.pressure, "pressure")}`}>
                  {selectedRegion.pressure}%
                </div>
              </div>
              <Progress value={selectedRegion.pressure} className="h-1.5 bg-slate-800">
                <div
                  className={`h-full rounded-full ${
                    selectedRegion.pressure < 70
                      ? "bg-red-500"
                      : selectedRegion.pressure < 85
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                  }`}
                  style={{ width: `${selectedRegion.pressure}%` }}
                />
              </Progress>
            </div>

            <div>
              <div className="flex items-center mb-2">
                <Droplets className="h-4 w-4 text-cyan-500 mr-2" />
                <div className="text-xs text-slate-500">OXYGEN</div>
                <div className={`ml-auto text-sm font-mono ${getValueColor(selectedRegion.oxygen, "oxygen")}`}>
                  {selectedRegion.oxygen}%
                </div>
              </div>
              <Progress value={selectedRegion.oxygen} className="h-1.5 bg-slate-800">
                <div
                  className={`h-full rounded-full ${
                    selectedRegion.oxygen < 70
                      ? "bg-red-500"
                      : selectedRegion.oxygen < 85
                        ? "bg-yellow-500"
                        : "bg-cyan-500"
                  }`}
                  style={{ width: `${selectedRegion.oxygen}%` }}
                />
              </Progress>
            </div>
          </div>

          {selectedRegion.hazards.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                <div className="text-xs text-slate-500">HAZARDS</div>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedRegion.hazards.map((hazard, index) => (
                  <Badge key={index} className="bg-red-900/20 text-red-400 border-red-900/50">
                    {hazard}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="text-xs text-slate-500 mb-2">RECENT EVENTS</div>
            {environmentalEvents.length > 0 ? (
              <div className="space-y-2">
                {environmentalEvents.map((event, index) => (
                  <div key={index} className="text-xs text-slate-400 border-l-2 border-slate-700 pl-2 py-1">
                    {event}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-slate-500 italic">No recent events</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

