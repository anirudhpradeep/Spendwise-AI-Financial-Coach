"use client"

import { useState } from "react"
import { Shuffle } from "lucide-react"

interface Scenario {
  name: string
  description: string
  changes: {
    foodReduction?: number
    transportReduction?: number
    shoppingReduction?: number
    rentIncrease?: number
  }
}

const scenarios: Scenario[] = [
  {
    name: "Reduce Outings",
    description: "Cut food delivery and entertainment by 500",
    changes: { foodReduction: 500, shoppingReduction: 300 },
  },
  {
    name: "Rent Increase",
    description: "What if your rent increases by 2000?",
    changes: { rentIncrease: 2000 },
  },
  {
    name: "Income Boost",
    description: "Earn 13500 more this month",
    changes: {},
  },
]

export default function ScenarioTester() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null)
  const [customScenario, setCustomScenario] = useState({
    foodReduction: 0,
    transportReduction: 0,
    shoppingReduction: 0,
    rentIncrease: 0,
  })

  const baseSpending = {
    food: 2500,
    transport: 1500,
    shopping: 2000,
    rent: 15000,
  }

  const calculateScenario = (changes: any) => {
    const newSpending = { ...baseSpending }
    if (changes.foodReduction) newSpending.food -= changes.foodReduction
    if (changes.transportReduction) newSpending.transport -= changes.transportReduction
    if (changes.shoppingReduction) newSpending.shopping -= changes.shoppingReduction
    if (changes.rentIncrease) newSpending.rent += changes.rentIncrease
    return newSpending
  }

  const currentSpending = calculateScenario(selectedScenario?.changes || customScenario)
  const totalCurrent = Object.values(currentSpending).reduce((a, b) => a + b, 0)
  const totalBase = Object.values(baseSpending).reduce((a, b) => a + b, 0)
  const savings = totalBase - totalCurrent

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">What-If Scenario Tester</h1>
        <p className="text-muted-foreground">Test financial scenarios and see their impact on your savings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scenarios */}
        <div className="lg:col-span-1">
          <h2 className="text-lg font-semibold text-foreground mb-4">Pre-built Scenarios</h2>
          <div className="space-y-3">
            {scenarios.map((scenario, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedScenario(scenario)}
                className={`w-full p-4 rounded-lg border transition-all text-left ${
                  selectedScenario?.name === scenario.name
                    ? "bg-primary/10 border-primary"
                    : "bg-card border-border hover:border-primary/50"
                }`}
              >
                <h3 className="font-semibold text-foreground mb-1">{scenario.name}</h3>
                <p className="text-sm text-muted-foreground">{scenario.description}</p>
              </button>
            ))}
          </div>

          {/* Custom Scenario */}
          <div className="mt-6 bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-4">Custom Scenario</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-muted-foreground block mb-1">Food Reduction (₹)</label>
                <input
                  type="number"
                  min="0"
                  max="2500"
                  value={customScenario.foodReduction}
                  onChange={(e) => {
                    setSelectedScenario(null)
                    setCustomScenario({ ...customScenario, foodReduction: Number.parseInt(e.target.value) || 0 })
                  }}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                />
                <span className="text-xs text-foreground">₹{customScenario.foodReduction}</span>
              </div>
              <div>
                <label className="text-sm text-muted-foreground block mb-1">Transport Reduction (₹)</label>
                <input
                  type="number"
                  min="0"
                  max="1500"
                  value={customScenario.transportReduction}
                  onChange={(e) => {
                    setSelectedScenario(null)
                    setCustomScenario({ ...customScenario, transportReduction: Number.parseInt(e.target.value) || 0 })
                  }}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                />
                <span className="text-xs text-foreground">₹{customScenario.transportReduction}</span>
              </div>
              <div>
                <label className="text-sm text-muted-foreground block mb-1">Shopping Reduction (₹)</label>
                <input
                  type="number"
                  min="0"
                  max="2000"
                  value={customScenario.shoppingReduction}
                  onChange={(e) => {
                    setSelectedScenario(null)
                    setCustomScenario({ ...customScenario, shoppingReduction: Number.parseInt(e.target.value) || 0 })
                  }}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                />
                <span className="text-xs text-foreground">₹{customScenario.shoppingReduction}</span>
              </div>
              <div>
                <label className="text-sm text-muted-foreground block mb-1">Rent Increase (₹)</label>
                <input
                  type="number"
                  min="0"
                  max="5000"
                  value={customScenario.rentIncrease}
                  onChange={(e) => {
                    setSelectedScenario(null)
                    setCustomScenario({ ...customScenario, rentIncrease: Number.parseInt(e.target.value) || 0 })
                  }}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                />
                <span className="text-xs text-foreground">₹{customScenario.rentIncrease}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-primary to-secondary rounded-lg p-8 text-primary-foreground mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Shuffle className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Scenario Impact</h2>
            </div>
            <p className="mb-6 opacity-90">
              {selectedScenario ? selectedScenario.name : "Custom Scenario"} - See how your finances change
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-primary-foreground/20 rounded-lg p-4">
                <p className="text-sm opacity-75 mb-1">Current Monthly Spending</p>
                <p className="text-3xl font-bold">₹{totalCurrent.toLocaleString()}</p>
              </div>
              <div className="bg-primary-foreground/20 rounded-lg p-4">
                <p className="text-sm opacity-75 mb-1">Potential Savings</p>
                <p className="text-3xl font-bold text-accent">+₹{savings.toLocaleString()}</p>
              </div>
            </div>

            <div className="bg-primary-foreground/20 rounded-lg p-4">
              <p className="text-sm opacity-75 mb-2">Annual Impact</p>
              <p className="text-2xl font-bold">₹{(savings * 12).toLocaleString()}</p>
            </div>
          </div>

          {/* Breakdown */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-4">Spending Breakdown</h3>
            <div className="space-y-4">
              {Object.entries(currentSpending).map(([category, amount]) => {
                const baseAmount = baseSpending[category as keyof typeof baseSpending]
                const change = amount - baseAmount

                return (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground capitalize mb-1">{category}</p>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${change < 0 ? "bg-accent" : "bg-destructive"}`}
                          style={{ width: `${(amount / baseAmount) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <p className="text-sm font-semibold text-foreground">₹{amount.toLocaleString()}</p>
                      <p className={`text-xs ${change < 0 ? "text-accent" : "text-destructive"}`}>
                        {change < 0 ? "-" : "+"}
                        {Math.abs(change).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
