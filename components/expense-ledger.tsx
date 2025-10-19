"use client"

import { useState } from "react"
import { Plus, Trash2, Edit2 } from "lucide-react"

interface Expense {
  id: string
  date: string
  category: string
  description: string
  amount: number
}

const initialExpenses: Expense[] = [
  { id: "1", date: "2024-10-19", category: "Food", description: "Lunch at cafe", amount: 450 },
  { id: "2", date: "2024-10-18", category: "Transport", description: "Uber ride", amount: 250 },
  { id: "3", date: "2024-10-17", category: "Shopping", description: "Groceries", amount: 1200 },
  { id: "4", date: "2024-10-16", category: "Entertainment", description: "Movie tickets", amount: 600 },
  { id: "5", date: "2024-10-15", category: "Food", description: "Dinner delivery", amount: 800 },
]

const categories = ["Food", "Transport", "Shopping", "Entertainment", "Utilities", "Other"]

export default function ExpenseLedger() {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ date: "", category: "", description: "", amount: "" })

  const handleAddExpense = () => {
    if (formData.date && formData.category && formData.description && formData.amount) {
      const newExpense: Expense = {
        id: Date.now().toString(),
        date: formData.date,
        category: formData.category,
        description: formData.description,
        amount: Number.parseFloat(formData.amount),
      }
      setExpenses([newExpense, ...expenses])
      setFormData({ date: "", category: "", description: "", amount: "" })
      setShowForm(false)
    }
  }

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id))
  }

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Expense Ledger</h1>
        <p className="text-muted-foreground">Track and manage your daily expenses</p>
      </div>

      {/* Summary Card */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total Expenses This Month</p>
            <p className="text-3xl font-bold text-foreground">₹{totalSpent.toLocaleString()}</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Expense
          </button>
        </div>
      </div>

      {/* Add Expense Form */}
      {showForm && (
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Log New Expense</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="px-4 py-2 border border-border rounded-lg bg-background text-foreground"
            />
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="px-4 py-2 border border-border rounded-lg bg-background text-foreground"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="px-4 py-2 border border-border rounded-lg bg-background text-foreground md:col-span-2"
            />
            <input
              type="number"
              placeholder="Amount"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="px-4 py-2 border border-border rounded-lg bg-background text-foreground"
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddExpense}
                className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                Save Expense
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

      {/* Expenses List */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Category</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Description</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Amount</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-foreground">{expense.date}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                      {expense.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{expense.description}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-foreground text-right">₹{expense.amount}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1 hover:bg-muted rounded transition-colors">
                        <Edit2 className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button
                        onClick={() => handleDeleteExpense(expense.id)}
                        className="p-1 hover:bg-destructive/10 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
