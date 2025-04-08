import type React from "react"
import type { Metadata } from "next"
import { VT323, Space_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import AuthCheck from "@/components/auth-check"

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
})

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
})

export const metadata: Metadata = {
  title: "Novaterra | Game Information Hub",
  description: "Official information hub for the Novaterra game universe",
  generator: 'v0.dev',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: { url: '/apple-touch-icon.png' },
    shortcut: '/favicon.ico'
  }
}

// Update the RootLayout component to conditionally render different content based on the path
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${vt323.variable} ${spaceMono.variable} font-mono bg-black text-green-500`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <AuthCheck>{children}</AuthCheck>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'