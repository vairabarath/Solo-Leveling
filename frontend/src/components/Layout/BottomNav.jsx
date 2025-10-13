import { Link, useLocation } from 'react-router-dom'
import { Home, Target, BarChart3, User, Award } from 'lucide-react'
import { motion } from 'framer-motion'

const BottomNav = () => {
  const location = useLocation()

  const navItems = [
    {
      path: '/dashboard',
      icon: Home,
      label: 'Dashboard'
    },
    {
      path: '/quests',
      icon: Target,
      label: 'Quests'
    },
    {
      path: '/stats',
      icon: BarChart3,
      label: 'Stats'
    },
    {
      path: '/titles',
      icon: Award,
      label: 'Titles'
    },
    {
      path: '/profile',
      icon: User,
      label: 'Profile'
    }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-sl-gray/90 backdrop-blur-sm border-t border-sl-light-gray z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            const Icon = item.icon

            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-300 relative"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-sl-blue/20 rounded-lg"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                
                <div className={`relative z-10 flex flex-col items-center ${
                  isActive ? 'text-sl-blue' : 'text-gray-400'
                }`}>
                  <Icon className={`w-5 h-5 mb-1 ${
                    isActive ? 'text-sl-blue' : 'text-gray-400'
                  }`} />
                  <span className="text-xs font-medium">
                    {item.label}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default BottomNav
