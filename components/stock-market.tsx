"use client"

import { useState, useEffect } from "react"
import { XAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

// Generate random stock data
const generateStockData = (days = 30, volatility = 0.02) => {
  const stocks = [
    { id: "NVTR", name: "Novaterra Holdings", sector: "Technology", startPrice: 142.58 },
    { id: "LEVI", name: "Leviathan Energy", sector: "Energy", startPrice: 67.45 },
    { id: "SNTM", name: "Sanctuary Mining", sector: "Materials", startPrice: 34.21 },
    { id: "VOID", name: "Void Communications", sector: "Communications", startPrice: 112.87 },
    { id: "QNTM", name: "Quantum Systems", sector: "Technology", startPrice: 95.63 },
  ]

  return stocks.map((stock) => {
    let price = stock.startPrice
    const history = Array(days)
      .fill(0)
      .map((_, i) => {
        const change = (Math.random() - 0.5) * volatility * price
        price += change

        return {
          date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          price: Number.parseFloat(price.toFixed(2)),
          volume: Math.floor(Math.random() * 10000000) + 1000000,
        }
      })

    const currentPrice = history[history.length - 1].price
    const previousPrice = history[history.length - 2].price
    const change = currentPrice - previousPrice
    const percentChange = (change / previousPrice) * 100

    return {
      ...stock,
      price: currentPrice,
      change,
      percentChange: Number.parseFloat(percentChange.toFixed(2)),
      trend: change >= 0 ? "up" : "down",
      history,
    }
  })
}

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/80 border border-green-900/50 p-2 text-xs rounded">
        <p className="text-green-400">{`Date: ${label}`}</p>
        <p className="text-green-500">{`Price: ${payload[0].value.toFixed(2)}`}</p>
      </div>
    )
  }
  return null
}

export default function StockMarket() {
  const [stocks, setStocks] = useState<any[]>([])
  const [selectedStock, setSelectedStock] = useState<any>(null)
  const [timeframe, setTimeframe] = useState("1M")
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [isLoading, setIsLoading] = useState(false)

  // Initialize stock data
  useEffect(() => {
    const stockData = generateStockData()
    setStocks(stockData)
    setSelectedStock(stockData[0])
  }, [])

  // Remove the refreshStocks function
  const refreshStocks = () => {
    setIsLoading(true)
    setTimeout(() => {
      const stockData = generateStockData()
      setStocks(stockData)

      // Update selected stock with new data
      if (selectedStock) {
        const updatedStock = stockData.find((s) => s.id === selectedStock.id)
        setSelectedStock(updatedStock)
      }

      setLastUpdated(new Date())
      setIsLoading(false)
    }, 1000)
  }

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value)
  }

  // Format large numbers
  const formatNumber = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(2)}M`
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(2)}K`
    }
    return value.toString()
  }

  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  if (!selectedStock) return null

  // Update the main component return to be more compact
  return (
    <div className="h-full flex flex-col">
      <div className="mb-3">
        <h3 className="text-sm font-mono text-green-400">MARKET ANALYSIS</h3>
      </div>

      {/* Stock List - more compact */}
      <div className="grid grid-cols-1 gap-1.5 mb-3">
        {stocks.map((stock) => (
          <div
            key={stock.id}
            className={cn(
              "bg-black/60 backdrop-blur-sm border rounded-md p-1.5 cursor-pointer transition-colors",
              selectedStock.id === stock.id
                ? "border-green-500/50 bg-green-900/10"
                : "border-green-900/30 hover:border-green-900/50 hover:bg-green-900/5",
            )}
            onClick={() => setSelectedStock(stock)}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center">
                  <span className="text-xs font-medium text-green-400 mr-1">{stock.id}</span>
                </div>
              </div>
              <div className="text-right">
                <div
                  className={cn(
                    "text-xs flex items-center justify-end",
                    stock.trend === "up" ? "text-green-500" : "text-red-500",
                  )}
                >
                  {stock.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {stock.percentChange > 0 ? "+" : ""}
                  {stock.percentChange}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Stock Chart - more compact */}
      {selectedStock && (
        <div className="bg-black/60 backdrop-blur-sm border border-green-900/50 rounded-md p-2 mb-2">
          <div className="flex items-center justify-between mb-1">
            <div className="text-xs font-medium text-green-400">{selectedStock.id}</div>
            <div className="text-xs font-mono">{formatCurrency(selectedStock.price)}</div>
          </div>

          <div className="h-24 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={selectedStock.history.slice(-14)}>
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 8, fill: "#22c55e99" }}
                  tickFormatter={(value) => value.split("-")[2]}
                  axisLine={{ stroke: "#22c55e33" }}
                  tickLine={{ stroke: "#22c55e33" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke={selectedStock.trend === "up" ? "#22c55e" : "#ef4444"}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  )
}

