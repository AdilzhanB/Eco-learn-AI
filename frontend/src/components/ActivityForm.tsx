import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Save, Brain, Calculator } from 'lucide-react'
import { useActivityStore } from '../stores/activityStore'
import { useAIStore } from '../stores/aiStore'
import toast from 'react-hot-toast'

interface ActivityFormProps {
  onClose: () => void
}

export default function ActivityForm({ onClose }: ActivityFormProps) {
  const { categories, addActivity, fetchCategories } = useActivityStore()
  const { calculateCarbon } = useAIStore()
  const [formData, setFormData] = useState({
    category_id: '',
    description: '',
    amount: '',
    carbon_footprint: '',
    date: new Date().toISOString().split('T')[0]
  })
  const [loading, setLoading] = useState(false)
  const [calculating, setCalculating] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const handleAICalculation = async () => {
    if (!formData.description || !formData.amount || !formData.category_id) {
      toast.error('Please fill in description, amount, and category first')
      return
    }

    const selectedCategory = categories.find(c => c.id === parseInt(formData.category_id))
    if (!selectedCategory) return

    setCalculating(true)
    try {
      const result = await calculateCarbon(
        formData.description, 
        parseFloat(formData.amount), 
        selectedCategory.name
      )
      
      setFormData(prev => ({
        ...prev,
        carbon_footprint: result.carbonFootprint.toString()
      }))
      
      toast.success('AI calculated carbon footprint! 🤖')
    } catch (error) {
      toast.error('AI calculation failed. Using manual input.')
    } finally {
      setCalculating(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await addActivity({
        category_id: parseInt(formData.category_id),
        description: formData.description,
        carbon_footprint: parseFloat(formData.carbon_footprint),
        date: formData.date
      })
      
      toast.success('Activity added successfully! 🌱')
      onClose()
    } catch (error) {
      toast.error('Failed to add activity')
    } finally {
      setLoading(false)
    }
  }

  const selectedCategory = categories.find(c => c.id === parseInt(formData.category_id))

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add New Activity</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="e.g., Drove 50km to work"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount {selectedCategory && `(${selectedCategory.unit})`}
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="Enter amount"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          {/* AI Carbon Calculation */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Carbon Footprint (kg CO₂)
              </label>
              <button
                type="button"
                onClick={handleAICalculation}
                disabled={calculating || !formData.description || !formData.amount || !formData.category_id}
                className="flex items-center space-x-1 px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {calculating ? (
                  <Calculator className="h-3 w-3 animate-spin" />
                ) : (
                  <Brain className="h-3 w-3" />
                )}
                <span>{calculating ? 'Calculating...' : 'AI Calculate'}</span>
              </button>
            </div>
            <input
              type="number"
              step="0.01"
              value={formData.carbon_footprint}
              onChange={(e) => setFormData({ ...formData, carbon_footprint: e.target.value })}
              placeholder="Enter or calculate carbon footprint"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Use AI calculation for accurate estimates, or enter manually
            </p>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <motion.button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Save Activity</span>
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
