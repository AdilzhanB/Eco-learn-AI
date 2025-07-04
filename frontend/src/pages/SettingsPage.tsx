import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Moon, 
  Sun, 
  Shield, 
  Globe, 
  Mail, 
  Smartphone,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  Trash2,
  Download,
  Target,
  Calendar,
  BarChart3,
  Leaf
} from 'lucide-react'
import { useThemeStore } from '../stores/themeStore'
import { useAuthStore } from '../stores/authStore'
import toast from 'react-hot-toast'

interface SettingsSection {
  id: string
  title: string
  icon: React.ReactNode
  description: string
}

const SettingsPage: React.FC = () => {
  const { isDarkMode, setTheme } = useThemeStore()
  const { user } = useAuthStore()
  
  // Form states
  const [activeSection, setActiveSection] = useState('profile')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  // Profile settings
  const [profileData, setProfileData] = useState({
    name: user?.username || '',
    email: user?.email || '',
    bio: '',
    location: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  
  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
    achievementAlerts: true,
    goalReminders: true,
    marketingEmails: false
  })
  
  // Privacy settings
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    dataSharing: false,
    analyticsTracking: true,
    locationTracking: false,
    activityVisibility: 'friends'
  })
  
  // Carbon tracking settings
  const [carbonSettings, setCarbonSettings] = useState({
    trackingAccuracy: 'high',
    defaultUnit: 'metric',
    includeOffsets: true,
    showComparisons: true,
    weeklyGoals: true,
    monthlyReports: true
  })

  const sections: SettingsSection[] = [
    {
      id: 'profile',
      title: 'Profile',
      icon: <User className="h-5 w-5" />,
      description: 'Manage your personal information and account details'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: <Bell className="h-5 w-5" />,
      description: 'Control how and when you receive notifications'
    },
    {
      id: 'appearance',
      title: 'Appearance',
      icon: isDarkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />,
      description: 'Customize the look and feel of the app'
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: <Shield className="h-5 w-5" />,
      description: 'Manage your privacy settings and data security'
    },
    {
      id: 'carbon',
      title: 'Carbon Tracking',
      icon: <Leaf className="h-5 w-5" />,
      description: 'Configure carbon footprint tracking preferences'
    },
    {
      id: 'app',
      title: 'App Settings',
      icon: <Globe className="h-5 w-5" />,
      description: 'General application preferences and data management'
    }
  ]

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Settings saved successfully! 🎉', {
        duration: 3000,
      })
    } catch (error) {
      toast.error('Failed to save settings. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all settings to default? This action cannot be undone.')) {
      // Reset logic here
      toast.success('Settings reset to default values')
    }
  }

  const handleExportData = () => {
    toast.success('Data export started. You will receive an email when ready.')
  }

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently deleted.')) {
      // Delete account logic here
      toast.error('Account deletion initiated. You will receive a confirmation email.')
    }
  }

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={profileData.name}
            onChange={(e) => setProfileData({...profileData, name: e.target.value})}
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter your full name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={profileData.email}
            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter your email address"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Location
        </label>
        <input
          type="text"
          value={profileData.location}
          onChange={(e) => setProfileData({...profileData, location: e.target.value})}
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Enter your location"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Bio
        </label>
        <textarea
          value={profileData.bio}
          onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
          rows={4}
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
          placeholder="Tell us about yourself and your environmental goals..."
        />
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Change Password
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={profileData.currentPassword}
                onChange={(e) => setProfileData({...profileData, currentPassword: e.target.value})}
                className="w-full px-4 py-3 pr-12 border border-gray-200 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                New Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={profileData.newPassword}
                onChange={(e) => setProfileData({...profileData, newPassword: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter new password"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirm New Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={profileData.confirmPassword}
                onChange={(e) => setProfileData({...profileData, confirmPassword: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Confirm new password"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {Object.entries(notifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-4 bg-white/30 dark:bg-gray-800/30 rounded-lg border border-white/20 dark:border-gray-700/20">
            <div className="flex items-center space-x-3">
              {key === 'emailNotifications' && <Mail className="h-5 w-5 text-blue-500" />}
              {key === 'pushNotifications' && <Smartphone className="h-5 w-5 text-green-500" />}
              {key === 'weeklyReports' && <BarChart3 className="h-5 w-5 text-purple-500" />}
              {key === 'achievementAlerts' && <Target className="h-5 w-5 text-yellow-500" />}
              {key === 'goalReminders' && <Calendar className="h-5 w-5 text-indigo-500" />}
              {key === 'marketingEmails' && <Mail className="h-5 w-5 text-red-500" />}
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {key === 'emailNotifications' && 'Receive notifications via email'}
                  {key === 'pushNotifications' && 'Receive push notifications on your device'}
                  {key === 'weeklyReports' && 'Get weekly carbon footprint reports'}
                  {key === 'achievementAlerts' && 'Get notified when you unlock achievements'}
                  {key === 'goalReminders' && 'Receive reminders about your goals'}
                  {key === 'marketingEmails' && 'Receive marketing and promotional emails'}
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setNotifications({...notifications, [key]: !value})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  value ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    value ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div className="bg-white/30 dark:bg-gray-800/30 rounded-lg border border-white/20 dark:border-gray-700/20 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Theme Preference
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setTheme(false)}
            className={`p-4 rounded-lg border-2 transition-all ${
              !isDarkMode
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
            }`}
          >
            <div className="flex items-center justify-center mb-2">
              <Sun className="h-8 w-8 text-yellow-500" />
            </div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              Light Theme
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Bright and clean interface
            </div>
          </button>
          
          <button
            onClick={() => setTheme(true)}
            className={`p-4 rounded-lg border-2 transition-all ${
              isDarkMode
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
            }`}
          >
            <div className="flex items-center justify-center mb-2">
              <Moon className="h-8 w-8 text-indigo-500" />
            </div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              Dark Theme
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Easy on the eyes
            </div>
          </button>
        </div>
      </div>
    </div>
  )

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div className="bg-white/30 dark:bg-gray-800/30 rounded-lg border border-white/20 dark:border-gray-700/20 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Privacy Controls
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Profile Visibility</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Control who can see your profile</div>
            </div>
            <select
              value={privacy.profileVisibility}
              onChange={(e) => setPrivacy({...privacy, profileVisibility: e.target.value})}
              className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
              <option value="private">Private</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Data Sharing</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Share anonymized data for research</div>
            </div>
            <button
              onClick={() => setPrivacy({...privacy, dataSharing: !privacy.dataSharing})}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                privacy.dataSharing ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  privacy.dataSharing ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Analytics Tracking</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Help improve the app with usage analytics</div>
            </div>
            <button
              onClick={() => setPrivacy({...privacy, analyticsTracking: !privacy.analyticsTracking})}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                privacy.analyticsTracking ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  privacy.analyticsTracking ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderCarbonSettings = () => (
    <div className="space-y-6">
      <div className="bg-white/30 dark:bg-gray-800/30 rounded-lg border border-white/20 dark:border-gray-700/20 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Carbon Tracking Preferences
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Tracking Accuracy</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Choose between speed and accuracy</div>
            </div>
            <select
              value={carbonSettings.trackingAccuracy}
              onChange={(e) => setCarbonSettings({...carbonSettings, trackingAccuracy: e.target.value})}
              className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="high">High Accuracy</option>
              <option value="medium">Medium Accuracy</option>
              <option value="low">Low Accuracy</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Default Units</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Metric or Imperial units</div>
            </div>
            <select
              value={carbonSettings.defaultUnit}
              onChange={(e) => setCarbonSettings({...carbonSettings, defaultUnit: e.target.value})}
              className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="metric">Metric</option>
              <option value="imperial">Imperial</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAppSettings = () => (
    <div className="space-y-6">
      <div className="bg-white/30 dark:bg-gray-800/30 rounded-lg border border-white/20 dark:border-gray-700/20 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Data Management
        </h3>
        <div className="space-y-4">
          <button
            onClick={handleExportData}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            <Download className="h-5 w-5" />
            <span>Export My Data</span>
          </button>
          
          <button
            onClick={handleReset}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
          >
            <RefreshCw className="h-5 w-5" />
            <span>Reset to Defaults</span>
          </button>
          
          <button
            onClick={handleDeleteAccount}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            <Trash2 className="h-5 w-5" />
            <span>Delete Account</span>
          </button>
        </div>
      </div>
    </div>
  )

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileSettings()
      case 'notifications':
        return renderNotificationSettings()
      case 'appearance':
        return renderAppearanceSettings()
      case 'privacy':
        return renderPrivacySettings()
      case 'carbon':
        return renderCarbonSettings()
      case 'app':
        return renderAppSettings()
      default:
        return renderProfileSettings()
    }
  }

  return (
    <div className="w-full max-w-full space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-3xl p-8 border border-purple-200 dark:border-purple-800 shadow-xl backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="inline-block mb-6"
        >
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-6 rounded-3xl shadow-2xl">
            <SettingsIcon className="h-16 w-16 text-white" />
          </div>
        </motion.div>
        <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-xl max-w-4xl mx-auto leading-relaxed">
          Customize your EcoTracker experience. Manage your profile, notifications, privacy settings, and more.
        </p>
      </motion.div>

      {/* Settings Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1"
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 p-6 shadow-lg sticky top-8">
            <div className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                    activeSection === section.id
                      ? 'bg-green-500 text-white shadow-lg'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {section.icon}
                  <div>
                    <div className="font-medium">{section.title}</div>
                    <div className={`text-xs ${
                      activeSection === section.id ? 'text-green-100' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {section.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-3"
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 p-8 shadow-lg">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {sections.find(s => s.id === activeSection)?.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {sections.find(s => s.id === activeSection)?.description}
              </p>
            </div>

            {renderSectionContent()}

            {/* Save Button */}
            <div className="mt-8 flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Changes are saved automatically
              </div>
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="flex items-center space-x-2 px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white rounded-lg transition-colors"
              >
                {isLoading ? (
                  <RefreshCw className="h-5 w-5 animate-spin" />
                ) : (
                  <Save className="h-5 w-5" />
                )}
                <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default SettingsPage
