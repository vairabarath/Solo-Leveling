import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Target, 
  Zap, 
  CheckCircle, 
  X,
  Sword,
  Shield,
  Brain,
  Heart,
  Eye,
  Star
} from 'lucide-react'

const QuestCompleteModal = ({ quest, onComplete, onClose }) => {
  const [isCompleting, setIsCompleting] = useState(false)

  const getStatIcon = (stat) => {
    switch (stat) {
      case 'str': return <Sword className="w-4 h-4" />
      case 'agi': return <Zap className="w-4 h-4" />
      case 'vit': return <Shield className="w-4 h-4" />
      case 'int': return <Brain className="w-4 h-4" />
      case 'sense': return <Eye className="w-4 h-4" />
      case 'luck': return <Star className="w-4 h-4" />
      default: return <Target className="w-4 h-4" />
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
    setIsCompleting(true)
    try {
      await onComplete()
    } finally {
      setIsCompleting(false)
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
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-sl-gray border border-sl-light-gray rounded-xl p-6 max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-sl-blue" />
              <h2 className="text-xl font-semibold text-white">
                Complete Quest
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quest Info */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">
              {quest.title}
            </h3>
            <p className="text-gray-300 text-sm">
              Are you sure you want to mark this quest as complete?
            </p>
          </div>

          {/* Rewards Preview */}
          {rewards.length > 0 && (
            <div className="mb-6 p-4 bg-sl-darker rounded-lg">
              <div className="text-sm font-medium text-gray-300 mb-3">
                You will receive:
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-sl-yellow" />
                    <span className="text-sm text-gray-300">Experience</span>
                  </div>
                  <span className="text-sl-yellow font-semibold">
                    +{quest.xpReward} XP
                  </span>
                </div>
                {rewards.map((reward, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={getStatColor(reward.stat)}>
                        {getStatIcon(reward.stat)}
                      </div>
                      <span className="text-sm text-gray-300">
                        {reward.stat.toUpperCase()}
                      </span>
                    </div>
                    <span className={`font-semibold ${getStatColor(reward.stat)}`}>
                      +{reward.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Warning */}
          <div className="mb-6 p-3 bg-sl-yellow/10 border border-sl-yellow/30 rounded-lg">
            <div className="flex items-center space-x-2 text-sl-yellow text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>
                This action cannot be undone. Make sure you've actually completed the quest!
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 btn-secondary"
              disabled={isCompleting}
            >
              Cancel
            </button>
            <button
              onClick={handleComplete}
              disabled={isCompleting}
              className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCompleting ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Completing...
                </span>
              ) : (
                'Complete Quest'
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default QuestCompleteModal
