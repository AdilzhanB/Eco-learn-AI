import { create } from 'zustand'

interface AIInsight {
  type: 'suggestion' | 'tip' | 'analysis' | 'goal'
  title: string
  content: string
  impact?: string
  category?: string
  timestamp: string
}

interface CarbonCalculation {
  activity: string
  carbonFootprint: number
  suggestions: string[]
}

interface AIState {
  insights: AIInsight[]
  dailyTip: string | null
  isLoading: boolean
  lastAnalysis: Date | null
  
  analyzeFootprint: () => Promise<void>
  suggestActivities: () => Promise<void>
  calculateCarbon: (activity: string, amount: number, category: string) => Promise<CarbonCalculation>
  getDailyTip: () => Promise<void>
  suggestGoals: () => Promise<void>
}

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3001'

const getAuthHeader = (): Record<string, string> => {
  const token = localStorage.getItem('auth-storage')
  if (!token) return {}
  
  try {
    const parsed = JSON.parse(token)
    if (parsed.state?.token) {
      return {
        'Authorization': `Bearer ${parsed.state.token}`
      }
    }
    return {}
  } catch {
    return {}
  }
}

export const useAIStore = create<AIState>((set) => ({
  insights: [],
  dailyTip: null,
  isLoading: false,
  lastAnalysis: null,

  analyzeFootprint: async () => {
    set({ isLoading: true })
    try {
      const response = await fetch(`${API_BASE}/api/ai/analyze-footprint`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
      })

      if (!response.ok) throw new Error('Failed to analyze footprint')
      
      const analysis = await response.json()
      const insight: AIInsight = {
        type: 'analysis',
        title: 'Carbon Footprint Analysis',
        content: analysis.analysis,
        timestamp: new Date().toISOString(),
      }

      set(state => ({
        insights: [insight, ...state.insights.slice(0, 9)], // Keep only 10 latest
        lastAnalysis: new Date(),
        isLoading: false,
      }))
    } catch (error) {
      console.error('Error analyzing footprint:', error)
      set({ isLoading: false })
    }
  },

  suggestActivities: async () => {
    set({ isLoading: true })
    try {
      const response = await fetch(`${API_BASE}/api/ai/suggest-activities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
      })

      if (!response.ok) throw new Error('Failed to get suggestions')
      
      const suggestions = await response.json()
      const insight: AIInsight = {
        type: 'suggestion',
        title: 'Eco-Friendly Activity Suggestions',
        content: suggestions.suggestions,
        timestamp: new Date().toISOString(),
      }

      set(state => ({
        insights: [insight, ...state.insights.slice(0, 9)],
        isLoading: false,
      }))
    } catch (error) {
      console.error('Error getting suggestions:', error)
      set({ isLoading: false })
    }
  },

  calculateCarbon: async (activity: string, amount: number, category: string) => {
    try {
      const response = await fetch(`${API_BASE}/api/ai/calculate-carbon`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify({ activity, amount, category }),
      })

      if (!response.ok) throw new Error('Failed to calculate carbon')
      
      return await response.json()
    } catch (error) {
      console.error('Error calculating carbon:', error)
      throw error
    }
  },

  getDailyTip: async () => {
    try {
      const response = await fetch(`${API_BASE}/api/ai/daily-tip`, {
        headers: {
          ...getAuthHeader(),
        },
      })

      if (!response.ok) throw new Error('Failed to get daily tip')
      
      const { tip } = await response.json()
      set({ dailyTip: tip })

      // Also add as insight
      const insight: AIInsight = {
        type: 'tip',
        title: 'Daily Eco Tip',
        content: tip,
        timestamp: new Date().toISOString(),
      }

      set(state => ({
        insights: [insight, ...state.insights.slice(0, 9)],
      }))
    } catch (error) {
      console.error('Error getting daily tip:', error)
    }
  },

  suggestGoals: async () => {
    set({ isLoading: true })
    try {
      const response = await fetch(`${API_BASE}/api/ai/suggest-goals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
      })

      if (!response.ok) throw new Error('Failed to get goal suggestions')
      
      const goals = await response.json()
      const insight: AIInsight = {
        type: 'goal',
        title: 'Personalized Carbon Goals',
        content: goals.goals,
        timestamp: new Date().toISOString(),
      }

      set(state => ({
        insights: [insight, ...state.insights.slice(0, 9)],
        isLoading: false,
      }))
    } catch (error) {
      console.error('Error getting goal suggestions:', error)
      set({ isLoading: false })
    }
  },
}))
