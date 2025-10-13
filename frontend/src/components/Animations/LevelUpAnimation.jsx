import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Zap, Crown, Award } from 'lucide-react'

const LevelUpAnimation = ({ isVisible, level, onComplete }) => {
  const [showParticles, setShowParticles] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShowParticles(true)
      const timer = setTimeout(() => {
        setShowParticles(false)
        onComplete?.()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onComplete])

  if (!isVisible) return null

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
          animate={{ opacity: 0.8 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-sl-dark"
        />

        {/* Main Level Up Content */}
        <motion.div
          initial={{ scale: 0.5, rotateY: 180 }}
          animate={{ scale: 1, rotateY: 0 }}
          exit={{ scale: 0.5, rotateY: -180 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative text-center"
        >
          {/* Level Up Text */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-6xl md:text-8xl font-bold text-sl-yellow mb-4 level-up-text"
          >
            LEVEL UP!
          </motion.div>

          {/* New Level */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="text-4xl md:text-6xl font-bold text-white mb-8"
          >
            Level {level}
          </motion.div>

          {/* Hunter Rank */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-2xl text-sl-cyan rank-glow"
          >
            Hunter Rank: {getHunterRank(level)}
          </motion.div>
        </motion.div>

        {/* Particle Effects */}
        {showParticles && (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
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
                <Star className="w-4 h-4 text-sl-yellow" />
              </motion.div>
            ))}
          </div>
        )}

        {/* Power Surge Effect */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-96 h-96 rounded-full border-4 border-sl-cyan opacity-20 power-surge" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

const getHunterRank = (level) => {
  if (level < 10) return 'E-Rank'
  if (level < 20) return 'D-Rank'
  if (level < 30) return 'C-Rank'
  if (level < 40) return 'B-Rank'
  if (level < 50) return 'A-Rank'
  if (level < 60) return 'S-Rank'
  if (level < 70) return 'SS-Rank'
  if (level < 80) return 'SSS-Rank'
  return 'National Level'
}

export default LevelUpAnimation
