import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeState {
  isDarkMode: boolean
  toggleTheme: () => void
  setTheme: (isDark: boolean) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      
      toggleTheme: () => {
        set((state) => {
          const newTheme = !state.isDarkMode
          // Apply theme to document
          if (newTheme) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
          return { isDarkMode: newTheme }
        })
      },
      
      setTheme: (isDark: boolean) => {
        set({ isDarkMode: isDark })
        // Apply theme to document
        if (isDark) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      },
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        // Apply theme on app load
        if (state?.isDarkMode) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      },
    }
  )
)

// Initialize theme based on system preference if no saved preference
export const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme-storage')
  if (!savedTheme) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    useThemeStore.getState().setTheme(prefersDark)
  }
}
