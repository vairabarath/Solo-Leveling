import { useState } from 'react'
import { motion } from 'framer-motion'
import { useQuests } from '../../context/QuestContext'
import { useStats } from '../../context/StatsContext'
import { 
  Target, 
  Clock, 
  Zap, 
  CheckCircle, 
  Play, 
  Award,
  Sword,
  Shield,
  Brain,
  Heart,
  Eye,
  Star
} from 'lucide-react'
import QuestCompleteModal from './QuestCompleteModal'

const QuestCard = ({ quest, isDaily = false, showRewards = false }) => {
  const [showCompleteModal, setShowCompleteModal] = useState(false)
  const { completeQuest } = useQuests()
  const { updateStats } = useStats()

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'fitness': return <Sword className="w-4 h-4" />
      case 'cardio': return <Zap className="w-4 h-4" />
      case 'mental': return <Brain className="w-4 h-4" />
      case 'wellness': return <Heart className="w-4 h-4" />
      case 'career': return <Award className="w-4 h-4" />
      default: return <Target className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'fitness': return 'text-sl-red'
      case 'cardio': return 'text-sl-blue'
      case 'mental': return 'text-sl-purple'
      case 'wellness': return 'text-sl-green'
      case 'career': return 'text-sl-yellow'
      default: return 'text-gray-400'
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

  const handleComplete = async () => {
    try {
      const result = await completeQuest(quest.questId)
      
      // Update stats if provided
      if (result.data?.updatedUser) {
        updateStats(result.data.updatedUser)
      }
      
      setShowCompleteModal(false)
    } catch (error) {
      console.error('Failed to complete quest:', error)
    }
  }

  const rewards = [
    { stat: 'str', value: quest.strReward },
    { stat: 'agi', value: quest.agiReward },
    { stat: 'vit', value: quest.vitReward },
    { stat: 'int', value: quest.intReward },
    { stat: 'sense', value: quest.senseReward },
    { stat: 'luck', value: quest.luckReward }
  ].filter(reward => reward.value > 0)

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`quest-card ${quest.isCompleted ? 'completed' : ''}`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className={`${getCategoryColor(quest.category)}`}>
              {getCategoryIcon(quest.category)}
            </div>
            <span className="text-sm font-medium text-gray-400 uppercase">
              {quest.category}
            </span>
            {isDaily && (
              <span className="text-xs bg-sl-blue/20 text-sl-blue px-2 py-1 rounded">
                DAILY
              </span>
            )}
          </div>
          
          {quest.isCompleted && (
            <CheckCircle className="w-5 h-5 text-sl-green" />
          )}
        </div>

        <h3 className="text-lg font-semibold text-white mb-2">
          {quest.title}
        </h3>

        {quest.description && (
          <p className="text-gray-300 text-sm mb-3">
            {quest.description}
          </p>
        )}

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-gray-400">
            <Clock className="w-4 h-4 mr-1" />
            {quest.estimatedTime}
          </div>
          
          {showRewards && (
            <div className="flex items-center space-x-1">
              <Zap className="w-4 h-4 text-sl-yellow" />
              <span className="text-sm text-sl-yellow font-semibold">
                +{quest.xpReward} XP
              </span>
            </div>
          )}
        </div>

        {/* Rewards */}
        {showRewards && rewards.length > 0 && (
          <div className="mb-4">
            <div className="text-xs text-gray-400 mb-2">Rewards:</div>
            <div className="flex flex-wrap gap-2">
              {rewards.map((reward, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-1 px-2 py-1 rounded bg-sl-darker ${getStatColor(reward.stat)}`}
                >
                  {getStatIcon(reward.stat)}
                  <span className="text-xs font-medium">
                    +{reward.value} {reward.stat.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex justify-end">
          {quest.isCompleted ? (
            <div className="flex items-center text-sl-green text-sm">
              <CheckCircle className="w-4 h-4 mr-1" />
              Completed
            </div>
          ) : (
            <button
              onClick={() => setShowCompleteModal(true)}
              className="btn-primary text-sm px-4 py-2 flex items-center"
            >
              <Play className="w-4 h-4 mr-1" />
              Complete Quest
            </button>
          )}
        </div>
      </motion.div>

      {/* Complete Modal */}
      {showCompleteModal && (
        <QuestCompleteModal
          quest={quest}
          onComplete={handleComplete}
          onClose={() => setShowCompleteModal(false)}
        />
      )}
    </>
  )
}

export default QuestCard
