import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Brain, Lightbulb, Target, TrendingUp, Sparkles, RefreshCw } from 'lucide-react'
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
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI Insights
            </h1>
            <p className="text-gray-600 mt-2">
              Powered by Gemini AI to help you reduce your carbon footprint
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
            <Brain className="h-6 w-6 text-white" />
          </div>
        </div>

        {/* Daily Tip Banner */}
        {dailyTip && (
          <motion.div
            className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200 rounded-2xl p-6 mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-start space-x-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Today's Eco Tip</h3>
                <p className="text-gray-700">{dailyTip}</p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <button
          onClick={handleAnalyze}
          disabled={isLoading}
          className="bg-white/80 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl group disabled:opacity-50"
        >
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg group-hover:scale-110 transition-transform duration-200">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900">Analyze Footprint</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Get AI-powered insights about your carbon footprint patterns
          </p>
          {lastAnalysis && (
            <p className="text-xs text-gray-500 mt-2">
              Last analysis: {format(lastAnalysis, 'MMM dd, HH:mm')}
            </p>
          )}
        </button>

        <button
          onClick={handleSuggestActivities}
          disabled={isLoading}
          className="bg-white/80 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl group disabled:opacity-50"
        >
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-2 rounded-lg group-hover:scale-110 transition-transform duration-200">
              <Lightbulb className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900">Get Suggestions</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Discover eco-friendly activities tailored to your lifestyle
          </p>
        </button>

        <button
          onClick={handleSuggestGoals}
          disabled={isLoading}
          className="bg-white/80 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl group disabled:opacity-50"
        >
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg group-hover:scale-110 transition-transform duration-200">
              <Target className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900">Set Goals</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Get personalized carbon reduction goals based on your data
          </p>
        </button>
      </motion.div>

      {/* Current Stats */}
      {analytics && (
        <motion.div
          className="bg-white/80 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Carbon Footprint Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {analytics.totalCarbonFootprint.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Total CO₂ (kg)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {analytics.activitiesCount}
              </div>
              <div className="text-sm text-gray-600">Activities</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {analytics.weeklyAverage.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Weekly Avg</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${analytics.improvement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {analytics.improvement >= 0 ? '+' : ''}{analytics.improvement.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Improvement</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* AI Insights */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Recent Insights</h2>
          {isLoading && (
            <div className="flex items-center space-x-2 text-purple-600">
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span className="text-sm">AI thinking...</span>
            </div>
          )}
        </div>

        {insights.length === 0 ? (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Brain className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-500 mb-2">No insights yet</h3>
            <p className="text-gray-400 mb-6">
              Click the buttons above to get AI-powered insights about your carbon footprint
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <motion.div
                key={`${insight.type}-${insight.timestamp}`}
                className="bg-white/80 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`bg-gradient-to-r ${getInsightColor(insight.type)} p-2 rounded-lg`}>
                    {getInsightIcon(insight.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                      <span className="text-xs text-gray-500">
                        {format(new Date(insight.timestamp), 'MMM dd, HH:mm')}
                      </span>
                    </div>
                    <div className="text-gray-700 whitespace-pre-wrap">{insight.content}</div>
                    {insight.impact && (
                      <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="text-sm text-green-800">
                          <strong>Potential Impact:</strong> {insight.impact}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
