import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { User, Mail, Calendar, Save, LogOut, Settings, Trophy, Leaf } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import { useActivityStore } from '../stores/activityStore'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

const profileSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Please enter a valid email'),
})

type ProfileForm = z.infer<typeof profileSchema>

export default function ProfilePage() {
  const { user, updateProfile, logout, isLoading } = useAuthStore()
  const { analytics } = useActivityStore()
  const [isEditing, setIsEditing] = useState(false)

  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
    },
  })

  const handleUpdateProfile = async (data: ProfileForm) => {
    try {
      await updateProfile(data)
      setIsEditing(false)
      toast.success('Profile updated successfully! ✨')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Update failed')
    }
  }

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully! 👋')
  }

  if (!user) {
    return (
      <div className="w-full max-w-full space-y-8">
        <div className="text-center py-20">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 p-12 shadow-lg">
            <User className="h-20 w-20 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Loading Profile...
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Please wait while we load your profile information.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const memberSince = format(new Date(user.created_at), 'MMMM yyyy')
  const carbonSaved = analytics?.totalCarbonFootprint ? Math.max(0, 100 - analytics.totalCarbonFootprint) : 0
  const activitiesLogged = analytics?.activitiesCount || 0

  return (
    <div className="w-full max-w-full space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl p-8 border border-blue-200 dark:border-blue-800 shadow-xl backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="inline-block mb-6"
        >
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-3xl shadow-2xl">
            <User className="h-16 w-16 text-white" />
          </div>
        </motion.div>
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
          Profile
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-xl max-w-4xl mx-auto leading-relaxed">
          Manage your account and track your eco-journey with personalized insights and achievements.
        </p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        className="bg-white/80 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-white" />
            </div>
            <div className="text-white">
              <h2 className="text-2xl font-bold">{user.username}</h2>
              <p className="text-blue-100">{user.email}</p>
              <p className="text-blue-200 text-sm">Member since {memberSince}</p>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          {isEditing ? (
            <form onSubmit={form.handleSubmit(handleUpdateProfile)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    {...form.register('username')}
                    type="text"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                {form.formState.errors.username && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.formState.errors.username.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    {...form.register('email')}
                    type="email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                {form.formState.errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="flex space-x-3">
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Save className="h-4 w-4" />
                  <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
                </motion.button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Username</p>
                    <p className="font-medium">{user.username}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="font-medium">{memberSince}</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <motion.button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Settings className="h-4 w-4" />
                  <span>Edit Profile</span>
                </motion.button>
                <motion.button
                  onClick={handleLogout}
                  className="px-6 py-3 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-all duration-200 flex items-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="bg-white/80 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900">Carbon Saved</h3>
          </div>
          <div className="text-2xl font-bold text-green-600">{carbonSaved.toFixed(1)} kg</div>
          <p className="text-sm text-gray-600">Compared to average user</p>
        </div>

        <div className="bg-white/80 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900">Activities Logged</h3>
          </div>
          <div className="text-2xl font-bold text-blue-600">{activitiesLogged}</div>
          <p className="text-sm text-gray-600">Total activities tracked</p>
        </div>

        <div className="bg-white/80 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900">Eco Score</h3>
          </div>
          <div className="text-2xl font-bold text-purple-600">
            {Math.max(0, Math.round((carbonSaved / 100) * 100))}
          </div>
          <p className="text-sm text-gray-600">Your environmental impact</p>
        </div>
      </motion.div>

      {/* Recent Activity Overview */}
      {analytics && (
        <motion.div
          className="bg-white/80 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {analytics.totalCarbonFootprint.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Total CO₂ (kg)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {analytics.weeklyAverage.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Weekly Average</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${analytics.improvement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {analytics.improvement >= 0 ? '+' : ''}{analytics.improvement.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Improvement</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {analytics.categoriesBreakdown.length}
              </div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
