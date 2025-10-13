import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useStats } from '../../context/StatsContext'
import { Menu, X, User, LogOut, Settings } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const { currentStats } = useStats()

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
  }

  return (
    <nav className="bg-sl-gray/80 backdrop-blur-sm border-b border-sl-light-gray sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-sl-blue to-sl-cyan rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">⚔️</span>
            </div>
            <span className="text-xl font-bold glow-text">Solo Leveling</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* User Stats */}
            {currentStats && (
              <div className="flex items-center space-x-4 text-sm">
                <div className="text-sl-blue font-semibold">
                  Lv. {currentStats.level}
                </div>
                <div className="text-gray-300">
                  {user?.name}
                </div>
              </div>
            )}

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:block">{user?.name}</span>
              </button>

              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-sl-gray border border-sl-light-gray rounded-lg shadow-lg z-50"
                  >
                    <div className="py-2">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-sl-light-gray hover:text-white transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <User className="w-4 h-4 mr-3" />
                        Profile
                      </Link>
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-sl-light-gray hover:text-white transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4 mr-3" />
                        Settings
                      </Link>
                      <hr className="my-2 border-sl-light-gray" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-sl-red hover:bg-sl-light-gray transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-sl-light-gray"
            >
              <div className="py-4 space-y-2">
                {/* User Info */}
                <div className="px-4 py-2">
                  <div className="text-sm text-gray-300">Welcome back,</div>
                  <div className="text-lg font-semibold text-white">{user?.name}</div>
                  {currentStats && (
                    <div className="text-sm text-sl-blue">Level {currentStats.level}</div>
                  )}
                </div>

                <hr className="border-sl-light-gray" />

                {/* Mobile Navigation Links */}
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2 text-gray-300 hover:bg-sl-light-gray hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-4 h-4 mr-3" />
                  Profile
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2 text-gray-300 hover:bg-sl-light-gray hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Settings className="w-4 h-4 mr-3" />
                  Settings
                </Link>

                <hr className="border-sl-light-gray" />

                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sl-red hover:bg-sl-light-gray transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Logout
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Navbar
