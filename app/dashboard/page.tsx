"use client"
import { Command } from "lucide-react"
import PageHeader from "@/components/page-header"
import TokenBalance from "@/components/token-balance"

export default function DashboardPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <TokenBalance />
            </div>
            <PageHeader
                title="COMMAND DASHBOARD"
                subtitle="Overview of the Novaterra universe"
                icon={<Command className="h-6 w-6 text-green-500" />}
                accentColor="green"
            />

            {/* Remove Tabs Content, Tabs, TabsList, TabsTrigger */}

            {/* If you have other dashboard content, add it here */}

        </div>
    );
}