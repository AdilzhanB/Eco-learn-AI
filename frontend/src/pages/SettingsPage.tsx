import React from 'react'
import { motion } from 'framer-motion'
import { 
  Settings as SettingsIcon, 
  Bell, 
  Globe, 
  Shield, 
  Palette,
  Target,
  Calculator,
  Database,
  Moon,
  Sun
} from 'lucide-react'
import { useThemeStore } from '../stores/themeStore'

const SettingsPage: React.FC = () => {
  const { isDarkMode, toggleTheme } = useThemeStore()

  const settingsSections = [
    {
      title: 'Appearance',
      icon: Palette,
      settings: [
        {
          label: 'Theme',
          description: 'Toggle between light and dark mode',
          component: (
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {isDarkMode ? (
                <>
                  <Sun className="h-4 w-4 text-amber-500" />
                  <span className="text-sm">Light</span>
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Dark</span>
                </>
              )}
            </button>
          )
        }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      settings: [
        {
          label: 'Daily Reminders',
          description: 'Get reminded to log your daily activities',
          component: (
            <input
              type="checkbox"
              defaultChecked
              className="toggle toggle-success"
            />
          )
        },
        {
          label: 'Achievement Alerts',
          description: 'Receive notifications when you earn new badges',
          component: (
            <input
              type="checkbox"
              defaultChecked
              className="toggle toggle-success"
            />
          )
        },
        {
          label: 'Weekly Reports',
          description: 'Get weekly carbon footprint summaries',
          component: (
            <input
              type="checkbox"
              defaultChecked
              className="toggle toggle-success"
            />
          )
        }
      ]
    },
    {
      title: 'Carbon Tracking',
      icon: Calculator,
      settings: [
        {
          label: 'Units',
          description: 'Preferred measurement units',
          component: (
            <select className="select select-bordered w-32 bg-white dark:bg-gray-700">
              <option>Metric (kg)</option>
              <option>Imperial (lbs)</option>
            </select>
          )
        },
        {
          label: 'Auto-calculate',
          description: 'Use AI to automatically calculate carbon footprint',
          component: (
            <input
              type="checkbox"
              defaultChecked
              className="toggle toggle-success"
            />
          )
        }
      ]
    },
    {
      title: 'Goals & Targets',
      icon: Target,
      settings: [
        {
          label: 'Monthly Target',
          description: 'Set your monthly carbon reduction goal',
          component: (
            <div className="flex items-center space-x-2">
              <input
                type="number"
                defaultValue={50}
                className="input input-bordered w-20 bg-white dark:bg-gray-700"
              />
              <span className="text-sm text-gray-600 dark:text-gray-300">kg CO₂</span>
            </div>
          )
        },
        {
          label: 'Annual Target',
          description: 'Set your yearly carbon reduction goal',
          component: (
            <div className="flex items-center space-x-2">
              <input
                type="number"
                defaultValue={600}
                className="input input-bordered w-24 bg-white dark:bg-gray-700"
              />
              <span className="text-sm text-gray-600 dark:text-gray-300">kg CO₂</span>
            </div>
          )
        }
      ]
    },
    {
      title: 'Privacy & Security',
      icon: Shield,
      settings: [
        {
          label: 'Data Sharing',
          description: 'Share anonymized data to help improve AI insights',
          component: (
            <input
              type="checkbox"
              defaultChecked
              className="toggle toggle-success"
            />
          )
        },
        {
          label: 'Export Data',
          description: 'Download your carbon tracking data',
          component: (
            <button className="btn btn-outline btn-sm">
              <Database className="h-4 w-4 mr-2" />
              Export
            </button>
          )
        }
      ]
    },
    {
      title: 'Language & Region',
      icon: Globe,
      settings: [
        {
          label: 'Language',
          description: 'Choose your preferred language',
          component: (
            <select className="select select-bordered w-32 bg-white dark:bg-gray-700">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          )
        },
        {
          label: 'Region',
          description: 'Set your location for accurate carbon calculations',
          component: (
            <select className="select select-bordered w-32 bg-white dark:bg-gray-700">
              <option>North America</option>
              <option>Europe</option>
              <option>Asia</option>
              <option>Other</option>
            </select>
          )
        }
      ]
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-2xl inline-block mb-4">
          <SettingsIcon className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Customize your EcoTracker experience
        </p>
      </motion.div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingsSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg">
                <section.icon className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {section.title}
              </h2>
            </div>

            <div className="space-y-4">
              {section.settings.map((setting, settingIndex) => (
                <div key={settingIndex} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                      {setting.label}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {setting.description}
                    </p>
                  </div>
                  <div className="ml-4">
                    {setting.component}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center"
      >
        <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-xl font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl">
          Save Settings
        </button>
      </motion.div>
    </div>
  )
}

export default SettingsPage
