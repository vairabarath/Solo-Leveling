import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useStats } from '../../context/StatsContext'
import Navbar from './Navbar'
import BottomNav from './BottomNav'

const Container = ({ children }) => {
  const { user, loading } = useAuth()
  const { getCurrentStats } = useStats()
  const [statsLoaded, setStatsLoaded] = useState(false)

  // Load stats when user changes
  useEffect(() => {
    if (user && !statsLoaded) {
      getCurrentStats().then(() => {
        setStatsLoaded(true)
      })
    }
  }, [user, statsLoaded, getCurrentStats])

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
    return (
      <div className="min-h-screen bg-sl-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-300">Please log in to access the Hunter System.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-sl-dark">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-sl-blue/5 via-transparent to-sl-purple/5" />
      <div className="absolute inset-0 bg-pattern opacity-5" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-sl-blue rounded-full animate-float opacity-50" />
      <div className="absolute top-40 right-20 w-3 h-3 bg-sl-cyan rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 left-20 w-1 h-1 bg-sl-purple rounded-full animate-float opacity-50" style={{ animationDelay: '4s' }} />

      <div className="relative z-10">
        {/* Top Navigation */}
        <Navbar />
        
        {/* Main Content */}
        <main className="pb-20">
          {children}
        </main>
        
        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  )
}

export default Container
