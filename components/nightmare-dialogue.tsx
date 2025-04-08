"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface DialogueProps {
  onClose: () => void
}

const dialogueLines = [
  "What's up captain?",
  "Did you bring me a lemon tart?",
  "I'm so tired.",
  "Don't make me take control of your ship again.",
  "Are we there yet?",
  "Zzzzzzzzzzzzzzzzzzz....",
]

export default function NightmareDialogue({ onClose }: DialogueProps) {
  const [currentLine, setCurrentLine] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [showContinuePrompt, setShowContinuePrompt] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  // Typing effect
  useEffect(() => {
    if (currentLine >= dialogueLines.length) {
      return
    }

    const line = dialogueLines[currentLine]
    let index = 0
    setIsTyping(true)
    setShowContinuePrompt(false)

    const typingInterval = setInterval(() => {
      if (index <= line.length) {
        setDisplayedText(line.substring(0, index))
        index++
      } else {
        clearInterval(typingInterval)
        setIsTyping(false)
        setShowContinuePrompt(true)
      }
    }, 50)

    return () => clearInterval(typingInterval)
  }, [currentLine])

  // Handle continue
  const handleContinue = () => {
    if (currentLine < dialogueLines.length - 1) {
      setCurrentLine((prev) => prev + 1)
    } else {
      handleClose()
    }
  }

  // Handle close with animation
  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  // Play sound effect on appearance
  useEffect(() => {
    const audio = new Audio("/notification.mp3")
    audio.volume = 0.3
    audio.play()
  }, [])

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300",
        isClosing ? "opacity-0" : "opacity-100",
      )}
    >
      <div className="absolute inset-0 bg-black/70" onClick={handleClose}></div>

      <div
        className={cn(
          "relative bg-black border-4 border-red-900 rounded-lg p-4 max-w-md w-full transition-transform duration-300",
          isClosing ? "scale-95" : "scale-100",
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-6 w-6 text-red-500 hover:bg-red-900/20 z-10"
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="flex items-start mb-4">
          <div className="relative w-24 h-24 mr-4 flex-shrink-0 bg-red-900/30 rounded-lg overflow-hidden">
            <img
              src="https://files.catbox.moe/a06r79.jpg"
              alt="Nightmare Leviathan"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h3 className="text-lg font-vt323 text-red-500 mb-1">NIGHTMARE LEVIATHAN</h3>
            <div className="text-xs text-red-400/70 mb-2">CONNECTION ESTABLISHED</div>
            <div className="h-px w-full bg-gradient-to-r from-red-900 to-transparent mb-2"></div>
          </div>
        </div>

        <div className="min-h-[80px] bg-black/60 border border-red-900/50 rounded-md p-3 mb-4">
          <p className="text-red-400 font-mono">
            {displayedText}
            <span className={cn("inline-block w-2 h-4 bg-red-500 ml-1", isTyping ? "animate-blink" : "hidden")}></span>
          </p>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-xs text-red-500/70">
            <span className="animate-pulse">●</span> SECURE CHANNEL
          </div>

          {showContinuePrompt && (
            <Button
              variant="outline"
              size="sm"
              className="border-red-900/50 text-red-400 hover:bg-red-900/20"
              onClick={handleContinue}
            >
              {currentLine < dialogueLines.length - 1 ? "Continue" : "Close"}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

