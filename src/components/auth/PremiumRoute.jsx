import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const PremiumRoute = () => {
  const { isAuthenticated, isPremium, isInitialized } = useAuth()
  
  // Wait for authentication to initialize
  if (!isInitialized) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  // Redirect to profile page if not premium
  if (!isPremium) {
    return <Navigate to="/profile" replace />
  }
  
  // Render the premium route
  return <Outlet />
}

export default PremiumRoute