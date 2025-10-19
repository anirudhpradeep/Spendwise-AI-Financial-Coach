"use client"

import { useState } from "react"
import { Menu, X, TrendingUp, PieChart, Zap, Target, Shuffle, Trophy, BookOpen, TrendingDown } from "lucide-react"

interface NavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: TrendingUp },
    { id: "expenses", label: "Expenses", icon: PieChart },
    { id: "insights", label: "AI Insights", icon: Zap },
    { id: "goals", label: "Goals & Challenges", icon: Target },
    { id: "scenarios", label: "Scenarios", icon: Shuffle },
    { id: "investment", label: "Investment Insight", icon: TrendingDown },
    { id: "gamification", label: "Achievements & Peers", icon: Trophy },
    { id: "education", label: "Learn", icon: BookOpen },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 bg-card border-b border-border shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:inline">Spendwise</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-all ${
                    activeTab === item.id ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id)
                    setIsOpen(false)
                  }}
                  className={`w-full px-4 py-2 rounded-lg flex items-center gap-2 transition-all text-left ${
                    activeTab === item.id ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </nav>
  )
}
