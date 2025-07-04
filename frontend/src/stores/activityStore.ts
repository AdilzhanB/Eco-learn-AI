import { create } from 'zustand'

interface Activity {
  id: number
  user_id: number
  category_id: number
  description: string
  carbon_footprint: number
  date: string
  created_at: string
  category?: {
    id: number
    name: string
    icon: string
    unit: string
    carbon_factor: number
  }
}

interface Category {
  id: number
  name: string
  icon: string
  unit: string
  carbon_factor: number
}

interface Analytics {
  totalCarbonFootprint: number
  activitiesCount: number
  categoriesBreakdown: Array<{
    category: string
    value: number
    percentage: number
  }>
  monthlyTrend: Array<{
    month: string
    carbon: number
  }>
  weeklyAverage: number
  improvement: number
}

interface ActivityState {
  activities: Activity[]
  categories: Category[]
  analytics: Analytics | null
  isLoading: boolean
  
  fetchActivities: () => Promise<void>
  addActivity: (activity: Omit<Activity, 'id' | 'user_id' | 'created_at'>) => Promise<void>
  deleteActivity: (id: number) => Promise<void>
  fetchCategories: () => Promise<void>
  fetchAnalytics: () => Promise<void>
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

export const useActivityStore = create<ActivityState>((set, get) => ({
  activities: [],
  categories: [],
  analytics: null,
  isLoading: false,

  fetchActivities: async () => {
    set({ isLoading: true })
    try {
      const response = await fetch(`${API_BASE}/api/activities`, {
        headers: {
          ...getAuthHeader(),
        },
      })

      if (!response.ok) throw new Error('Failed to fetch activities')
      
      const activities = await response.json()
      set({ activities, isLoading: false })
    } catch (error) {
      console.error('Error fetching activities:', error)
      set({ isLoading: false })
    }
  },

  addActivity: async (activity) => {
    try {
      const response = await fetch(`${API_BASE}/api/activities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify(activity),
      })

      if (!response.ok) throw new Error('Failed to add activity')
      
      const newActivity = await response.json()
      set(state => ({
        activities: [newActivity, ...state.activities]
      }))
      
      // Refresh analytics
      get().fetchAnalytics()
    } catch (error) {
      console.error('Error adding activity:', error)
      throw error
    }
  },

  deleteActivity: async (id: number) => {
    try {
      const response = await fetch(`${API_BASE}/api/activities/${id}`, {
        method: 'DELETE',
        headers: {
          ...getAuthHeader(),
        },
      })

      if (!response.ok) throw new Error('Failed to delete activity')
      
      set(state => ({
        activities: state.activities.filter(activity => activity.id !== id)
      }))
      
      // Refresh analytics
      get().fetchAnalytics()
    } catch (error) {
      console.error('Error deleting activity:', error)
      throw error
    }
  },

  fetchCategories: async () => {
    try {
      const response = await fetch(`${API_BASE}/api/activities/categories`, {
        headers: {
          ...getAuthHeader(),
        },
      })

      if (!response.ok) throw new Error('Failed to fetch categories')
      
      const categories = await response.json()
      set({ categories })
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  },

  fetchAnalytics: async () => {
    try {
      const response = await fetch(`${API_BASE}/api/analytics/dashboard`, {
        headers: {
          ...getAuthHeader(),
        },
      })

      if (!response.ok) throw new Error('Failed to fetch analytics')
      
      const analytics = await response.json()
      set({ analytics })
    } catch (error) {
      console.error('Error fetching analytics:', error)
    }
  },
}))
