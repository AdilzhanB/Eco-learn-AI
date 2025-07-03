import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useThemeStore } from '../stores/themeStore'

export const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useThemeStore()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 hover:bg-white/20 dark:hover:bg-gray-700/40 transition-all duration-200 group"
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <Sun className="w-5 h-5 text-amber-500 group-hover:rotate-12 transition-transform duration-200" />
      ) : (
        <Moon className="w-5 h-5 text-blue-600 group-hover:-rotate-12 transition-transform duration-200" />
      )}
    </button>
  )
}
