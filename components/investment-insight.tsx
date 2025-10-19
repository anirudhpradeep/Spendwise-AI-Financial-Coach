"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { TrendingUp, Calculator } from "lucide-react"

const sipProjectionData = [
  { year: 1, amount: 12000 },
  { year: 2, amount: 25200 },
  { year: 3, amount: 39600 },
  { year: 4, amount: 55200 },
  { year: 5, amount: 72000 },
  { year: 10, amount: 156000 },
  { year: 15, amount: 270000 },
  { year: 20, amount: 420000 },
]

export default function InvestmentInsight() {
  const [sipAmount, setSipAmount] = useState(1000)
  const [annualReturn, setAnnualReturn] = useState(12)
  const [years, setYears] = useState(5)

  // Calculate SIP returns
  const calculateSIP = () => {
    const monthlyRate = annualReturn / 100 / 12
    const months = years * 12
    const futureValue = sipAmount * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate))
    const totalInvested = sipAmount * months
    const gains = futureValue - totalInvested
    return { futureValue, totalInvested, gains }
  }

  const { futureValue, totalInvested, gains } = calculateSIP()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Investment Insight</h1>
        <p className="text-muted-foreground">Plan your investments with SIP calculator and projections</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* SIP Calculator */}
        <div className="lg:col-span-1 bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <Calculator className="w-6 h-6 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">SIP Calculator</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground block mb-2">Monthly Investment (₹)</label>
              <input
                type="number"
                value={sipAmount}
                onChange={(e) => setSipAmount(Number(e.target.value))}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
              />
              <p className="text-xs text-foreground mt-1">₹{sipAmount.toLocaleString()}</p>
            </div>

            <div>
              <label className="text-sm text-muted-foreground block mb-2">Expected Annual Return (%)</label>
              <input
                type="number"
                value={annualReturn}
                onChange={(e) => setAnnualReturn(Number(e.target.value))}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
              />
              <p className="text-xs text-foreground mt-1">{annualReturn}%</p>
            </div>

            <div>
              <label className="text-sm text-muted-foreground block mb-2">Investment Period (Years)</label>
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
              />
              <p className="text-xs text-foreground mt-1">{years} years</p>
            </div>
          </div>

          {/* Results */}
          <div className="mt-6 space-y-3 pt-6 border-t border-border">
            <div className="bg-primary/10 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Total Invested</p>
              <p className="text-2xl font-bold text-foreground">₹{totalInvested.toLocaleString()}</p>
            </div>
            <div className="bg-accent/10 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Expected Gains</p>
              <p className="text-2xl font-bold text-accent">₹{gains.toLocaleString()}</p>
            </div>
            <div className="bg-secondary/10 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Future Value</p>
              <p className="text-2xl font-bold text-secondary">₹{futureValue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Projection Chart */}
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">SIP Growth Projection</h2>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={sipProjectionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                stroke="var(--muted-foreground)"
                dataKey="year"
                label={{ value: "Years", position: "insideBottomRight", offset: -5 }}
              />
              <YAxis
                stroke="var(--muted-foreground)"
                label={{ value: "Amount (₹)", angle: -90, position: "insideLeft" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
                formatter={(value) => `₹${value.toLocaleString()}`}
              />
              <Legend />
              <Bar dataKey="amount" fill="var(--primary)" name="Projected Value" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Investment Tips */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-primary-foreground">
        <h2 className="text-lg font-semibold mb-4">Investment Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Start Early</h3>
            <p className="text-sm opacity-90">
              The power of compounding works best when you start investing early. Even small amounts can grow
              significantly over time.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Stay Consistent</h3>
            <p className="text-sm opacity-90">
              Regular SIP investments help you build discipline and take advantage of rupee cost averaging in market
              fluctuations.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Diversify</h3>
            <p className="text-sm opacity-90">
              Spread your investments across different asset classes to reduce risk and maximize returns over the long
              term.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
