"use client"

import { useState, useEffect } from "react"
import NightmareDialogue from "@/components/nightmare-dialogue"

export default function NightmareDialogueWrapper() {
  const [showDialogue, setShowDialogue] = useState(false)
  const [hasShown, setHasShown] = useState(false)
  const [konami, setKonami] = useState<string[]>([])
  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ]

  // Random chance to show dialogue
  useEffect(() => {
    // Only show randomly once per session
    if (hasShown) return

    // 5% chance to show after 30-60 seconds
    const randomDelay = Math.floor(Math.random() * 30000) + 30000
    const timer = setTimeout(() => {
      const shouldShow = Math.random() < 0.05
      if (shouldShow) {
        setShowDialogue(true)
        setHasShown(true)
      }
    }, randomDelay)

    return () => clearTimeout(timer)
  }, [hasShown])

  // Konami code easter egg
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newKonami = [...konami, e.key]
      if (newKonami.length > konamiCode.length) {
        newKonami.shift()
      }
      setKonami(newKonami)

      // Check if konami code is entered
      if (newKonami.length === konamiCode.length && newKonami.every((key, i) => key === konamiCode[i])) {
        setShowDialogue(true)
        setHasShown(true)
        setKonami([])
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [konami])

  // Secret click pattern (click 5 times rapidly in the same spot)
  useEffect(() => {
    let clickCount = 0
    let lastClickTime = 0
    let lastClickX = 0
    let lastClickY = 0

    const handleClick = (e: MouseEvent) => {
      const currentTime = Date.now()
      const timeDiff = currentTime - lastClickTime
      const xDiff = Math.abs(e.clientX - lastClickX)
      const yDiff = Math.abs(e.clientY - lastClickY)

      // If clicks are close together in time and position
      if (timeDiff < 500 && xDiff < 10 && yDiff < 10) {
        clickCount++
        if (clickCount >= 5) {
          setShowDialogue(true)
          setHasShown(true)
          clickCount = 0
        }
      } else {
        clickCount = 1
      }

      lastClickTime = currentTime
      lastClickX = e.clientX
      lastClickY = e.clientY
    }

    window.addEventListener("click", handleClick)
    return () => window.removeEventListener("click", handleClick)
  }, [])

  return <>{showDialogue && <NightmareDialogue onClose={() => setShowDialogue(false)} />}</>
}

