import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trash2, Calendar as CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'

interface Activity {
  id: number
  description: string
  carbon_footprint: number
  date: string
  created_at: string
  category_name: string
  category_icon: string
  category_color: string
}

export default function ActivityList() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchActivities()
  }, [])

  const fetchActivities = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/activities')
      const data = await response.json()
      setActivities(data)
    } catch (error) {
      console.error('Failed to fetch activities:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteActivity = async (id: number) => {
    if (!confirm('Are you sure you want to delete this activity?')) return

    try {
      const response = await fetch(`http://localhost:3001/api/activities/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setActivities(activities.filter(activity => activity.id !== id))
      } else {
        throw new Error('Failed to delete activity')
      }
    } catch (error) {
      console.error('Error deleting activity:', error)
      alert('Failed to delete activity. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    )
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-12">
        <CalendarIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No activities yet</h3>
        <p className="text-gray-500">Start tracking your carbon footprint by adding your first activity!</p>
      </div>
    )
  }

  const groupedActivities = activities.reduce((groups, activity) => {
    const date = activity.date
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(activity)
    return groups
  }, {} as Record<string, Activity[]>)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Activity History</h2>
        <div className="text-sm text-gray-500">
          {activities.length} activities logged
        </div>
      </div>

      {Object.entries(groupedActivities).map(([date, dayActivities], index) => (
        <motion.div
          key={date}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/20"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg">
              <CalendarIcon className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {format(new Date(date), 'EEEE, MMMM d, yyyy')}
              </h3>
              <p className="text-sm text-gray-500">
                {dayActivities.reduce((sum, activity) => sum + activity.carbon_footprint, 0).toFixed(1)} kg CO₂
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {dayActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                    style={{ backgroundColor: `${activity.category_color}20`, color: activity.category_color }}
                  >
                    {activity.category_icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{activity.description}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{activity.category_name}</span>
                      <span>•</span>
                      <span>{activity.carbon_footprint.toFixed(1)} kg CO₂</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => deleteActivity(activity.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
