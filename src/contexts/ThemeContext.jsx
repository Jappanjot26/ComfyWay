import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'

const ThemeContext = createContext(null)

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeProvider({ children }) {
  const { isPremium, isAuthenticated } = useAuth()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [canToggleDarkMode, setCanToggleDarkMode] = useState(false)

  // Set dark mode permissions based on premium status
  useEffect(() => {
    // Store previous preference
    const savedPreference = localStorage.getItem('theme') === 'dark'
    
    // Premium users can use dark mode
    if (isPremium) {
      setCanToggleDarkMode(true)
      // If they had dark mode before, restore it
      if (savedPreference) {
        setIsDarkMode(true)
      }
    } else {
      // Non-premium users can't use dark mode
      setCanToggleDarkMode(false)
      setIsDarkMode(false)
    }
  }, [isPremium, isAuthenticated])

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  // Toggle dark mode (only if premium)
  const toggleDarkMode = () => {
    if (canToggleDarkMode) {
      setIsDarkMode(prev => !prev)
    }
  }

  const value = {
    isDarkMode,
    canToggleDarkMode,
    toggleDarkMode
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}