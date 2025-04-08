"use client"

import { useState, useRef } from "react"
import { Volume2, VolumeX, Music, Pause, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

interface AudioPlayerProps {
  className?: string
}

export default function AudioPlayer({ className }: AudioPlayerProps) {
  const [isMuted, setIsMuted] = useState(true)
  const [volume, setVolume] = useState(50)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState("Cyberpunk Ambient")
  const [isExpanded, setIsExpanded] = useState(false)
  const playerRef = useRef<HTMLIFrameElement>(null)

  // YouTube playlist ID from the URL: https://www.youtube.com/watch?v=HAgf3DjYmDo
  const playlistId = "HAgf3DjYmDo"

  // Sound effects
  const sounds = {
    click: new Audio("/click.mp3"),
    alert: new Audio("/alert.mp3"),
    scan: new Audio("/scan.mp3"),
  }

  // Play sound effect
  const playSound = (sound: keyof typeof sounds) => {
    if (!isMuted) {
      sounds[sound].volume = volume / 100
      sounds[sound].play()
    }
  }

  // Toggle mute state
  const toggleMute = () => {
    playSound("click")
    setIsMuted(!isMuted)

    // Control YouTube player volume
    if (playerRef.current && playerRef.current.contentWindow) {
      try {
        if (isMuted) {
          playerRef.current.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', "*")
          playerRef.current.contentWindow.postMessage(`{"event":"command","func":"setVolume","args":[${volume}]}`, "*")
        } else {
          playerRef.current.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', "*")
        }
      } catch (error) {
        console.error("Error controlling YouTube player:", error)
      }
    }
  }

  // Handle volume change
  const handleVolumeChange = (newVolume: number[]) => {
    const vol = newVolume[0]
    setVolume(vol)

    // Update YouTube player volume
    if (playerRef.current && playerRef.current.contentWindow && !isMuted) {
      try {
        playerRef.current.contentWindow.postMessage(`{"event":"command","func":"setVolume","args":[${vol}]}`, "*")
      } catch (error) {
        console.error("Error setting YouTube volume:", error)
      }
    }
  }

  // Toggle play/pause
  const togglePlay = () => {
    playSound("click")
    setIsPlaying(!isPlaying)

    // Control YouTube player playback
    if (playerRef.current && playerRef.current.contentWindow) {
      try {
        if (isPlaying) {
          playerRef.current.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*")
        } else {
          playerRef.current.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*")
        }
      } catch (error) {
        console.error("Error controlling YouTube playback:", error)
      }
    }
  }

  return (
    <div className={cn("fixed bottom-4 right-4 z-50", className)}>
      <div
        className={cn(
          "bg-black/90 border border-green-900/50 rounded-md transition-all duration-300 overflow-hidden flex items-center",
          isExpanded ? "w-80 p-3" : "w-12 h-12",
        )}
      >
        {isExpanded ? (
          <>
            <div className="flex-1 mr-3">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-green-500 font-mono truncate">{currentTrack}</div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-green-500 hover:text-green-400 hover:bg-green-900/20"
                    onClick={togglePlay}
                  >
                    {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-green-500 hover:text-green-400 hover:bg-green-900/20"
                    onClick={toggleMute}
                  >
                    {isMuted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                  </Button>
                </div>
              </div>
              <Slider
                value={[volume]}
                min={0}
                max={100}
                step={1}
                onValueChange={handleVolumeChange}
                className="h-1.5"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-green-500 hover:text-green-400 hover:bg-green-900/20 flex-shrink-0"
              onClick={() => {
                playSound("click")
                setIsExpanded(false)
              }}
            >
              <Music className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 text-green-500 hover:text-green-400 hover:bg-green-900/20"
            onClick={() => {
              playSound("click")
              setIsExpanded(true)
            }}
          >
            <Music className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Hidden YouTube iframe player */}
      <div className="hidden">
        <iframe
          ref={playerRef}
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${playlistId}?enablejsapi=1&autoplay=1&loop=1&controls=0&disablekb=1&fs=0&modestbranding=1&rel=0&mute=1`}
          title="YouTube music player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </div>
    </div>
  )
}

