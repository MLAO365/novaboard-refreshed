"use client"

import { useState, useEffect, useRef } from "react"
import { Volume2, VolumeX, Play, Pause, SkipForward, SkipBack, Music, ListMusic } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

interface Track {
  title: string
  artist: string
  startTime: number
  endTime?: number
}

interface Playlist {
  name: string
  videoId: string
  tracks: Track[]
}

export default function MusicPlayer() {
  // Player state
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(10)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [showNotification, setShowNotification] = useState(false)
  const [isExpanded, setIsExpanded] = useState(true)
  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(0)
  const [debugMessage, setDebugMessage] = useState("")

  // Refs
  const playerRef = useRef<any>(null)
  const playerContainerRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const manualTrackChangeRef = useRef<boolean>(false)

  // Define playlists
  const playlists: Playlist[] = [
    {
      name: "Novaterra Mix",
      videoId: "AVEeE94myKU",
      tracks: [
        { title: "outer heaven", artist: "mindvacy", startTime: 0, endTime: 317 },
        { title: "Fleeting Frozen Heart", artist: "Xxtarlit⚸", startTime: 317, endTime: 502 },
        { title: "2322332323233333333", artist: "M.A.G", startTime: 502, endTime: 859 },
        { title: "pseudo", artist: "cavity", startTime: 859, endTime: 965 },
        { title: "Fine Night", artist: "Goreshit", startTime: 965, endTime: 1282 },
        { title: "hatred", artist: "Iwakura", startTime: 1282, endTime: 1800 },
      ],
    },
    {
      name: "Lineage Legacy Mix",
      videoId: "4V0QfbVkYC4",
      tracks: [
        { title: "Ciel", artist: "Yung Lain", startTime: 0, endTime: 193 },
        { title: "text me back", artist: "TOKYOPILL", startTime: 193, endTime: 258 },
        { title: "It's All Untrue", artist: "ivorydespair, Aak3", startTime: 258, endTime: 397 },
        { title: "please revere me, my purpose eludes me", artist: "lovekurousa", startTime: 397, endTime: 582 },
        { title: "not in love", artist: "Nakedleisure", startTime: 582, endTime: 754 },
        { title: "Interference", artist: "IY, DVRST", startTime: 754, endTime: 864 },
        { title: "You Miss Me pt. 1", artist: "Rory in early 20s", startTime: 864, endTime: 1061 },
        { title: "pls tell me what is ur dream", artist: "usedcvnt, Eden FM", startTime: 1061, endTime: 1217 },
        { title: "The Voices Told Me To", artist: "Puhf", startTime: 1217, endTime: 1433 },
        { title: "Ghost", artist: "Iwakura", startTime: 1433, endTime: 1600 },
      ],
    },
    {
      name: "GNPU Legacy Mix",
      videoId: "HUUy3mnAhCE",
      tracks: [
        { title: "ID - Rufus Du Sol - On My Knees", artist: "Skeler", startTime: 0, endTime: 216 },
        { title: "ID - Darci - Code Red", artist: "Skeler", startTime: 216, endTime: 359 },
        { title: "ID - Juice WRLD & Travis Scott - The Past", artist: "Skeler", startTime: 359, endTime: 531 },
        { title: "ID - IVOXYGEN - SAVAGE", artist: "Skeler", startTime: 531, endTime: 720 },
        { title: "ID - Darci - Won't", artist: "Skeler", startTime: 720, endTime: 887 },
        {
          title: "ID - $UICIDEBOY$ - Materialism as a Means to an End",
          artist: "Skeler",
          startTime: 887,
          endTime: 1022,
        },
        {
          title: "ID - Metro Boomin & Future ft. Kendrick Lamar - Like That",
          artist: "Skeler",
          startTime: 1022,
          endTime: 1176,
        },
        {
          title: "ID - $UICIDEBOY$ - Now I'm Up to My Neck With Offers",
          artist: "Skeler",
          startTime: 1176,
          endTime: 1350,
        },
        { title: "ID - Ellie Goulding - Starry Eyed + BONES", artist: "Skeler", startTime: 1350, endTime: 1618 },
        { title: "ID - IVOXYGEN - Lifestyle", artist: "Skeler", startTime: 1618, endTime: 1841 },
        { title: "ID", artist: "Skeler", startTime: 1841, endTime: 2004 },
        {
          title: "ID - Lithe - Fall Back + Jakone, Kiliana - Асфальт",
          artist: "Skeler",
          startTime: 2004,
          endTime: 2248,
        },
        { title: "ID - Travis Scott - I KNOW? & 1nonly - Scars", artist: "Skeler", startTime: 2248, endTime: 2477 },
        { title: "ID - Mantus - Blut und Scherben x Ivoxygen", artist: "Skeler", startTime: 2477, endTime: 2637 },
        { title: "ID - Superheaven - Younges Daughter", artist: "Skeler", startTime: 2637, endTime: 2820 },
        { title: "ID - 10AGE - Милая не дыши", artist: "Skeler", startTime: 2820, endTime: 3024 },
        { title: "ID - Rob Dougan - Clubbed to Death", artist: "Skeler", startTime: 3024, endTime: 3237 },
        { title: "ID - Xzibit - LAX", artist: "Skeler", startTime: 3237, endTime: 3405 },
        { title: "ID - ECKO - Dealer de Skilles", artist: "Skeler", startTime: 3405, endTime: 3546 },
        { title: "ID - Perfect Dark Pause Menu", artist: "Skeler", startTime: 3546, endTime: 3700 },
        { title: "ID - Mobb Deep - Survival of the Fittest", artist: "Skeler", startTime: 3700, endTime: 3889 },
        { title: "ID - Denzel Curry ft. That Mexican OT", artist: "Skeler", startTime: 3889, endTime: 4126 },
        { title: "ID - IVOXYGEN - Casino143", artist: "Skeler", startTime: 4126, endTime: 4287 },
        { title: "ID - Devilish Trio - Southern Hostility", artist: "Skeler", startTime: 4287, endTime: 4481 },
        { title: "ID - Haarper - Naga", artist: "Skeler", startTime: 4481, endTime: 4585 },
        { title: "ID - Travis Scott ft. Baby Keem - Vouge", artist: "Skeler", startTime: 4585, endTime: 4683 },
        { title: "ID - Flowdan - One Question", artist: "Skeler", startTime: 4683, endTime: 4799 },
        { title: "ID - HIDEYOSHI - Majinahanashi", artist: "Skeler", startTime: 4799, endTime: 4936 },
        { title: "ID - Digga D & Sav'O & Horrid1 ft. MSkum", artist: "Skeler", startTime: 4936, endTime: 5032 },
        { title: "ID - Dsavv - Drill Ain't Dead (Remix)", artist: "Skeler", startTime: 5032, endTime: 5105 },
        { title: "ID - Visages - Lunar Eclipse Feat. Strategy", artist: "Skeler", startTime: 5105, endTime: 5208 },
        { title: "ID - Elektryon - Call Me (feat. psCrix)", artist: "Skeler", startTime: 5208, endTime: 5325 },
        { title: "ID - Halo Combat Evolved Main Menu Theme", artist: "Skeler", startTime: 5325, endTime: 5414 },
        { title: "ID - Jesper Kyd - Night Time In New Orleans", artist: "Skeler", startTime: 5414, endTime: 5507 },
        { title: "ID - Jesper Kyd - Apocalypse", artist: "Skeler", startTime: 5507, endTime: 5634 },
        { title: "ID - Da Octopusss - Hell", artist: "Skeler", startTime: 5634, endTime: 5748 },
        { title: "ID", artist: "Skeler", startTime: 5748, endTime: 5870 },
        { title: "ID - Mash Milash - Hentai", artist: "Skeler", startTime: 5870, endTime: 5950 },
        { title: "ID - Bakey - Take It Further", artist: "Skeler", startTime: 5950, endTime: 6017 },
        { title: "ID", artist: "Skeler", startTime: 6017, endTime: 6131 },
        { title: "ID - deadmau5 & Kaskade - I Remember", artist: "Skeler", startTime: 6131, endTime: 6289 },
        { title: "ID - Ytho. - Silk", artist: "Skeler", startTime: 6289, endTime: 6380 },
        { title: "ID - Our Kingdom - The Gaia Project", artist: "Skeler", startTime: 6380, endTime: 6541 },
        { title: "ID - Gareth Emery ft. Bo Bruce - U", artist: "Skeler", startTime: 6541, endTime: 6665 },
        { title: "ID - Joseph Ray - Cos of You", artist: "Skeler", startTime: 6665, endTime: 6920 },
        { title: "ID - Gesaffelstein - PURSUIT", artist: "Skeler", startTime: 6920, endTime: 7189 },
        { title: "ID - Godsmack - Bulletproof", artist: "Skeler", startTime: 7189, endTime: 7341 },
        { title: "ID", artist: "Skeler", startTime: 7341, endTime: 7436 },
        { title: "ID - Bat for Lashes - Daniel (Mt Eden Remix)", artist: "Skeler", startTime: 7436, endTime: 7567 },
        { title: "ID - IVOXYGEN - Fallen Stars", artist: "Skeler", startTime: 7567, endTime: 7704 },
        { title: "ID - Амура - Спрячься", artist: "Skeler", startTime: 7704, endTime: 7905 },
        { title: "ID - Barlas & Mert - Killing Me", artist: "Skeler", startTime: 7905, endTime: 8039 },
        { title: "ID - Eminem - Mockingbird + Lil Peep", artist: "Skeler", startTime: 8039, endTime: 8237 },
        { title: "ID - Lil Peep - The Way I See Things", artist: "Skeler", startTime: 8237, endTime: 8387 },
        { title: "ID - Linkin Park - In The End", artist: "Skeler", startTime: 8387, endTime: 8486 },
        { title: "ID - Gate - Kei (Pillars Remix)", artist: "Skeler", startTime: 8486, endTime: 8623 },
        { title: "ID - Øfdream - Thelema", artist: "Skeler", startTime: 8623, endTime: 8751 },
        { title: "ID - iamamiwhoami - Fountain", artist: "Skeler", startTime: 8751, endTime: 8935 },
        { title: "ID - Mareux - The Perfect Girl", artist: "Skeler", startTime: 8935, endTime: 9072 },
        { title: "ID - Lorn - Acid Rain", artist: "Skeler", startTime: 9072, endTime: 9200 },
      ],
    },
    {
      name: "Valkyrae's Playlist",
      videoId: "Bh1Pr6ef_XI",
      tracks: [
        { title: "To All of You", artist: "Syd Matters", startTime: 0, endTime: 284 },
        { title: "Crosses", artist: "José González", startTime: 284, endTime: 450 },
        { title: "Santa Monica Dream", artist: "Angus & Julia Stone", startTime: 450, endTime: 780 },
        { title: "Piano Fire", artist: "Sparklehorse", startTime: 780, endTime: 944 },
        { title: "Something Good", artist: "alt-J", startTime: 944, endTime: 1164 },
        { title: "Mt. Washington", artist: "Local Natives", startTime: 1164, endTime: 1362 },
        { title: "Lua", artist: "Bright Eyes", startTime: 1362, endTime: 1634 },
        { title: "Kids Will Be Skeletons", artist: "Mogwai", startTime: 1634, endTime: 1963 },
        { title: "In My Mind", artist: "Amanda Palmer feat. Brian Viglione", startTime: 1963, endTime: 2219 },
        { title: "Mountains", artist: "Message To Bears", startTime: 2219, endTime: 2454 },
        { title: "Got Well Soon", artist: "Breton", startTime: 2454, endTime: 2746 },
        { title: "The Sense of Me", artist: "Mudflow", startTime: 2746, endTime: 2902 },
        { title: "Spanish Sahara", artist: "Foals", startTime: 2902, endTime: 3311 },
        { title: "Obstacles", artist: "Syd Matters", startTime: 3311, endTime: 3524 },
        { title: "Golden Hour", artist: "Jonathan Morali", startTime: 3524, endTime: 3683 },
        { title: "The Storm", artist: "Jonathan Morali", startTime: 3683, endTime: 3791 },
        { title: "Blackwell Academy", artist: "Jonathan Morali", startTime: 3791, endTime: 3974 },
        { title: "Kate", artist: "Jonathan Morali", startTime: 3974, endTime: 4071 },
        { title: "Timeless", artist: "Jonathan Morali", startTime: 4071, endTime: 4187 },
        { title: "Timelines", artist: "Jonathan Morali", startTime: 4187, endTime: 4387 },
        { title: "Night Walk", artist: "Jonathan Morali", startTime: 4387, endTime: 4544 },
        { title: "Max & Chloe", artist: "Jonathan Morali", startTime: 4544, endTime: 4800 },
      ],
    },
    {
      name: "Leviathans mix",
      videoId: "nDLu0I4UwL0",
      tracks: [
        { title: "Miss You!", artist: "CORPSE", startTime: 0, endTime: 106 },
        { title: "Goodbye", artist: "FEDER", startTime: 106, endTime: 405 },
        { title: "INDUSTRY BABY", artist: "Lil Nas X, Jack Harlow", startTime: 405, endTime: 649 },
        { title: "I WANNA BE YOUR SLAVE", artist: "Måneskin", startTime: 649, endTime: 871 },
        { title: "Beggin'", artist: "Måneskin", startTime: 871, endTime: 1110 },
        { title: "Praise God", artist: "Kayne West", startTime: 1110, endTime: 1342 },
        { title: "The Real Slim Shady", artist: "Eminem", startTime: 1342, endTime: 1698 },
        { title: "Everything Black", artist: "Unlike Pluto", startTime: 1698, endTime: 1968 },
        { title: "5% TINT", artist: "Travis Scott", startTime: 1968, endTime: 2180 },
        { title: "Venom", artist: "Little Simz", startTime: 2180, endTime: 2361 },
        { title: "HOT DEMON B!TCHES NEAR U ! ! !", artist: "CORPSE", startTime: 2361, endTime: 2472 },
        { title: "Ending Song", artist: "Shekills", startTime: 2472, endTime: 2600 },
      ],
    },
  ]

  // Get current playlist
  const currentPlaylist = playlists[currentPlaylistIndex]

  // Load YouTube API
  useEffect(() => {
    // Only load the API once
    if (window.YT) return

    const tag = document.createElement("script")
    tag.src = "https://www.youtube.com/iframe_api"
    const firstScriptTag = document.getElementsByTagName("script")[0]
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

    // Define the onYouTubeIframeAPIReady function
    window.onYouTubeIframeAPIReady = () => {
      // The API will call this function when ready
      console.log("YouTube API ready")
    }

    return () => {
      // Clean up
      if (window.onYouTubeIframeAPIReady) {
        window.onYouTubeIframeAPIReady = undefined;
      }
    }
  }, [])

  // Initialize player when component mounts or playlist changes
  useEffect(() => {
    // Clean up previous player and interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    if (playerRef.current) {
      try {
        playerRef.current.destroy()
      } catch (e) {
        console.error("Error destroying player:", e)
      }
      playerRef.current = null
    }

    // Reset state
    setCurrentTrackIndex(0)
    setCurrentTime(0)
    setIsPlaying(false)
    manualTrackChangeRef.current = false

    // Function to initialize the player
    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) {
        // If YouTube API isn't ready yet, try again in 500ms
        setTimeout(initPlayer, 500)
        return
      }

      if (!playerContainerRef.current) return

      try {
        // Create a new player instance
        playerRef.current = new window.YT.Player(playerContainerRef.current, {
          height: "0",
          width: "0",
          videoId: currentPlaylist.videoId,
          playerVars: {
            autoplay: 0, // Start paused
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            start: currentPlaylist.tracks[0].startTime,
          },
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
            onError: (e: Error) => {
              console.error("YouTube player error:", e)
              setDebugMessage(`Player error: ${e.message}`)
            },
          },
        })
      } catch (e) {
        console.error("Error creating player:", e)
        setDebugMessage(`Error creating player: ${e}`)
      }
    }

    // Handler for when the player is ready
    const onPlayerReady = (event: any) => {
      // Set initial volume
      event.target.setVolume(volume)

      // Start the time tracking interval
      intervalRef.current = setInterval(() => {
        if (!playerRef.current || !playerRef.current.getCurrentTime) return

        try {
          const currentTime = playerRef.current.getCurrentTime()
          setCurrentTime(currentTime)

          // Only check for track changes if we're not in the middle of a manual change
          if (!manualTrackChangeRef.current) {
            checkCurrentTrack(currentTime)
          }
        } catch (e) {
          console.error("Error in time tracking:", e)
        }
      }, 1000)

      // Start playing
      try {
        event.target.playVideo()
        setIsPlaying(true)
      } catch (e) {
        console.error("Error starting playback:", e)
      }
    }

    // Handler for player state changes
    const onPlayerStateChange = (event: any) => {
      // Update playing state
      setIsPlaying(event.data === window.YT.PlayerState.PLAYING)

      // If the video ended, restart from the beginning
      if (event.data === window.YT.PlayerState.ENDED) {
        playerRef.current.seekTo(currentPlaylist.tracks[0].startTime, true)
        playerRef.current.playVideo()
      }
    }

    // Initialize the player
    initPlayer()

    // Clean up on unmount or when playlist changes
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }

      if (playerRef.current) {
        try {
          playerRef.current.destroy()
        } catch (e) {
          console.error("Error destroying player:", e)
        }
      }
    }
  }, [currentPlaylistIndex])

  // Update volume when it changes
  useEffect(() => {
    if (playerRef.current && !isMuted) {
      try {
        playerRef.current.setVolume(volume)
      } catch (e) {
        console.error("Error setting volume:", e)
      }
    }
  }, [volume, isMuted])

  // Function to check which track is currently playing
  const checkCurrentTrack = (time: number) => {
    const tracks = currentPlaylist.tracks

    for (let i = 0; i < tracks.length; i++) {
      const track = tracks[i]
      if (time >= track.startTime && time < (track.endTime || Number.POSITIVE_INFINITY)) {
        // If we're on a different track, update the state
        if (i !== currentTrackIndex) {
          setCurrentTrackIndex(i)
          showTrackNotification()
          setDebugMessage(`Auto-detected track change to: ${track.title}`)
        }
        return
      }
    }

    // If we're at the end of the last track, go to the first track
    const lastTrack = tracks[tracks.length - 1]
    if (time >= (lastTrack.endTime || 0)) {
      setCurrentTrackIndex(0)
      try {
        playerRef.current.seekTo(tracks[0].startTime, true)
        showTrackNotification()
        setDebugMessage("Reached end of playlist, restarting")
      } catch (e) {
        console.error("Error seeking to first track:", e)
      }
    }
  }

  // Show notification when track changes
  const showTrackNotification = () => {
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 5000)
  }

  // Change playlist
  const changePlaylist = (index: number) => {
    if (index === currentPlaylistIndex) return
    setCurrentPlaylistIndex(index)
  }

  // Play/Pause
  const togglePlay = () => {
    if (!playerRef.current) return

    try {
      if (isPlaying) {
        playerRef.current.pauseVideo()
      } else {
        playerRef.current.playVideo()
      }
    } catch (e) {
      console.error("Error toggling play state:", e)
      setDebugMessage(`Error toggling play: ${e}`)
    }
  }

  // Mute/Unmute
  const toggleMute = () => {
    if (!playerRef.current) return

    try {
      if (isMuted) {
        playerRef.current.unMute()
        playerRef.current.setVolume(volume)
      } else {
        playerRef.current.mute()
      }
      setIsMuted(!isMuted)
    } catch (e) {
      console.error("Error toggling mute:", e)
    }
  }

  // Handle volume change
  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume[0])
  }

  // Skip to next track
  const nextTrack = () => {
    if (!playerRef.current) return

    const nextIndex = (currentTrackIndex + 1) % currentPlaylist.tracks.length

    try {
      // Set flag to prevent auto-detection during manual change
      manualTrackChangeRef.current = true

      // Seek to the next track
      playerRef.current.seekTo(currentPlaylist.tracks[nextIndex].startTime, true)

      // Update state
      setCurrentTrackIndex(nextIndex)
      showTrackNotification()
      setDebugMessage(`Manually changed to next track: ${currentPlaylist.tracks[nextIndex].title}`)

      // Reset flag after a short delay
      setTimeout(() => {
        manualTrackChangeRef.current = false
      }, 1000)
    } catch (e) {
      console.error("Error skipping to next track:", e)
      manualTrackChangeRef.current = false
    }
  }

  // Skip to previous track
  const prevTrack = () => {
    if (!playerRef.current) return

    const prevIndex = currentTrackIndex === 0 ? currentPlaylist.tracks.length - 1 : currentTrackIndex - 1

    try {
      // Set flag to prevent auto-detection during manual change
      manualTrackChangeRef.current = true

      // Seek to the previous track
      playerRef.current.seekTo(currentPlaylist.tracks[prevIndex].startTime, true)

      // Update state
      setCurrentTrackIndex(prevIndex)
      showTrackNotification()
      setDebugMessage(`Manually changed to previous track: ${currentPlaylist.tracks[prevIndex].title}`)

      // Reset flag after a short delay
      setTimeout(() => {
        manualTrackChangeRef.current = false
      }, 1000)
    } catch (e) {
      console.error("Error skipping to previous track:", e)
      manualTrackChangeRef.current = false
    }
  }

  // Select a specific track
  const selectTrack = (index: number) => {
    if (!playerRef.current || index === currentTrackIndex) return

    try {
      // Set flag to prevent auto-detection during manual change
      manualTrackChangeRef.current = true

      // Seek to the selected track
      playerRef.current.seekTo(currentPlaylist.tracks[index].startTime, true)

      // Update state
      setCurrentTrackIndex(index)
      showTrackNotification()
      setDebugMessage(`Manually selected track: ${currentPlaylist.tracks[index].title}`)

      // Reset flag after a short delay
      setTimeout(() => {
        manualTrackChangeRef.current = false
      }, 1000)
    } catch (e) {
      console.error("Error selecting track:", e)
      manualTrackChangeRef.current = false
    }
  }

  // Format time (seconds to MM:SS)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  // Calculate progress percentage
  const calculateProgress = () => {
    const track = currentPlaylist.tracks[currentTrackIndex]
    if (!track) return 0

    const trackDuration = (track.endTime || 0) - track.startTime
    const trackProgress = currentTime - track.startTime

    return Math.min(100, Math.max(0, (trackProgress / trackDuration) * 100))
  }

  return (
    <div className="relative">
      {/* Hidden YouTube player container */}
      <div className="hidden">
        <div ref={playerContainerRef} id="youtube-player"></div>
      </div>

      {/* Music Player UI */}
      <div className={cn("transition-all duration-300 ease-in-out", isExpanded ? "w-full" : "w-12")}>
        <div className="bg-black/60 backdrop-blur-md border border-green-900/50 rounded-md overflow-hidden">
          {/* Header with toggle */}
          <div className="flex items-center justify-between p-2 border-b border-green-900/30">
            <div className={cn("flex items-center space-x-2", !isExpanded && "hidden")}>
              <Music className="h-4 w-4 text-green-500" />
              <span className="text-xs font-mono text-green-500">MUSIC PLAYER</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-green-500 hover:text-green-400 hover:bg-green-900/20"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Music className="h-4 w-4" />
            </Button>
          </div>

          {/* Player content */}
          {isExpanded && (
            <div className="p-3">
              {/* Playlist selector */}
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs text-green-500/70 font-mono">PLAYLIST</div>
                <div className="flex flex-wrap gap-1 justify-end">
                  {playlists.map((playlist, index) => (
                    <Button
                      key={index}
                      variant={currentPlaylistIndex === index ? "default" : "outline"}
                      size="sm"
                      className={cn(
                        "h-6 text-xs py-0 px-2",
                        currentPlaylistIndex === index
                          ? "bg-green-900/50 text-green-400 hover:bg-green-900/60"
                          : "bg-black/30 text-green-500/70 hover:text-green-400 border-green-900/30",
                      )}
                      onClick={() => changePlaylist(index)}
                    >
                      {playlist.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Now playing */}
              <div className="mb-3">
                <div className="text-xs text-green-500/70 font-mono mb-1">NOW PLAYING</div>
                <div className="text-sm font-medium text-green-400 truncate">
                  {currentPlaylist.tracks[currentTrackIndex]?.title}
                </div>
                <div className="text-xs text-green-500/70 truncate">
                  {currentPlaylist.tracks[currentTrackIndex]?.artist}
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1 bg-green-900/30 rounded-full mb-3 overflow-hidden">
                <div className="h-full bg-green-500/70 rounded-full" style={{ width: `${calculateProgress()}%` }}></div>
              </div>

              {/* Time */}
              <div className="flex justify-between text-xs text-green-500/70 mb-3">
                <span>
                  {formatTime(Math.max(0, currentTime - currentPlaylist.tracks[currentTrackIndex]?.startTime))}
                </span>
                <span>
                  {formatTime(
                    (currentPlaylist.tracks[currentTrackIndex]?.endTime || 0) -
                      currentPlaylist.tracks[currentTrackIndex]?.startTime,
                  )}
                </span>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-green-500 hover:text-green-400 hover:bg-green-900/20"
                    onClick={prevTrack}
                  >
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-green-500 hover:text-green-400 hover:bg-green-900/20"
                    onClick={togglePlay}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-green-500 hover:text-green-400 hover:bg-green-900/20"
                    onClick={nextTrack}
                  >
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-green-500 hover:text-green-400 hover:bg-green-900/20"
                    onClick={toggleMute}
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                  <div className="w-20">
                    <Slider
                      value={[volume]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={handleVolumeChange}
                      className="h-1.5"
                    />
                  </div>
                </div>
              </div>

              {/* Tracks list */}
              <div className="mt-4">
                <div className="text-xs text-green-500/70 font-mono mb-2 flex items-center">
                  <ListMusic className="h-3 w-3 mr-1" />
                  <span>TRACKS</span>
                </div>
                <div className="space-y-1 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
                  {currentPlaylist.tracks.map((track, index) => (
                    <div
                      key={index}
                      className={cn(
                        "text-xs p-1.5 rounded cursor-pointer transition-colors",
                        currentTrackIndex === index
                          ? "bg-green-900/30 text-green-400"
                          : "hover:bg-green-900/20 text-green-500/70",
                      )}
                      onClick={() => selectTrack(index)}
                    >
                      <div className="font-medium truncate">{track.title}</div>
                      <div className="text-[10px] opacity-70 truncate">{track.artist}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Debug info - hidden in production */}
              {debugMessage && (
                <div className="mt-2 text-xs text-green-500/50 border-t border-green-900/20 pt-2 hidden">
                  {debugMessage}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Track change notification */}
      <div
        className={cn(
          "fixed bottom-20 right-4 z-50 bg-black/80 border border-green-500/30 rounded-md p-3 transition-all duration-300 transform",
          showNotification ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none",
        )}
      >
        <div className="flex items-start">
          <div className="mr-3">
            <Music className="h-5 w-5 text-green-500" />
          </div>
          <div>
            <div className="text-sm font-medium text-green-400">Now Playing</div>
            <div className="text-xs text-green-500 mt-1">{currentPlaylist.tracks[currentTrackIndex]?.title}</div>
            <div className="text-xs text-green-500/70 mt-0.5">{currentPlaylist.tracks[currentTrackIndex]?.artist}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

