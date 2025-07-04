import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Trash2, 
  Calendar as CalendarIcon, 
  Filter, 
  Search, 
  Grid3x3,
  List,
  SortAsc,
  SortDesc,
  Activity as ActivityIcon
} from 'lucide-react'
import { format } from 'date-fns'
import { useActivityStore } from '../stores/activityStore'

export default function ActivityList() {
  const { activities, fetchActivities, deleteActivity, isLoading } = useActivityStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [sortBy, setSortBy] = useState<'date' | 'carbon' | 'category'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    fetchActivities()
  }, [fetchActivities])

  const filteredActivities = activities
    .filter(activity => 
      activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (activity.category?.name.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
    )
    .filter(activity => 
      filterCategory === 'all' || activity.category?.name === filterCategory
    )
    .sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case 'carbon':
          comparison = b.carbon_footprint - a.carbon_footprint
          break
        case 'category':
          comparison = (a.category?.name ?? '').localeCompare(b.category?.name ?? '')
          break
        default:
          comparison = new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      return sortOrder === 'asc' ? -comparison : comparison
    })

  const handleDeleteActivity = async (id: number) => {
    if (!confirm('Are you sure you want to delete this activity?')) return
    try {
      await deleteActivity(id)
    } catch (error) {
      console.error('Failed to delete activity:', error)
      alert('Failed to delete activity. Please try again.')
    }
  }

  const totalCarbon = filteredActivities.reduce((sum, activity) => sum + activity.carbon_footprint, 0)
  const categories = Array.from(new Set(activities.map(a => a.category?.name).filter(Boolean)))

  const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, string> = {
      'Transportation': '🚗',
      'Energy': '⚡',
      'Food': '🍽️',
      'Waste': '♻️',
      'Shopping': '🛒'
    }
    return iconMap[category] || '📊'
  }

  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, string> = {
      'Transportation': 'from-blue-500 to-blue-600',
      'Energy': 'from-yellow-500 to-yellow-600',
      'Food': 'from-green-500 to-green-600',
      'Waste': 'from-emerald-500 to-emerald-600',
      'Shopping': 'from-purple-500 to-purple-600'
    }
    return colorMap[category] || 'from-gray-500 to-gray-600'
  }

  if (isLoading) {
    return (
      <div className="w-full max-w-full flex items-center justify-center py-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-green-200 border-t-green-500 rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="w-full max-w-full space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-3xl p-8 border border-blue-200 dark:border-blue-800 shadow-xl backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="inline-block mb-6"
        >
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 rounded-3xl shadow-2xl">
            <ActivityIcon className="h-16 w-16 text-white" />
          </div>
        </motion.div>
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
          Your Activities
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-xl max-w-4xl mx-auto leading-relaxed">
          Track and manage all your environmental activities. View detailed analytics, filter by categories, and monitor your carbon footprint progress.
        </p>
        
        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6 mt-8"
        >
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20 dark:border-gray-700/20">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {filteredActivities.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Activities Found</div>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20 dark:border-gray-700/20">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {totalCarbon.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total kg CO₂</div>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20 dark:border-gray-700/20">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {categories.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 p-6 shadow-lg"
      >
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'carbon' | 'category')}
              className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="date">Date</option>
              <option value="carbon">Carbon Footprint</option>
              <option value="category">Category</option>
            </select>
          </div>

          {/* View Mode */}
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Grid3x3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Activities Display */}
      <AnimatePresence mode="wait">
        {filteredActivities.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-20"
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 p-12 shadow-lg">
              <CalendarIcon className="h-20 w-20 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                {searchTerm || filterCategory !== 'all' ? 'No activities found' : 'No activities yet'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                {searchTerm || filterCategory !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Start tracking your carbon footprint by adding your first activity!'
                }
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
              : 'space-y-4'
            }
          >
            {filteredActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  viewMode === 'list' ? 'flex items-center justify-between' : ''
                }`}
              >
                {viewMode === 'grid' ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`bg-gradient-to-r ${getCategoryColor(activity.category?.name || '')} p-3 rounded-xl`}>
                        <span className="text-2xl">{getCategoryIcon(activity.category?.name || '')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDeleteActivity(activity.id)}
                          className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {activity.description}
                      </h3>
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>{activity.category?.name || 'Unknown'}</span>
                        <span>{format(new Date(activity.date), 'MMM dd, yyyy')}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="text-left">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {activity.carbon_footprint.toFixed(1)}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">kg CO₂</div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        activity.carbon_footprint > 10 
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                          : activity.carbon_footprint > 5
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                          : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                      }`}>
                        {activity.carbon_footprint > 10 ? 'High' : activity.carbon_footprint > 5 ? 'Medium' : 'Low'}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-4">
                      <div className={`bg-gradient-to-r ${getCategoryColor(activity.category?.name || '')} p-3 rounded-xl`}>
                        <span className="text-xl">{getCategoryIcon(activity.category?.name || '')}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {activity.description}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <span>{activity.category?.name || 'Unknown'}</span>
                          <span>{format(new Date(activity.date), 'MMM dd, yyyy')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-900 dark:text-white">
                          {activity.carbon_footprint.toFixed(1)}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">kg CO₂</div>
                      </div>
                      <button
                        onClick={() => handleDeleteActivity(activity.id)}
                        className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}