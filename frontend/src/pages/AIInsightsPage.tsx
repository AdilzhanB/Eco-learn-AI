import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Brain, Lightbulb, Target, TrendingUp, Sparkles, RefreshCw, Zap, Leaf } from 'lucide-react'
import { useAIStore } from '../stores/aiStore'
import { useActivityStore } from '../stores/activityStore'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

export default function AIInsightsPage() {
  const { 
    insights, 
    dailyTip, 
    isLoading, 
    lastAnalysis,
    analyzeFootprint, 
    suggestActivities, 
    getDailyTip, 
    suggestGoals 
  } = useAIStore()
  
  const { analytics } = useActivityStore()

  useEffect(() => {
    getDailyTip()
  }, [getDailyTip])

  const handleAnalyze = async () => {
    try {
      await analyzeFootprint()
      toast.success('Analysis complete! ✨')
    } catch (error) {
      toast.error('Failed to analyze footprint')
    }
  }

  const handleSuggestActivities = async () => {
    try {
      await suggestActivities()
      toast.success('New suggestions ready! 💡')
    } catch (error) {
      toast.error('Failed to get suggestions')
    }
  }

  const handleSuggestGoals = async () => {
    try {
      await suggestGoals()
      toast.success('Personalized goals created! 🎯')
    } catch (error) {
      toast.error('Failed to generate goals')
    }
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'analysis':
        return <TrendingUp className="h-5 w-5" />
      case 'suggestion':
        return <Lightbulb className="h-5 w-5" />
      case 'tip':
        return <Sparkles className="h-5 w-5" />
      case 'goal':
        return <Target className="h-5 w-5" />
      default:
        return <Brain className="h-5 w-5" />
    }
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'analysis':
        return 'from-blue-500 to-cyan-500'
      case 'suggestion':
        return 'from-yellow-500 to-orange-500'
      case 'tip':
        return 'from-purple-500 to-pink-500'
      case 'goal':
        return 'from-green-500 to-emerald-500'
      default:
        return 'from-gray-500 to-slate-500'
    }
  }

  return (
    <div className="w-full max-w-full space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl p-8 border border-purple-200 dark:border-purple-800 shadow-xl backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="inline-block mb-6"
        >
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-3xl shadow-2xl">
            <Brain className="h-16 w-16 text-white" />
          </div>
        </motion.div>
        <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
          AI Insights
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-xl max-w-4xl mx-auto leading-relaxed">
          Powered by Gemini 1.5 Flash AI to provide personalized recommendations, analyze your carbon footprint patterns, and suggest actionable steps to reduce your environmental impact.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAnalyze}
            disabled={isLoading}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 animate-spin" />
                Analyzing...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Get AI Analysis
              </div>
            )}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSuggestActivities}
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Get Suggestions
            </div>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSuggestGoals}
            disabled={isLoading}
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Set Goals
            </div>
          </motion.button>
        </div>
      </motion.div>

      {/* Daily Tip Banner */}
      {dailyTip && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-start space-x-4">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-green-800 dark:text-green-300 mb-2">
                🌱 Today&apos;s Eco Tip
              </h3>
              <p className="text-green-700 dark:text-green-200 leading-relaxed">
                {dailyTip}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-xl">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {analytics?.totalCarbonFootprint?.toFixed(1) || 0}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">kg CO₂ Total</div>
            </div>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Carbon Footprint</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Your total environmental impact measurement
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {insights?.length || 0}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">AI Insights</div>
            </div>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">AI Analysis</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Personalized recommendations generated
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {(analytics?.improvement ?? 0).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Improvement</div>
            </div>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Progress</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Your environmental impact reduction
          </p>
        </motion.div>
      </div>

      {/* AI Insights Grid */}
      {insights && insights.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Your AI Insights
            </h2>
            {lastAnalysis && (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Last updated: {format(new Date(lastAnalysis), 'MMM dd, yyyy')}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {insights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className={`bg-gradient-to-r ${getInsightColor(insight.type)} p-3 rounded-xl`}>
                    {getInsightIcon(insight.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white capitalize">
                        {insight.type}
                      </h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {insight.content}
                    </p>
                    {insight.impact && (
                      <div className="mt-3 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-green-600 dark:text-green-400" />
                          <span className="text-sm font-medium text-green-800 dark:text-green-300">
                            Potential Impact: {insight.impact}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* No Insights State */}
      {(!insights || insights.length === 0) && !isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center py-20"
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 p-12 shadow-lg">
            <Brain className="h-20 w-20 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              No AI Insights Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
              Get started by analyzing your carbon footprint or requesting personalized suggestions from our AI assistant.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAnalyze}
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Get Your First Analysis
              </div>
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Loading State */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center py-20"
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-purple-200 border-t-purple-500 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              AI is thinking...
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Analyzing your data to provide personalized insights
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
