"use client"

import type { ReactNode } from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Lock, User, AlertCircle, Loader2, Shield, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GlitchText from "@/components/glitch-text"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [scanLines, setScanLines] = useState<boolean>(true)
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false)
  const [loginMode, setLoginMode] = useState<"user" | "gm">("user")
  const audioRef = useRef<HTMLIFrameElement>(null)

  // Simulate scan lines effect
  useEffect(() => {
    const interval = setInterval(() => {
      setScanLines((prev: boolean) => !prev)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Debug: Log current state values
    console.log("=== Combined Login Form Debug ===")
    console.log("Current state values:")
    console.log("Username:", username)
    console.log("Password:", password)
    console.log("Login Mode:", loginMode)

    try {
      // Debug: Log credentials before sending request
      console.log("Sending request to:", loginMode === "user" ? "/api/user-login" : "/api/gm-login")
      console.log("Request payload:", {
        username,
        password,
        mode: loginMode
      })

      // Changed: Dynamic endpoint selection based on login mode
      const endpoint = loginMode === "user" ? "/api/user-login" : "/api/gm-login"
      
      let response
      try {
        response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        })
      } catch (fetchError) {
        throw new Error("Unable to connect to the server. Please check your internet connection and try again.")
      }

      const data = await response.json()
      console.log("Response data:", data)

      if (data.success) {
        setLoginSuccess(true)

        // Stop the background audio when login is successful
        if (audioRef.current) {
          try {
            const iframe = audioRef.current
            iframe.src = "" // Removing the src will stop the audio
          } catch (error) {
            console.error("Could not stop audio:", error)
          }
        }

        // Changed: Improved session storage error handling
        try {
          console.log("Setting session storage for successful login:", {
            isLoggedIn: true,
            username,
            isGM: loginMode === "gm"
          })
          sessionStorage.setItem("isLoggedIn", "true")
          sessionStorage.setItem("username", username)
          sessionStorage.setItem("isGM", loginMode === "gm" ? "true" : "false")
        } catch (error) {
          console.error("Error storing login state:", error)
          setError("Failed to store login information. Please try again.")
          setIsLoading(false)
          return
        }

        setTimeout(() => {
          console.log("Redirecting to:", loginMode === "gm" ? "/gm-dashboard" : "/")
          router.push(loginMode === "gm" ? "/gm-dashboard" : "/")
        }, 1500)
      } else {
        setError(data.message || "Invalid credentials. Access denied.")
        setIsLoading(false)

        setTimeout(() => {
          setError("")
        }, 3000)
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message || "An error occurred during login. Please try again.")
      } else {
        setError("An unexpected error occurred. Please try again.")
      }
      setIsLoading(false)
      console.error("Login error:", error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Audio - YouTube Embed with volume set to 5% */}
      <div className="hidden">
        <iframe
          ref={audioRef}
          width="1"
          height="1"
          src="https://www.youtube.com/embed/_W1P7AvV17w?start=22492&autoplay=1&loop=1&playlist=_W1P7AvV17w&volume=5"
          allow="autoplay; encrypted-media"
          title="Background Audio"
        ></iframe>
      </div>

      {/* Background GIF */}
      <div className="absolute inset-0 z-0">
        <div className="fixed inset-0 w-full h-full">
          <img src="/login-background.gif" alt="" className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-black/80"></div>
        </div>
      </div>

      {/* Scan line effect */}
      {scanLines && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          <div className="h-1 w-full bg-green-500/20 absolute animate-scan"></div>
        </div>
      )}

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full border border-green-900/30 animate-spin-slow opacity-20"></div>
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full border border-green-900/20 animate-spin-reverse opacity-20"></div>

      <div className="container max-w-md px-4 z-20">
        <Card className="bg-black/90 border-green-900/50 backdrop-blur-sm overflow-hidden shadow-glow-green">
          <CardContent className="p-0">
            {/* Header */}
            <div
              className={`bg-gradient-to-r ${loginMode === "user" ? "from-green-900/50 to-black border-green-900/50" : "from-red-900/50 to-black border-red-900/50"} p-6 text-center relative`}
            >
              <div
                className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent ${loginMode === "user" ? "via-green-500/50" : "via-red-500/50"} to-transparent`}
              ></div>
              {loginMode === "user" ? (
                <Shield className="h-12 w-12 text-green-500 mx-auto mb-3" />
              ) : (
                <Terminal className="h-12 w-12 text-red-500 mx-auto mb-3" />
              )}
              <GlitchText onHover>
                <h1
                  className={`text-3xl font-vt323 ${loginMode === "user" ? "text-green-400" : "text-red-400"} tracking-wider`}
                >
                  NOVATERRA
                </h1>
              </GlitchText>
              <p className={`${loginMode === "user" ? "text-green-500/70" : "text-red-500/70"} mt-1 text-sm`}>
                {loginMode === "user" ? "SECURE ACCESS TERMINAL" : "GAME MASTER TERMINAL"}
              </p>
            </div>

            {/* Login tabs */}
            <Tabs
              defaultValue="user"
              className="w-full"
              onValueChange={(value: string) => {
                setLoginMode(value as "user" | "gm")
                setUsername("")
                setPassword("")
                setError("")
              }}
            >
              <div className="border-b border-green-900/30">
                <TabsList className="w-full bg-black grid grid-cols-2">
                  <TabsTrigger
                    value="user"
                    className="data-[state=active]:bg-green-900/20 data-[state=active]:text-green-400 text-slate-400"
                  >
                    USER LOGIN
                  </TabsTrigger>
                  <TabsTrigger
                    value="gm"
                    className="data-[state=active]:bg-red-900/20 data-[state=active]:text-red-400 text-slate-400"
                  >
                    GM LOGIN
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="user">
                {/* User login form */}
                <form onSubmit={handleLogin} className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-green-500/70 mb-1">
                        <User className="h-3 w-3 mr-1" />
                        <span>USER IDENTIFICATION</span>
                      </div>
                      <div className="relative">
                        <Input
                          type="text"
                          placeholder="Enter username"
                          value={username}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                          className="bg-black/50 border-green-900/50 text-green-400 placeholder:text-green-900/50 focus:border-green-500/50"
                          disabled={isLoading || loginSuccess}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-green-500/70 mb-1">
                        <Lock className="h-3 w-3 mr-1" />
                        <span>USER AUTHENTICATION</span>
                      </div>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password"
                          value={password}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                          className="bg-black/50 border-green-900/50 text-green-400 placeholder:text-green-900/50 focus:border-green-500/50"
                          disabled={isLoading || loginSuccess}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 text-green-500/50 hover:text-green-400 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={isLoading || loginSuccess}
                        >
                          {showPassword ? "HIDE" : "SHOW"}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <Alert variant="destructive" className="bg-green-900/20 border-green-900/50 text-green-400">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {loginSuccess && (
                    <Alert className="bg-green-900/20 border-green-900/50 text-green-400">
                      <Shield className="h-4 w-4" />
                      <AlertDescription>Access granted. Welcome, {username}.</AlertDescription>
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-green-900/50 hover:bg-green-900/70 text-green-400 border border-green-900/50"
                    disabled={isLoading || loginSuccess || !username || !password}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        AUTHENTICATING...
                      </>
                    ) : loginSuccess ? (
                      <>
                        <Shield className="mr-2 h-4 w-4" />
                        ACCESS GRANTED
                      </>
                    ) : (
                      "AUTHENTICATE"
                    )}
                  </Button>

                  <div className="text-center text-xs text-green-500/50 pt-2">
                    <p>NOVATERRA SECURE TERMINAL v2.4.3</p>
                    <p className="mt-1">UNAUTHORIZED ACCESS WILL BE PROSECUTED</p>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="gm">
                {/* GM login form */}
                <form onSubmit={handleLogin} className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-red-500/70 mb-1">
                        <User className="h-3 w-3 mr-1" />
                        <span>GM IDENTIFICATION</span>
                      </div>
                      <div className="relative">
                        <Input
                          type="text"
                          placeholder="Enter GM username"
                          value={username}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                          className="bg-black/50 border-red-900/50 text-red-400 placeholder:text-red-900/50 focus:border-red-500/50"
                          disabled={isLoading || loginSuccess}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-red-500/70 mb-1">
                        <Lock className="h-3 w-3 mr-1" />
                        <span>GM AUTHENTICATION</span>
                      </div>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter GM password"
                          value={password}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                          className="bg-black/50 border-red-900/50 text-red-400 placeholder:text-red-900/50 focus:border-red-500/50"
                          disabled={isLoading || loginSuccess}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 text-red-500/50 hover:text-red-400 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={isLoading || loginSuccess}
                        >
                          {showPassword ? "HIDE" : "SHOW"}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <Alert variant="destructive" className="bg-red-900/20 border-red-900/50 text-red-400">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {loginSuccess && (
                    <Alert className="bg-red-900/20 border-red-900/50 text-red-400">
                      <Shield className="h-4 w-4" />
                      <AlertDescription>GM access granted. Welcome, {username}.</AlertDescription>
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-red-900/50 hover:bg-red-900/70 text-red-400 border border-red-900/50"
                    disabled={isLoading || loginSuccess || !username || !password}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        AUTHENTICATING...
                      </>
                    ) : loginSuccess ? (
                      <>
                        <Shield className="mr-2 h-4 w-4" />
                        GM ACCESS GRANTED
                      </>
                    ) : (
                      "AUTHENTICATE"
                    )}
                  </Button>

                  <div className="text-center text-xs text-red-500/50 pt-2">
                    <p>NOVATERRA GM TERMINAL v1.2.1</p>
                    <p className="mt-1">UNAUTHORIZED ACCESS WILL BE PROSECUTED</p>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

