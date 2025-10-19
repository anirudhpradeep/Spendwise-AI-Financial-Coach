"use client"

import { Trophy, Star, Zap, Target } from "lucide-react"

const badges = [
  { id: 1, name: "Budget Master", description: "Stayed within budget for 3 months", icon: Trophy, earned: true },
  { id: 2, name: "Savings Streak", description: "7-day saving streak", icon: Star, earned: true },
  { id: 3, name: "Goal Achiever", description: "Completed 1 savings goal", icon: Target, earned: true },
  { id: 4, name: "Smart Spender", description: "Reduced spending by 20%", icon: Zap, earned: false },
  { id: 5, name: "Investment Pro", description: "Started investing", icon: Star, earned: false },
  { id: 6, name: "Financial Guru", description: "Completed all learning modules", icon: Trophy, earned: false },
]

const peerComparison = [
  { rank: 1, name: "You", points: 2450, percentile: "Top 5%", trend: "↑" },
  { rank: 2, name: "Priya", points: 2380, percentile: "Top 8%", trend: "↓" },
  { rank: 3, name: "Rahul", points: 2210, percentile: "Top 12%", trend: "↑" },
  { rank: 4, name: "Ananya", points: 2050, percentile: "Top 18%", trend: "↑" },
  { rank: 5, name: "Vikram", points: 1890, percentile: "Top 25%", trend: "↓" },
]

export default function Gamification() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Achievements & Peer Comparison</h1>
        <p className="text-muted-foreground">Earn badges and see how you compare with peers</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm text-muted-foreground mb-1">Badges Earned</p>
          <p className="text-3xl font-bold text-foreground">3 / 6</p>
          <p className="text-xs text-primary mt-2">50% Complete</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm text-muted-foreground mb-1">Current Streak</p>
          <p className="text-3xl font-bold text-accent">7 days</p>
          <p className="text-xs text-accent mt-2">Keep it going!</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm text-muted-foreground mb-1">Total Points</p>
          <p className="text-3xl font-bold text-primary">2,450</p>
          <p className="text-xs text-primary mt-2">+150 this week</p>
        </div>
      </div>

      {/* Badges */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Badges</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((badge) => {
            const Icon = badge.icon
            return (
              <div
                key={badge.id}
                className={`rounded-lg p-4 text-center transition-all ${
                  badge.earned ? "bg-primary/10 border border-primary" : "bg-muted border border-border opacity-50"
                }`}
              >
                <Icon className={`w-8 h-8 mx-auto mb-2 ${badge.earned ? "text-primary" : "text-muted-foreground"}`} />
                <h3 className="text-sm font-semibold text-foreground mb-1">{badge.name}</h3>
                <p className="text-xs text-muted-foreground">{badge.description}</p>
              </div>
            )
          })}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Peer Comparison</h2>
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Rank</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Points</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Percentile</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Trend</th>
                </tr>
              </thead>
              <tbody>
                {peerComparison.map((peer, idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-border transition-colors ${
                      peer.rank === 1 ? "bg-primary/5" : "hover:bg-muted/50"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            peer.rank === 1 ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                          }`}
                        >
                          {peer.rank}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-foreground">
                        {peer.rank === 1 ? `${peer.name} (You)` : peer.name}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-foreground">{peer.points.toLocaleString()}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-accent font-medium">{peer.percentile}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className={`text-lg font-bold ${peer.trend === "↑" ? "text-accent" : "text-destructive"}`}>
                        {peer.trend}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
