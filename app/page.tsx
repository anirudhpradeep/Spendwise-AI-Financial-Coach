"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Dashboard from "@/components/dashboard"
import ExpenseLedger from "@/components/expense-ledger"
import AIInsights from "@/components/ai-insights"
import SavingsGoals from "@/components/savings-goals"
import ScenarioTester from "@/components/scenario-tester"
import InvestmentInsight from "@/components/investment-insight"
import Gamification from "@/components/gamification"
import EducationHub from "@/components/education-hub"

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />
      case "expenses":
        return <ExpenseLedger />
      case "insights":
        return <AIInsights />
      case "goals":
        return <SavingsGoals />
      case "scenarios":
        return <ScenarioTester />
      case "investment":
        return <InvestmentInsight />
      case "gamification":
        return <Gamification />
      case "education":
        return <EducationHub />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="pt-20">{renderContent()}</main>
    </div>
  )
}
