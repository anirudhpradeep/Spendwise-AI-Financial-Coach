"use client"

import { useState } from "react"
import { Plus, Target, Trash2, Flame } from "lucide-react"

interface Goal {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
  deadline: string
  category: string
}

interface Challenge {
  id: number
  name: string
  description: string
  progress: number
  total: number
  reward: string
}

const initialGoals: Goal[] = [
  {
    id: "1",
    name: "Laptop Repair",
    targetAmount: 5000,
    currentAmount: 3200,
    deadline: "2024-12-31",
    category: "Emergency",
  },
  {
    id: "2",
    name: "Vacation Fund",
    targetAmount: 20000,
    currentAmount: 8500,
    deadline: "2025-06-30",
    category: "Travel",
  },
  {
    id: "3",
    name: "Emergency Buffer",
    targetAmount: 50000,
    currentAmount: 35000,
    deadline: "2025-12-31",
    category: "Safety",
  },
]

const initialChallenges: Challenge[] = [
  { id: 1, name: "No Delivery Week", description: "Cook all meals for 7 days", progress: 5, total: 7, reward: "₹500" },
  {
    id: 2,
    name: "Transport Challenge",
    description: "Use public transit for 10 days",
    progress: 7,
    total: 10,
    reward: "₹300",
  },
  { id: 3, name: "Shopping Fast", description: "No shopping for 14 days", progress: 3, total: 14, reward: "₹1000" },
]

export default function SavingsGoals() {
  const [goals, setGoals] = useState<Goal[]>(initialGoals)
  const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    targetAmount: "",
    currentAmount: "",
    deadline: "",
    category: "",
  })

  const handleAddGoal = () => {
    if (formData.name && formData.targetAmount && formData.deadline && formData.category) {
      const newGoal: Goal = {
        id: Date.now().toString(),
        name: formData.name,
        targetAmount: Number.parseFloat(formData.targetAmount),
        currentAmount: Number.parseFloat(formData.currentAmount) || 0,
        deadline: formData.deadline,
        category: formData.category,
      }
      setGoals([...goals, newGoal])
      setFormData({ name: "", targetAmount: "", currentAmount: "", deadline: "", category: "" })
      setShowForm(false)
    }
  }

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter((g) => g.id !== id))
  }

  const calculateDailySavings = (goal: Goal) => {
    const today = new Date()
    const deadline = new Date(goal.deadline)
    const daysLeft = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    const amountNeeded = goal.targetAmount - goal.currentAmount
    return daysLeft > 0 ? Math.ceil(amountNeeded / daysLeft) : 0
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Goals & Challenges</h1>
        <p className="text-muted-foreground">Create and track your short-term financial goals and challenges</p>
      </div>

      {/* Add Goal Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create New Goal
        </button>
      </div>

      {/* Add Goal Form */}
      {showForm && (
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Create New Goal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Goal Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-4 py-2 border border-border rounded-lg bg-background text-foreground"
            />
            <input
              type="number"
              placeholder="Target Amount"
              value={formData.targetAmount}
              onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
              className="px-4 py-2 border border-border rounded-lg bg-background text-foreground"
            />
            <input
              type="number"
              placeholder="Current Amount"
              value={formData.currentAmount}
              onChange={(e) => setFormData({ ...formData, currentAmount: e.target.value })}
              className="px-4 py-2 border border-border rounded-lg bg-background text-foreground"
            />
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="px-4 py-2 border border-border rounded-lg bg-background text-foreground"
            />
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="px-4 py-2 border border-border rounded-lg bg-background text-foreground md:col-span-2"
            >
              <option value="">Select Category</option>
              <option value="Emergency">Emergency</option>
              <option value="Travel">Travel</option>
              <option value="Safety">Safety</option>
              <option value="Other">Other</option>
            </select>
            <div className="flex gap-2 md:col-span-2">
              <button
                onClick={handleAddGoal}
                className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                Create Goal
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 bg-muted text-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Goals Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Savings Goals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => {
            const progress = (goal.currentAmount / goal.targetAmount) * 100
            const dailySavings = calculateDailySavings(goal)

            return (
              <div
                key={goal.id}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">{goal.name}</h3>
                  </div>
                  <button
                    onClick={() => handleDeleteGoal(goal.id)}
                    className="p-1 hover:bg-destructive/10 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </button>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-semibold text-foreground">{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Current</span>
                    <span className="font-semibold text-foreground">₹{goal.currentAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Target</span>
                    <span className="font-semibold text-foreground">₹{goal.targetAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Daily Savings Needed</span>
                    <span className="font-semibold text-accent">₹{dailySavings}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">Deadline: {goal.deadline}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Active Challenges</h2>
        <div className="space-y-4">
          {challenges.map((challenge) => {
            const progress = (challenge.progress / challenge.total) * 100
            return (
              <div key={challenge.id} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-accent" />
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{challenge.name}</h3>
                      <p className="text-sm text-muted-foreground">{challenge.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-accent">Reward: {challenge.reward}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-semibold text-foreground">
                      {challenge.progress} / {challenge.total} days
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:opacity-90 transition-opacity text-sm font-medium">
                  Continue Challenge
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
