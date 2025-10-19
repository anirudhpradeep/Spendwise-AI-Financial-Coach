"use client"

import { Lightbulb, TrendingDown, AlertCircle, CheckCircle } from "lucide-react"

const insights = [
  {
    id: 1,
    type: "savings",
    title: "Food Delivery Opportunity",
    description: "You spent ₹2,500 on food delivery last month. Cooking twice a week could save you ₹1,000.",
    impact: "₹1,000/month",
    icon: TrendingDown,
  },
  {
    id: 2,
    type: "warning",
    title: "Transport Spike Detected",
    description: "Your transport expenses increased 40% this month. Consider carpooling or public transit.",
    impact: "Save ₹500/month",
    icon: AlertCircle,
  },
  {
    id: 3,
    type: "success",
    title: "Great Job on Shopping!",
    description: "Your shopping expenses decreased by 25% compared to last month. Keep it up!",
    impact: "Saved ₹800",
    icon: CheckCircle,
  },
  {
    id: 4,
    type: "savings",
    title: "Entertainment Budget",
    description: "Consider setting a weekly entertainment budget of ₹500 to better control spending.",
    impact: "Save ₹400/month",
    icon: TrendingDown,
  },
]

export default function AIInsights() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">AI Insights & Suggestions</h1>
        <p className="text-muted-foreground">Personalized recommendations to improve your financial health</p>
      </div>

      {/* Investment Potential */}
      <div className="bg-gradient-to-r from-accent to-secondary rounded-lg p-6 text-accent-foreground mb-8">
        <h2 className="text-xl font-semibold mb-2">Investment Growth Potential</h2>
        <p className="mb-4">
          If you invest ₹500/month as SIP, it could become ₹40,000 in 5 years (assuming 12% annual return)
        </p>
        <div className="bg-accent-foreground/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Growth Projection</span>
            <span className="text-lg font-bold">₹40,000</span>
          </div>
          <div className="w-full bg-accent-foreground/30 rounded-full h-2">
            <div className="bg-accent-foreground h-2 rounded-full" style={{ width: "75%" }}></div>
          </div>
        </div>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((insight) => {
          const Icon = insight.icon
          const bgColor =
            insight.type === "savings"
              ? "bg-primary/10"
              : insight.type === "warning"
                ? "bg-destructive/10"
                : "bg-accent/10"
          const borderColor =
            insight.type === "savings"
              ? "border-primary/30"
              : insight.type === "warning"
                ? "border-destructive/30"
                : "border-accent/30"
          const iconColor =
            insight.type === "savings"
              ? "text-primary"
              : insight.type === "warning"
                ? "text-destructive"
                : "text-accent"

          return (
            <div key={insight.id} className={`${bgColor} border ${borderColor} rounded-lg p-6`}>
              <div className="flex items-start gap-4">
                <Icon className={`w-6 h-6 ${iconColor} flex-shrink-0 mt-1`} />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{insight.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">Potential Impact</span>
                    <span className="font-bold text-primary">{insight.impact}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Financial Education */}
      <div className="mt-8 bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Why This Matters</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          Small changes in daily spending habits compound over time. By reducing food delivery by just 2 times per week,
          you could save ₹12,000 annually. This money could be invested to grow your wealth exponentially.
        </p>
        <div className="bg-muted rounded-lg p-4">
          <p className="text-sm font-medium text-foreground mb-2">Key Takeaway:</p>
          <p className="text-sm text-muted-foreground">
            "Needs vs Wants" - Distinguish between essential expenses and discretionary spending. This simple practice
            can transform your financial future.
          </p>
        </div>
      </div>
    </div>
  )
}
