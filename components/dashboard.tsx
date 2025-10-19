"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, TrendingDown, Target, AlertCircle } from "lucide-react"

const spendingData = [
  {
    day: "Mon",
    amount: 2400,
    categories: { Food: 1200, Transport: 600, Shopping: 600 },
  },
  {
    day: "Tue",
    amount: 1398,
    categories: { Food: 800, Transport: 300, Shopping: 298 },
  },
  {
    day: "Wed",
    amount: 9800,
    categories: { Food: 5000, Transport: 2000, Shopping: 2800 },
  },
  {
    day: "Thu",
    amount: 3908,
    categories: { Food: 2000, Transport: 900, Shopping: 1008 },
  },
  {
    day: "Fri",
    amount: 4800,
    categories: { Food: 2500, Transport: 1200, Shopping: 1100 },
  },
  {
    day: "Sat",
    amount: 3800,
    categories: { Food: 2000, Transport: 800, Shopping: 1000 },
  },
]

const categoryData = [
  { name: "Food", value: 35, color: "#f97316" },
  { name: "Transport", value: 20, color: "#3b82f6" },
  { name: "Shopping", value: 25, color: "#ec4899" },
  { name: "Entertainment", value: 15, color: "#8b5cf6" },
  { name: "Other", value: 5, color: "#22c55e" },
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload[0]) {
    const data = payload[0].payload
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="font-semibold text-foreground mb-2">{data.day}</p>
        <p className="text-sm text-muted-foreground mb-2">Total: ₹{data.amount.toLocaleString()}</p>
        <div className="space-y-1">
          {Object.entries(data.categories).map(([category, amount]: [string, any]) => (
            <p key={category} className="text-xs text-foreground">
              {category}: ₹{amount.toLocaleString()}
            </p>
          ))}
        </div>
      </div>
    )
  }
  return null
}

export default function Dashboard() {
  const monthlyIncome = 45000
  const monthlySpent = 18500
  const monthlySavings = monthlyIncome - monthlySpent

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, Coach!</h1>
        <p className="text-muted-foreground">Here's your financial overview for this month</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total Income */}
        <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Total Income</h3>
            <TrendingUp className="w-5 h-5 text-accent" />
          </div>
          <p className="text-2xl font-bold text-foreground">₹45,000</p>
          <p className="text-xs text-accent mt-2">+12% from last month</p>
        </div>

        {/* Total Spent */}
        <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Total Spent</h3>
            <TrendingDown className="w-5 h-5 text-destructive" />
          </div>
          <p className="text-2xl font-bold text-foreground">₹18,500</p>
          <p className="text-xs text-destructive mt-2">-8% from last month</p>
        </div>

        {/* Monthly Savings */}
        <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Monthly Savings</h3>
            <Target className="w-5 h-5 text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground">₹{monthlySavings.toLocaleString()}</p>
          <p className="text-xs text-primary mt-2">
            {((monthlySavings / monthlyIncome) * 100).toFixed(1)}% of income saved
          </p>
        </div>

        {/* Survival Fund */}
        <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Survival Fund</h3>
            <AlertCircle className="w-5 h-5 text-secondary" />
          </div>
          <p className="text-2xl font-bold text-foreground">2.5 months</p>
          <p className="text-xs text-secondary mt-2">Goal: 3 months</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Spending Trend */}
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Spending Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={spendingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis stroke="var(--muted-foreground)" dataKey="day" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="var(--primary)"
                strokeWidth={3}
                dot={{ fill: "var(--primary)", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Category Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="var(--card)" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {categoryData.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
                  <span className="text-muted-foreground">{cat.name}</span>
                </div>
                <span className="font-medium text-foreground">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-primary-foreground">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-primary-foreground/20 hover:bg-primary-foreground/30 px-4 py-2 rounded-lg transition-colors text-sm font-medium">
            Log Expense
          </button>
          <button className="bg-primary-foreground/20 hover:bg-primary-foreground/30 px-4 py-2 rounded-lg transition-colors text-sm font-medium">
            View Insights
          </button>
          <button className="bg-primary-foreground/20 hover:bg-primary-foreground/30 px-4 py-2 rounded-lg transition-colors text-sm font-medium">
            Set Goal
          </button>
        </div>
      </div>
    </div>
  )
}
