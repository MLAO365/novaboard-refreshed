"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Minimize2, X, TerminalIcon, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TerminalProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function Terminal({ isOpen = true, onClose }: TerminalProps) {
  const [minimized, setMinimized] = useState(false)
  const [history, setHistory] = useState<{ command: string; output: string }[]>([])
  const [currentCommand, setCurrentCommand] = useState("")
  const [isClosing, setIsClosing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Available commands
  const commands = {
    help: "Available commands: help, clear, status, scan, about, exit",
    clear: "Terminal cleared.",
    status: "All systems operational. No anomalies detected.",
    scan: "Scanning nearby sectors...\nScan complete. No immediate threats detected.",
    about: "Novaterra Command Terminal v1.0.3\nCopyright © 2305 Novaterra Corporation",
    exit: "Closing terminal session...",
  }

  // Focus input when terminal is opened
  useEffect(() => {
    if (isOpen && !minimized && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, minimized])

  // Scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  // Handle command submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentCommand.trim()) return

    // Play click sound
    const audio = new Audio("/click.mp3")
    audio.volume = 0.2
    audio.play().catch((e) => console.log("Audio play prevented:", e))

    // Process command
    const command = currentCommand.trim().toLowerCase()
    let output = ""

    if (command in commands) {
      output = commands[command as keyof typeof commands]

      // Special handling for exit command
      if (command === "exit") {
        handleClose()
      }
    } else {
      output = `Command not recognized: ${command}`
    }

    // Update history
    setHistory((prev) => [...prev, { command: currentCommand, output }])
    setCurrentCommand("")
  }

  // Handle terminal close with animation
  const handleClose = () => {
    setIsClosing(true)

    // Wait for animation to complete before calling onClose
    setTimeout(() => {
      if (onClose) onClose()
      setIsClosing(false)
    }, 300)
  }

  return (
    <div
      className={cn(
        "fixed bottom-16 left-4 w-96 max-w-[calc(100vw-2rem)] z-40 transition-all duration-300",
        minimized ? "h-10" : "h-96",
        isClosing ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0",
      )}
    >
      <div className="flex flex-col h-full bg-black/90 backdrop-blur-md border border-green-900/50 rounded-md overflow-hidden shadow-lg shadow-green-900/20">
        {/* Terminal header */}
        <div className="flex items-center justify-between p-2 bg-black border-b border-green-900/50">
          <div className="flex items-center space-x-2">
            <TerminalIcon className="h-4 w-4 text-green-500" />
            <span className="text-xs font-mono text-green-500">NOVATERRA TERMINAL</span>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-green-500 hover:text-green-400 hover:bg-green-900/20"
              onClick={() => setMinimized(!minimized)}
            >
              <Minimize2 className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-green-500 hover:text-red-400 hover:bg-red-900/20"
              onClick={handleClose}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Terminal content */}
        {!minimized && (
          <div className="flex-1 overflow-auto p-3 font-mono text-green-500 text-sm" ref={terminalRef}>
            <div className="mb-4">
              <div className="text-green-400 font-bold">NOVATERRA COMMAND TERMINAL</div>
              <div className="text-green-500/70 text-xs">Type 'help' for available commands.</div>
            </div>

            {/* Command history */}
            {history.map((item, index) => (
              <div key={index} className="mb-2">
                <div className="flex items-start">
                  <span className="text-green-400 mr-2">{">"}</span>
                  <span>{item.command}</span>
                </div>
                <div className="ml-4 text-green-500/80 whitespace-pre-line">{item.output}</div>
              </div>
            ))}

            {/* Command input */}
            <form onSubmit={handleSubmit} className="flex items-center mt-2">
              <span className="text-green-400 mr-2">{">"}</span>
              <input
                type="text"
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-green-500"
                placeholder="Type a command..."
                ref={inputRef}
              />
              <Button type="submit" variant="ghost" size="icon" className="h-6 w-6 text-green-500">
                <ChevronRight className="h-3 w-3" />
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

