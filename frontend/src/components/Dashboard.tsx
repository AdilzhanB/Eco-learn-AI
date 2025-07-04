import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Award, 
  Calendar,
  Lightbulb,
  Leaf,
  Target,
  BarChart3,
  Zap,
  Car,
  Utensils,
  Recycle,
  ShoppingBag
} from 'lucide-react'
import { useActivityStore } from '../stores/activityStore'
import { useAIStore } from '../stores/aiStore'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts'
import toast from 'react-hot-toast'

const Dashboard: React.FC = () => {
  const { analytics, fetchAnalytics, isLoading } = useActivityStore()
  const { dailyTip, getDailyTip } = useAIStore()
  const navigate = useNavigate()

  useEffect(() => {
    fetchAnalytics()
    getDailyTip()
  }, [fetchAnalytics, getDailyTip])

  const handleQuickAction = (category: string) => {
    toast.success(`Ready to track ${category}! 🌱`, {
      duration: 3000,
    })
    navigate('/activities')
  }

  const handleAIInsights = () => {
    navigate('/ai-insights')
  }

  const stats = [
    {
      title: 'Total Carbon Footprint',
      value: analytics?.totalCarbonFootprint || 0,
      unit: 'kg CO₂',
      icon: TrendingUp,
      color: 'from-red-500 to-orange-500',
      trend: analytics?.improvement || 0,
      description: 'Your lifetime carbon emissions'
    },
    {
      title: 'Activities This Month',
      value: analytics?.activitiesCount || 0,
      unit: 'activities',
      icon: Activity,
      color: 'from-blue-500 to-cyan-500',
      trend: 12,
      description: 'Tracked environmental actions'
    },
    {
      title: 'Weekly Average',
      value: analytics?.weeklyAverage || 0,
      unit: 'kg CO₂/week',
      icon: Calendar,
      color: 'from-green-500 to-emerald-500',
      trend: analytics?.improvement || 0,
      description: 'Your weekly carbon output'
    },
    {
      title: 'Achievements',
      value: 8,
      unit: 'badges',
      icon: Award,
      color: 'from-purple-500 to-pink-500',
      trend: 2,
      description: 'Eco-friendly milestones reached'
    },
  ]

  const quickActions = [
    {
      title: 'Transportation',
      description: 'Track your daily commute and travel',
      icon: Car,
      color: 'from-blue-500 to-blue-600',
      action: () => handleQuickAction('Transportation')
    },
    {
      title: 'Energy Usage',
      description: 'Monitor home energy consumption',
      icon: Zap,
      color: 'from-yellow-500 to-yellow-600',
      action: () => handleQuickAction('Energy')
    },
    {
      title: 'Food Impact',
      description: 'Calculate meal carbon footprint',
      icon: Utensils,
      color: 'from-green-500 to-green-600',
      action: () => handleQuickAction('Food')
    },
    {
      title: 'Waste Tracking',
      description: 'Log recycling and waste disposal',
      icon: Recycle,
      color: 'from-emerald-500 to-emerald-600',
      action: () => handleQuickAction('Waste')
    },
    {
      title: 'Shopping',
      description: 'Track purchases and consumption',
      icon: ShoppingBag,
      color: 'from-purple-500 to-purple-600',
      action: () => handleQuickAction('Shopping')
    },
    {
      title: 'AI Insights',
      description: 'Get personalized eco recommendations',
      icon: Lightbulb,
      color: 'from-pink-500 to-rose-600',
      action: handleAIInsights
    }
  ]

  const pieChartColors = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6']

  return (
    <div className="w-full max-w-full space-y-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-3xl p-8 border border-green-200 dark:border-green-800 shadow-xl backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="inline-block mb-6"
        >
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 rounded-3xl shadow-2xl">
            <Leaf className="h-16 w-16 text-white" />
          </div>
        </motion.div>
        <h1 className="text-6xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">
          Welcome to EcoTracker
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-xl max-w-4xl mx-auto leading-relaxed">
          Your comprehensive carbon footprint dashboard. Track, analyze, and reduce your environmental impact with AI-powered insights, real-time analytics, and actionable recommendations.
        </p>
        
        {/* Quick Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6 mt-8"
        >
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20 dark:border-gray-700/20">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {analytics?.totalCarbonFootprint?.toFixed(1) || 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">kg CO₂ Total</div>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20 dark:border-gray-700/20">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {analytics?.activitiesCount || 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Activities</div>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20 dark:border-gray-700/20">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {(analytics?.improvement ?? 0) > 0 ? '+' : ''}{(analytics?.improvement ?? 0).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">This Month</div>
          </div>
        </motion.div>
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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-4">
              <motion.div 
                className={`bg-gradient-to-r ${stat.color} p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon className="h-6 w-6 text-white" />
              </motion.div>
              {stat.trend !== 0 && (
                <motion.div 
                  className={`flex items-center space-x-1 ${
                    stat.trend > 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {stat.trend > 0 ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span className="text-sm font-medium">{Math.abs(stat.trend)}%</span>
                </motion.div>
              )}
            </div>
            <div>
              <motion.p 
                className="text-3xl font-bold text-gray-900 dark:text-white mb-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.4 }}
              >
                {typeof stat.value === 'number' ? stat.value.toFixed(1) : stat.value}
              </motion.p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{stat.unit}</p>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">{stat.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{stat.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 p-8"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
            <Target className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Quick Actions</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {quickActions.map((action, index) => (
            <motion.button
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={action.action}
              className={`bg-gradient-to-r ${action.color} text-white p-4 rounded-xl hover:shadow-xl transition-all duration-300 text-center group flex flex-col items-center justify-center min-h-[120px]`}
            >
              <div className="flex items-center justify-center w-12 h-12 mb-3 group-hover:scale-110 transition-transform duration-300">
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-sm mb-1">{action.title}</h3>
              <p className="text-xs opacity-90 line-clamp-2">{action.description}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Monthly Trend Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="xl:col-span-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Carbon Footprint Trend</h3>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Last 6 months</div>
          </div>
          
          {analytics?.monthlyTrend && analytics.monthlyTrend.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics.monthlyTrend}>
                  <XAxis 
                    dataKey="month" 
                    stroke="#6B7280" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#6B7280" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="carbon" 
                    stroke="#10B981" 
                    strokeWidth={4}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, fill: '#059669' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          ) : (
            <div className="h-300 flex items-center justify-center text-gray-500 dark:text-gray-400">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <Target className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <h4 className="text-lg font-medium mb-2">No Data Yet</h4>
                <p>Start tracking activities to see your carbon trend</p>
              </motion.div>
            </div>
          )}
        </motion.div>

        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Category Breakdown</h3>
          </div>

          {analytics?.categoriesBreakdown && analytics.categoriesBreakdown.length > 0 ? (
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={analytics.categoriesBreakdown}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    animationBegin={1000}
                    animationDuration={800}
                  >
                    {analytics.categoriesBreakdown.map((_, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={pieChartColors[index % pieChartColors.length]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="space-y-3">
                {analytics.categoriesBreakdown.map((category, index) => (
                  <motion.div 
                    key={category.category} 
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full shadow-sm"
                        style={{ backgroundColor: pieChartColors[index % pieChartColors.length] }}
                      />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{category.category}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {category.percentage.toFixed(1)}%
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {category.value.toFixed(1)} kg
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="h-200 flex items-center justify-center text-gray-500 dark:text-gray-400">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <Activity className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <h4 className="font-medium mb-1">No Categories Yet</h4>
                <p className="text-sm">Add activities to see breakdown</p>
              </motion.div>
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
