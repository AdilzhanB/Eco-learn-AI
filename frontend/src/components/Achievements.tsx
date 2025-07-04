import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Award, Lock, CheckCircle } from 'lucide-react'

interface Achievement {
  id: number
  name: string
  description: string
  icon: string
  requirement_value: number
  requirement_type: string
  earned: number
  earned_at: string | null
}

export default function Achievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAchievements()
  }, [])

  const fetchAchievements = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE}/api/achievements`)
      const data = await response.json()
      setAchievements(data)
    } catch (error) {
      console.error('Failed to fetch achievements:', error)
    } finally {
      setLoading(false)
    }
  }

  const checkAchievements = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE}/api/achievements/check`, {
        method: 'POST',
      })
      const result = await response.json()
      
      if (result.newAchievements && result.newAchievements.length > 0) {
        alert(result.message)
        fetchAchievements() // Refresh the list
      }
    } catch (error) {
      console.error('Failed to check achievements:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    )
  }

  const earnedAchievements = achievements.filter(a => a.earned)
  const unearned = achievements.filter(a => !a.earned)

  return (
    <div className="w-full max-w-full space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-3xl p-8 border border-yellow-200 dark:border-yellow-800 shadow-xl backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="inline-block mb-6"
        >
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 rounded-3xl shadow-2xl">
            <Award className="h-16 w-16 text-white" />
          </div>
        </motion.div>
        <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-6">
          Achievements
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-xl max-w-4xl mx-auto leading-relaxed">
          Unlock achievements as you progress on your eco-friendly journey. Each milestone brings you closer to a more sustainable lifestyle.
        </p>
        
        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6 mt-8"
        >
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20 dark:border-gray-700/20">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {earnedAchievements.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Earned</div>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20 dark:border-gray-700/20">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {achievements.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20 dark:border-gray-700/20">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {Math.round((earnedAchievements.length / achievements.length) * 100)}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Progress</div>
          </div>
        </motion.div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={checkAchievements}
          className="mt-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Check Progress
        </motion.button>
      </motion.div>

      {/* Progress Bar */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Overall Progress</span>
          <span className="text-sm text-gray-500">
            {Math.round((earnedAchievements.length / achievements.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(earnedAchievements.length / achievements.length) * 100}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </div>

      {/* Earned Achievements */}
      {earnedAchievements.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>Unlocked Achievements</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {earnedAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 relative overflow-hidden"
              >
                <div className="absolute top-2 right-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div className="text-3xl mb-3">{achievement.icon}</div>
                <h4 className="font-semibold text-gray-900 mb-2">{achievement.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                {achievement.earned_at && (
                  <p className="text-xs text-green-600 font-medium">
                    Earned on {new Date(achievement.earned_at).toLocaleDateString()}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Locked Achievements */}
      {unearned.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Lock className="h-5 w-5 text-gray-400" />
            <span>Locked Achievements</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {unearned.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-6 relative overflow-hidden opacity-75"
              >
                <div className="absolute top-2 right-2">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <div className="text-3xl mb-3 grayscale">{achievement.icon}</div>
                <h4 className="font-semibold text-gray-700 mb-2">{achievement.name}</h4>
                <p className="text-sm text-gray-500 mb-3">{achievement.description}</p>
                <div className="bg-gray-200 rounded-full px-3 py-1 text-xs text-gray-600 inline-block">
                  {getRequirementText(achievement.requirement_type, achievement.requirement_value)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {achievements.length === 0 && (
        <div className="text-center py-12">
          <Award className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No achievements available</h3>
          <p className="text-gray-500">Check back later for new challenges!</p>
        </div>
      )}
    </div>
  )
}

function getRequirementText(type: string, value: number): string {
  switch (type) {
    case 'activities_count':
      return `Log ${value} activit${value === 1 ? 'y' : 'ies'}`
    case 'carbon_saved':
      return `Save ${value}kg CO₂`
    case 'daily_streak':
      return `${value} day streak`
    default:
      return `Requirement: ${value}`
  }
}
