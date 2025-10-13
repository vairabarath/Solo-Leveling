import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sword, Zap, Shield, Brain, Eye, Star } from 'lucide-react'

const StatGainAnimation = ({ isVisible, statGains, onComplete }) => {
  const [currentStat, setCurrentStat] = useState(0)

  useEffect(() => {
    if (isVisible && statGains.length > 0) {
      const timer = setInterval(() => {
        setCurrentStat(prev => {
          if (prev >= statGains.length - 1) {
            clearInterval(timer)
            setTimeout(() => onComplete?.(), 1000)
            return prev
          }
          return prev + 1
        })
      }, 800)
      return () => clearInterval(timer)
    }
  }, [isVisible, statGains, onComplete])

  if (!isVisible || statGains.length === 0) return null

  const getStatIcon = (stat) => {
    switch (stat) {
      case 'str': return <Sword className="w-6 h-6" />
      case 'agi': return <Zap className="w-6 h-6" />
      case 'vit': return <Shield className="w-6 h-6" />
      case 'int': return <Brain className="w-6 h-6" />
      case 'sense': return <Eye className="w-6 h-6" />
      case 'luck': return <Star className="w-6 h-6" />
      default: return <Star className="w-6 h-6" />
    }
  }

  const getStatColor = (stat) => {
    switch (stat) {
      case 'str': return 'text-sl-red'
      case 'agi': return 'text-sl-blue'
      case 'vit': return 'text-sl-green'
      case 'int': return 'text-sl-purple'
      case 'sense': return 'text-sl-yellow'
      case 'luck': return 'text-sl-orange'
      default: return 'text-gray-400'
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed top-20 right-4 z-40 space-y-2"
      >
        {statGains.map((gain, index) => (
          <motion.div
            key={`${gain.stat}-${index}`}
            initial={{ 
              x: 100, 
              opacity: 0,
              scale: 0.8
            }}
            animate={{ 
              x: 0, 
              opacity: 1,
              scale: 1
            }}
            exit={{ 
              x: -100, 
              opacity: 0,
              scale: 0.8
            }}
            transition={{ 
              duration: 0.6,
              delay: index * 0.2
            }}
            className={`bg-sl-gray/90 backdrop-blur-sm border border-sl-light-gray rounded-lg p-3 shadow-lg ${
              index === currentStat ? 'stat-increase' : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`${getStatColor(gain.stat)}`}>
                {getStatIcon(gain.stat)}
              </div>
              <div>
                <div className="text-white font-semibold">
                  +{gain.amount} {gain.stat.toUpperCase()}
                </div>
                <div className="text-sm text-gray-300">
                  {gain.statName}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  )
}

export default StatGainAnimation
