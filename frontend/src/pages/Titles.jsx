import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { titleService } from '../services/titleService'
import TitleGallery from '../components/Title/TitleGallery'
import { Award, Crown, Star, Shield, Zap, TrendingUp } from 'lucide-react'

const Titles = () => {
  const [titles, setTitles] = useState({ owned: [], locked: [] })
  const [progress, setProgress] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTitles()
  }, [])

  const loadTitles = async () => {
    try {
      setLoading(true)
      const [titlesResponse, progressResponse] = await Promise.all([
        titleService.getTitles(),
        titleService.getTitleProgress()
      ])
      
      setTitles(titlesResponse.data)
      setProgress(progressResponse.data)
    } catch (error) {
      console.error('Failed to load titles:', error)
    } finally {
      setLoading(false)
    }
  }

  const getRarityStats = () => {
    const stats = {
      common: 0,
      rare: 0,
      epic: 0,
      legendary: 0
    }

    titles.owned?.forEach(title => {
      stats[title.rarity] = (stats[title.rarity] || 0) + 1
    })

    return stats
  }

  const rarityStats = getRarityStats()

  if (loading) {
    return (
      <div className="min-h-screen bg-sl-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sl-blue mx-auto mb-4" />
          <p className="text-gray-300">Loading titles...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-sl-dark py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2 glow-text">
            Title Gallery
          </h1>
          <p className="text-gray-300 text-lg">
            Unlock and equip powerful titles to boost your stats
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Title Gallery */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <TitleGallery />
            </motion.div>
          </div>

          {/* Right Column - Stats and Progress */}
          <div className="space-y-6">
            {/* Rarity Breakdown */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card-glow"
            >
              <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
                <Award className="w-5 h-5 mr-2 text-sl-yellow" />
                Rarity Breakdown
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">Common</span>
                  </div>
                  <span className="text-gray-400">{rarityStats.common}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-sl-blue" />
                    <span className="text-gray-300">Rare</span>
                  </div>
                  <span className="text-sl-blue">{rarityStats.rare}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Crown className="w-4 h-4 text-sl-purple" />
                    <span className="text-gray-300">Epic</span>
                  </div>
                  <span className="text-sl-purple">{rarityStats.epic}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-sl-yellow" />
                    <span className="text-gray-300">Legendary</span>
                  </div>
                  <span className="text-sl-yellow">{rarityStats.legendary}</span>
                </div>
              </div>
            </motion.div>

            {/* Progress Tracking */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="card-glow"
            >
              <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-sl-green" />
                Progress Tracking
              </h3>
              
              <div className="space-y-3">
                {progress.slice(0, 5).map((title, index) => (
                  <div key={title.titleId} className="p-3 bg-sl-darker rounded-lg">
                    <div className="text-sm font-medium text-white mb-1">
                      {title.name}
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-gray-400">Progress</span>
                      <span className="text-xs text-sl-blue">
                        {title.progress.percentage}%
                      </span>
                    </div>
                    <div className="stat-bar">
                      <div 
                        className="stat-fill bg-gradient-to-r from-sl-blue to-sl-cyan"
                        style={{ width: `${title.progress.percentage}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {title.progress.current} / {title.progress.required}
                    </div>
                  </div>
                ))}
                
                {progress.length === 0 && (
                  <div className="text-center py-4 text-gray-400">
                    No titles in progress
                  </div>
                )}
              </div>
            </motion.div>

            {/* Achievement Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card-glow"
            >
              <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
                <Star className="w-5 h-5 mr-2 text-sl-purple" />
                Achievement Tips
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-sl-darker rounded-lg">
                  <div className="text-sm font-medium text-white mb-1">
                    Complete Daily Quests
                  </div>
                  <div className="text-gray-400">
                    Maintain a streak to unlock streak-based titles
                  </div>
                </div>
                
                <div className="p-3 bg-sl-darker rounded-lg">
                  <div className="text-sm font-medium text-white mb-1">
                    Focus on Categories
                  </div>
                  <div className="text-gray-400">
                    Complete quests in specific categories for category titles
                  </div>
                </div>
                
                <div className="p-3 bg-sl-darker rounded-lg">
                  <div className="text-sm font-medium text-white mb-1">
                    Level Up
                  </div>
                  <div className="text-gray-400">
                    Reach higher levels to unlock level-based titles
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Titles
