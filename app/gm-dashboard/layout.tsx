import type React from "react"
import type { Metadata } from "next"
import GMAuthCheck from "@/components/gm-auth-check"

export const metadata: Metadata = {
  title: "Novaterra GM Dashboard",
  description: "Game Master control panel for the Novaterra universe",
}

export default function GMDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <GMAuthCheck>{children}</GMAuthCheck>
}

