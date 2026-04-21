import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login')
    } else if (!loading && user && !user.onboardingCompleted && location.pathname !== '/onboarding') {
      navigate('/onboarding')
    }
  }, [user, loading, navigate, location.pathname])

  if (loading) {
    return (
      <div className="min-h-screen bg-sl-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sl-blue mx-auto mb-4" />
          <p className="text-gray-300">Loading Hunter System...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return children
}

export default ProtectedRoute
