import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Star, Zap, Award } from 'lucide-react'

const QuestCompleteAnimation = ({ isVisible, quest, onComplete }) => {
  const [showRewards, setShowRewards] = useState(false)

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShowRewards(true)
      }, 500)
      
      const completeTimer = setTimeout(() => {
        onComplete?.()
      }, 3000)
      
      return () => {
        clearTimeout(timer)
        clearTimeout(completeTimer)
      }
    }
  }, [isVisible, onComplete])

  if (!isVisible || !quest) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
      >
        {/* Background Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-sl-dark"
        />

        {/* Quest Complete Content */}
        <motion.div
          initial={{ scale: 0.5, rotateY: 180 }}
          animate={{ scale: 1, rotateY: 0 }}
          exit={{ scale: 0.5, rotateY: -180 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative text-center max-w-md mx-4"
        >
          {/* Quest Complete Text */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-sl-green mb-4 quest-complete-animation"
          >
            QUEST COMPLETE!
          </motion.div>

          {/* Quest Name */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="text-2xl font-semibold text-white mb-6"
          >
            {quest.title}
          </motion.div>

          {/* Rewards */}
          {showRewards && (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="space-y-4"
            >
              <div className="text-lg text-gray-300 mb-4">Rewards:</div>
              
              {quest.xpReward > 0 && (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.4 }}
                  className="flex items-center justify-center space-x-2 text-sl-cyan"
                >
                  <Star className="w-5 h-5" />
                  <span className="text-lg font-semibold">
                    +{quest.xpReward} XP
                  </span>
                </motion.div>
              )}

              {quest.statRewards && Object.entries(quest.statRewards).map(([stat, value], index) => (
                <motion.div
                  key={stat}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
                  className="flex items-center justify-center space-x-2 text-sl-blue"
                >
                  <Zap className="w-4 h-4" />
                  <span className="text-sm">
                    +{value} {stat.toUpperCase()}
                  </span>
                </motion.div>
              ))}

              {quest.titleReward && (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.4 }}
                  className="flex items-center justify-center space-x-2 text-sl-yellow"
                >
                  <Award className="w-5 h-5" />
                  <span className="text-lg font-semibold">
                    New Title: {quest.titleReward}
                  </span>
                </motion.div>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Particle Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: '50%', 
                y: '50%', 
                scale: 0,
                rotate: 0
              }}
              animate={{ 
                x: `${Math.random() * 100}%`, 
                y: `${Math.random() * 100}%`,
                scale: [0, 1, 0],
                rotate: 360
              }}
              transition={{ 
                duration: 2,
                delay: i * 0.1,
                ease: "easeOut"
              }}
              className="absolute"
            >
              <CheckCircle className="w-3 h-3 text-sl-green" />
            </motion.div>
          ))}
        </div>

        {/* Success Sweep Effect */}
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute inset-0 quest-sweep"
        />
      </motion.div>
    </AnimatePresence>
  )
}

export default QuestCompleteAnimation
