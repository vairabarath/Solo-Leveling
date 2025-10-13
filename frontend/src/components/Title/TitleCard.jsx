import { useState } from 'react'
import { motion } from 'framer-motion'
import { titleService } from '../../services/titleService'
import { 
  Award, 
  Crown, 
  Star, 
  Shield, 
  Zap, 
  CheckCircle, 
  Lock,
  Sword,
  Brain,
  Heart,
  Eye,
  Target
} from 'lucide-react'
import toast from 'react-hot-toast'

const TitleCard = ({ title, onEquip, onUpdate }) => {
  const [isEquipping, setIsEquipping] = useState(false)
  const [isUnlocking, setIsUnlocking] = useState(false)

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

  const getRarityGlow = (rarity) => {
    switch (rarity) {
      case 'common': return 'shadow-gray-400/20'
      case 'rare': return 'shadow-blue-500/20'
      case 'epic': return 'shadow-purple-500/20'
      case 'legendary': return 'shadow-yellow-500/40'
      default: return 'shadow-gray-400/20'
    }
  }

  const getStatIcon = (stat) => {
    switch (stat) {
      case 'str': return <Sword className="w-3 h-3" />
      case 'agi': return <Zap className="w-3 h-3" />
      case 'vit': return <Shield className="w-3 h-3" />
      case 'int': return <Brain className="w-3 h-3" />
      case 'sense': return <Eye className="w-3 h-3" />
      case 'luck': return <Star className="w-3 h-3" />
      default: return <Target className="w-3 h-3" />
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

  const handleEquip = async () => {
    if (isEquipping) return
    
    setIsEquipping(true)
    try {
      await titleService.equipTitle(title._id)
      toast.success(`Title "${title.name}" equipped!`)
      onEquip()
    } catch (error) {
      toast.error('Failed to equip title')
    } finally {
      setIsEquipping(false)
    }
  }

  const handleUnlock = async () => {
    if (isUnlocking) return
    
    setIsUnlocking(true)
    try {
      // This would be called when a title becomes available
      await onUpdate()
      toast.success(`Title "${title.name}" unlocked!`)
    } catch (error) {
      toast.error('Failed to unlock title')
    } finally {
      setIsUnlocking(false)
    }
  }

  const isOwned = title.isEquipped !== undefined
  const isEquipped = title.isEquipped
  const isLocked = !isOwned

  const bonuses = [
    { stat: 'str', value: title.strBonus },
    { stat: 'agi', value: title.agiBonus },
    { stat: 'vit', value: title.vitBonus },
    { stat: 'int', value: title.intBonus },
    { stat: 'sense', value: title.senseBonus },
    { stat: 'luck', value: title.luckBonus }
  ].filter(bonus => bonus.value > 0)

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`title-card ${
        isEquipped ? 'equipped' : isOwned ? 'owned' : ''
      } ${getRarityBorder(title.rarity)} ${getRarityGlow(title.rarity)}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className={getRarityColor(title.rarity)}>
            {getRarityIcon(title.rarity)}
          </div>
          <span className={`text-sm font-medium uppercase ${getRarityColor(title.rarity)}`}>
            {title.rarity}
          </span>
        </div>
        
        {isEquipped && (
          <div className="flex items-center text-sl-yellow text-sm">
            <CheckCircle className="w-4 h-4 mr-1" />
            Equipped
          </div>
        )}
        
        {isLocked && (
          <div className="flex items-center text-gray-400 text-sm">
            <Lock className="w-4 h-4 mr-1" />
            Locked
          </div>
        )}
      </div>

      {/* Title Info */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white mb-2">
          {title.name}
        </h3>
        <p className="text-gray-300 text-sm">
          {title.description}
        </p>
      </div>

      {/* Bonuses */}
      {bonuses.length > 0 && (
        <div className="mb-4">
          <div className="text-xs text-gray-400 mb-2">Stat Bonuses:</div>
          <div className="flex flex-wrap gap-2">
            {bonuses.map((bonus, index) => (
              <div
                key={index}
                className={`flex items-center space-x-1 px-2 py-1 rounded bg-sl-darker ${getStatColor(bonus.stat)}`}
              >
                {getStatIcon(bonus.stat)}
                <span className="text-xs font-medium">
                  +{bonus.value} {bonus.stat.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progress (for locked titles) */}
      {isLocked && title.progress && (
        <div className="mb-4">
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
      )}

      {/* Action Button */}
      <div className="flex justify-end">
        {isEquipped ? (
          <div className="flex items-center text-sl-yellow text-sm">
            <CheckCircle className="w-4 h-4 mr-1" />
            Active
          </div>
        ) : isOwned ? (
          <button
            onClick={handleEquip}
            disabled={isEquipping}
            className="btn-primary text-sm px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isEquipping ? (
              <span className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-1" />
                Equipping...
              </span>
            ) : (
              'Equip Title'
            )}
          </button>
        ) : (
          <div className="text-gray-400 text-sm">
            Complete requirements to unlock
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default TitleCard
