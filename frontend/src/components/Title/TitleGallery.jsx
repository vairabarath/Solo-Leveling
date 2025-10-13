import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { titleService } from '../../services/titleService'
import TitleCard from './TitleCard'
import { Award, Crown, Star, Shield, Sword, Zap } from 'lucide-react'

const TitleGallery = () => {
  const [titles, setTitles] = useState({ owned: [], locked: [] })
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, owned, locked

  useEffect(() => {
    loadTitles()
  }, [])

  const loadTitles = async () => {
    try {
      setLoading(true)
      const response = await titleService.getTitles()
      setTitles(response.data)
    } catch (error) {
      console.error('Failed to load titles:', error)
    } finally {
      setLoading(false)
    }
  }

  const getRarityIcon = (rarity) => {
    switch (rarity) {
      case 'common': return <Shield className="w-4 h-4" />
      case 'rare': return <Star className="w-4 h-4" />
      case 'epic': return <Crown className="w-4 h-4" />
      case 'legendary': return <Zap className="w-4 h-4" />
      default: return <Award className="w-4 h-4" />
    }
  }

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'text-gray-400'
      case 'rare': return 'text-sl-blue'
      case 'epic': return 'text-sl-purple'
      case 'legendary': return 'text-sl-yellow'
      default: return 'text-gray-400'
    }
  }

  const getRarityBorder = (rarity) => {
    switch (rarity) {
      case 'common': return 'border-gray-400'
      case 'rare': return 'border-sl-blue'
      case 'epic': return 'border-sl-purple'
      case 'legendary': return 'border-sl-yellow'
      default: return 'border-gray-400'
    }
  }

  const filteredTitles = () => {
    if (filter === 'owned') return titles.owned || []
    if (filter === 'locked') return titles.locked || []
    return [...(titles.owned || []), ...(titles.locked || [])]
  }

  if (loading) {
    return (
      <div className="card-glow">
        <div className="animate-pulse">
          <div className="h-6 bg-sl-light-gray rounded mb-4" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-32 bg-sl-light-gray rounded" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold glow-text flex items-center">
          <Award className="w-6 h-6 mr-2 text-sl-yellow" />
          Title Gallery
        </h2>
        
        <div className="flex items-center space-x-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-sl-darker border border-sl-light-gray rounded px-3 py-1 text-white text-sm"
          >
            <option value="all">All Titles</option>
            <option value="owned">Owned</option>
            <option value="locked">Locked</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-sl-darker rounded-lg">
          <div className="text-2xl font-bold text-sl-green">
            {titles.owned?.length || 0}
          </div>
          <div className="text-sm text-gray-400">Owned</div>
        </div>
        <div className="text-center p-4 bg-sl-darker rounded-lg">
          <div className="text-2xl font-bold text-sl-blue">
            {titles.locked?.length || 0}
          </div>
          <div className="text-sm text-gray-400">Locked</div>
        </div>
        <div className="text-center p-4 bg-sl-darker rounded-lg">
          <div className="text-2xl font-bold text-sl-yellow">
            {Math.round(((titles.owned?.length || 0) / ((titles.owned?.length || 0) + (titles.locked?.length || 0))) * 100) || 0}%
          </div>
          <div className="text-sm text-gray-400">Complete</div>
        </div>
      </div>

      {/* Title Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTitles().map((title, index) => (
          <motion.div
            key={title._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <TitleCard
              title={title}
              onEquip={loadTitles}
              onUpdate={loadTitles}
            />
          </motion.div>
        ))}
      </div>

      {filteredTitles().length === 0 && (
        <div className="text-center py-12">
          <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            No titles found
          </h3>
          <p className="text-gray-400">
            {filter === 'owned' && "You haven't unlocked any titles yet."}
            {filter === 'locked' && "All titles are unlocked!"}
            {filter === 'all' && "No titles available."}
          </p>
        </div>
      )}
    </div>
  )
}

export default TitleGallery
