"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Lock, User, AlertCircle, Loader2, Shield, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import GlitchText from "@/components/glitch-text"

export default function GMLoginPage() {
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [scanLines, setScanLines] = useState(true)
    const [loginSuccess, setLoginSuccess] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            setScanLines((prev) => !prev)
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        console.log("=== Dedicated GM Login Form Debug ===")
        console.log("Current state values:")
        console.log("Username:", username)
        console.log("Password:", password)

        try {
            console.log("Sending request to: /api/gm-login")
            console.log("Request payload:", { username, password })

            const response = await fetch("/api/gm-login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            console.log("Response data:", data);

            if (data.success) {
                setLoginSuccess(true);

                try {
                    console.log("Setting session storage for successful GM login:", {
                        isGMLoggedIn: true,
                        gmUsername: username,
                        gmLevel: data.data?.gmLevel || 0,
                        gmPermissions: data.data?.permissions || "",
                    })
                    sessionStorage.setItem("isGMLoggedIn", "true");
                    sessionStorage.setItem("gmUsername", username);
                    sessionStorage.setItem("gmLevel", data.data?.gmLevel || "0");
                    sessionStorage.setItem("gmPermissions", JSON.stringify(data.data?.permissions || ""));
                } catch (error) {
                    console.error("Error storing login state:", error);
                }

                setTimeout(() => {
                    console.log("Redirecting to: /gm-dashboard")
                    router.push("/gm-dashboard");
                }, 1500);
            } else {
                setError(data.error || "Invalid GM credentials. Access denied.");
                setIsLoading(false);

                setTimeout(() => {
                    setError("");
                }, 3000);
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("An error occurred during login. Please try again.");
            setIsLoading(false);

            setTimeout(() => {
                setError("");
            }, 3000);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="fixed inset-0 w-full h-full">
                    <img src="https://files.catbox.moe/3plf2v.gif" alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/70"></div>
                </div>
            </div>

            {scanLines && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
                    <div className="h-1 w-full bg-red-500/20 absolute animate-scan"></div>
                </div>
            )}

            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full border border-red-900/30 animate-spin-slow opacity-20"></div>
            <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full border border-red-900/20 animate-spin-reverse opacity-20"></div>

            <div className="container max-w-md px-4 z-20">
                <Card className="bg-black/80 border-red-900/50 backdrop-blur-sm overflow-hidden">
                    <CardContent className="p-0">
                        <div className="bg-gradient-to-r from-red-900/50 to-black border-b border-red-900/50 p-6 text-center relative">
                            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
                            <Terminal className="h-12 w-12 text-red-500 mx-auto mb-3" />
                            <GlitchText>
                                <h1 className="text-3xl font-vt323 text-red-400 tracking-wider">NOVATERRA</h1>
                            </GlitchText>
                            <p className="text-red-500/70 mt-1 text-sm">GAME MASTER TERMINAL</p>
                        </div>

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
                                            onChange={(e) => setUsername(e.target.value)}
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
                                            onChange={(e) => setPassword(e.target.value)}
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
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}