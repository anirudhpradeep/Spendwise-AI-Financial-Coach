"use client"

import { BookOpen, Play, Clock } from "lucide-react"

const tips = [
  {
    id: 1,
    title: "Understanding Needs vs Wants",
    description:
      "Learn to distinguish between essential expenses and discretionary spending to make smarter financial decisions.",
    duration: "5 min read",
    category: "Basics",
  },
  {
    id: 2,
    title: "How SIPs Work",
    description:
      "Systematic Investment Plans (SIPs) are a powerful way to build wealth over time with small, regular investments.",
    duration: "7 min read",
    category: "Investing",
  },
  {
    id: 3,
    title: "Emergency Fund Essentials",
    description: "Discover why having 3-6 months of expenses saved is crucial for financial security.",
    duration: "6 min read",
    category: "Safety",
  },
  {
    id: 4,
    title: "The Power of Compound Interest",
    description: "See how small savings can grow exponentially over time through the magic of compound interest.",
    duration: "8 min read",
    category: "Investing",
  },
  {
    id: 5,
    title: "Budgeting for Irregular Income",
    description: "Perfect for gig workers and freelancers - learn how to manage variable income effectively.",
    duration: "10 min read",
    category: "Planning",
  },
  {
    id: 6,
    title: "Smart Shopping Strategies",
    description: "Practical tips to reduce shopping expenses without sacrificing quality of life.",
    duration: "5 min read",
    category: "Spending",
  },
]

export default function EducationHub() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Financial Education Hub</h1>
        <p className="text-muted-foreground">Learn financial concepts and build your money knowledge</p>
      </div>

      {/* Featured Tip */}
      <div className="bg-gradient-to-r from-secondary to-primary rounded-lg p-8 text-primary-foreground mb-8">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-6 h-6" />
          <h2 className="text-2xl font-bold">Featured Lesson</h2>
        </div>
        <h3 className="text-xl font-semibold mb-2">The Power of Compound Interest</h3>
        <p className="mb-6 opacity-90">
          Discover how small savings can grow exponentially over time. Albert Einstein called it the eighth wonder of
          the world!
        </p>
        <button className="bg-primary-foreground text-primary px-6 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium flex items-center gap-2">
          <Play className="w-4 h-4" />
          Start Learning
        </button>
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.map((tip) => (
          <div key={tip.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                {tip.category}
              </span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {tip.duration}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{tip.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{tip.description}</p>
            <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:opacity-90 transition-opacity text-sm font-medium">
              Read More
            </button>
          </div>
        ))}
      </div>

      {/* Learning Path */}
      <div className="mt-8 bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Your Learning Path</h2>
        <div className="space-y-3">
          {[
            { step: 1, title: "Basics", completed: true },
            { step: 2, title: "Budgeting", completed: true },
            { step: 3, title: "Saving", completed: false },
            { step: 4, title: "Investing", completed: false },
          ].map((item) => (
            <div key={item.step} className="flex items-center gap-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                  item.completed ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {item.step}
              </div>
              <span className={`font-medium ${item.completed ? "text-foreground" : "text-muted-foreground"}`}>
                {item.title}
              </span>
              {item.completed && <span className="text-xs text-accent ml-auto">Completed</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
