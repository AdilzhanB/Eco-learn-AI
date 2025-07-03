import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Award, 
  Calendar,
  Lightbulb,
  Leaf,
  Target,
  BarChart3
} from 'lucide-react'
import { useActivityStore } from '../stores/activityStore'
import { useAIStore } from '../stores/aiStore'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts'

const Dashboard: React.FC = () => {
  const { analytics, fetchAnalytics, isLoading } = useActivityStore()
  const { dailyTip, getDailyTip } = useAIStore()

  useEffect(() => {
    fetchAnalytics()
    getDailyTip()
  }, [fetchAnalytics, getDailyTip])

  const stats = [
    {
      title: 'Total Carbon Footprint',
      value: analytics?.totalCarbonFootprint || 0,
      unit: 'kg CO₂',
      icon: TrendingUp,
      color: 'from-red-500 to-orange-500',
      trend: analytics?.improvement || 0,
    },
    {
      title: 'Activities This Month',
      value: analytics?.activitiesCount || 0,
      unit: 'activities',
      icon: Activity,
      color: 'from-blue-500 to-cyan-500',
      trend: 12,
    },
    {
      title: 'Weekly Average',
      value: analytics?.weeklyAverage || 0,
      unit: 'kg CO₂/week',
      icon: Calendar,
      color: 'from-green-500 to-emerald-500',
      trend: analytics?.improvement || 0,
    },
    {
      title: 'Achievements',
      value: 8,
      unit: 'badges',
      icon: Award,
      color: 'from-purple-500 to-pink-500',
      trend: 2,
    },
  ]

  const pieChartColors = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6']

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
          Welcome to EcoTracker
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          Track your carbon footprint, discover insights, and make a positive impact on the environment
        </p>
      </motion.div>

      {/* AI Daily Tip */}
      {dailyTip && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6"
        >
          <div className="flex items-start space-x-4">
            <div className="bg-green-500 p-3 rounded-xl">
              <Lightbulb className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">
                💡 Today's Eco Tip
              </h3>
              <p className="text-green-700 dark:text-green-200 leading-relaxed">
                {dailyTip}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 p-6 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-xl`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              {stat.trend !== 0 && (
                <div className={`flex items-center space-x-1 ${
                  stat.trend > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend > 0 ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span className="text-sm font-medium">{Math.abs(stat.trend)}%</span>
                </div>
              )}
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {typeof stat.value === 'number' ? stat.value.toFixed(1) : stat.value}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.unit}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{stat.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Trend Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Monthly Carbon Trend</h3>
          </div>
          
          {analytics?.monthlyTrend && analytics.monthlyTrend.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={analytics.monthlyTrend}>
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="carbon" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-200 flex items-center justify-center text-gray-500 dark:text-gray-400">
              <div className="text-center">
                <Target className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Start tracking activities to see your carbon trend</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Category Breakdown</h3>
          </div>

          {analytics?.categoriesBreakdown && analytics.categoriesBreakdown.length > 0 ? (
            <div className="space-y-4">
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie
                    data={analytics.categoriesBreakdown}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    dataKey="value"
                  >
                    {analytics.categoriesBreakdown.map((_, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={pieChartColors[index % pieChartColors.length]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="space-y-2">
                {analytics.categoriesBreakdown.map((category, index) => (
                  <div key={category.category} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: pieChartColors[index % pieChartColors.length] }}
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{category.category}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {category.percentage.toFixed(1)}%
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {category.value.toFixed(1)} kg
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-200 flex items-center justify-center text-gray-500 dark:text-gray-400">
              <div className="text-center">
                <Activity className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Add activities to see category breakdown</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
