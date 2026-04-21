import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useQuests } from '../context/QuestContext'
import { useStats } from '../context/StatsContext'
import QuestCompleteModal from '../components/Quest/QuestCompleteModal'
import { 
  ArrowLeft, 
  Target, 
  Clock, 
  Zap, 
  Sword,
  Shield,
  Brain,
  Heart,
  Eye,
  Star,
  CheckCircle
} from 'lucide-react'

const QuestDetail = () => {
  const { id } = useParams()
  const { getQuestById, completeQuest, currentQuest, loading } = useQuests()
  const { updateStats, getCurrentStats } = useStats()
  const [showCompleteModal, setShowCompleteModal] = useState(false)

  useEffect(() => {
    if (id) {
      getQuestById(id)
    }
  }, [id])

  const handleComplete = async () => {
    try {
      const result = await completeQuest(id)

      if (result?.updatedUser) {
        updateStats(result.updatedUser)
      }

      setShowCompleteModal(false)
      getCurrentStats()
    } catch (error) {
      console.error('Failed to complete quest:', error)
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'fitness': return <Sword className="w-5 h-5" />
      case 'cardio': return <Zap className="w-5 h-5" />
      case 'mental': return <Brain className="w-5 h-5" />
      case 'wellness': return <Heart className="w-5 h-5" />
      case 'nutrition': return <Heart className="w-5 h-5" />
      default: return <Target className="w-5 h-5" />
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'fitness': return 'text-sl-red'
      case 'cardio': return 'text-sl-blue'
      case 'mental': return 'text-sl-purple'
      case 'wellness': return 'text-sl-green'
      case 'nutrition': return 'text-sl-orange'
      default: return 'text-gray-400'
    }
  }

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

  if (loading) {
    return (
      <div className="min-h-screen bg-sl-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sl-blue mx-auto mb-4" />
          <p className="text-gray-300">Loading quest details...</p>
        </div>
      </div>
    )
  }

  if (!currentQuest) {
    return (
      <div className="min-h-screen bg-sl-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Quest not found</h1>
          <p className="text-gray-300 mb-6">The quest you're looking for doesn't exist.</p>
          <Link to="/quests" className="btn-primary">
            Back to Quests
          </Link>
        </div>
      </div>
    )
  }

  const rewards = [
    { stat: 'str', value: currentQuest.strReward },
    { stat: 'agi', value: currentQuest.agiReward },
    { stat: 'vit', value: currentQuest.vitReward },
    { stat: 'int', value: currentQuest.intReward },
    { stat: 'sense', value: currentQuest.senseReward },
    { stat: 'luck', value: currentQuest.luckReward }
  ].filter(reward => reward.value > 0)

  return (
    <div className="min-h-screen bg-sl-dark py-6 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <Link
            to="/quests"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Quests
          </Link>
        </motion.div>

        {/* Quest Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="card-glow mb-8"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className={`${getCategoryColor(currentQuest.category)}`}>
                {getCategoryIcon(currentQuest.category)}
              </div>
              <div>
                <span className="text-sm font-medium text-gray-400 uppercase">
                  {currentQuest.category}
                </span>
                <div className="text-sm text-gray-400">
                  {currentQuest.tier} • {currentQuest.difficulty}
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-sl-blue">
                +{currentQuest.xpReward} XP
              </div>
              <div className="text-sm text-gray-400">Experience</div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">
            {currentQuest.title}
          </h1>

          {currentQuest.description && (
            <p className="text-gray-300 text-lg mb-6">
              {currentQuest.description}
            </p>
          )}

          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {currentQuest.estimatedTime}
            </div>
            <div className="flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Level {currentQuest.requiredLevel} required
            </div>
          </div>
        </motion.div>

        {/* Rewards Section */}
        {rewards.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card-glow mb-8"
          >
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-sl-yellow" />
              Quest Rewards
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {rewards.map((reward, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-sl-darker rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`${getStatColor(reward.stat)}`}>
                      {getStatIcon(reward.stat)}
                    </div>
                    <div>
                      <div className="font-semibold text-white">
                        {reward.stat.toUpperCase()}
                      </div>
                      <div className="text-sm text-gray-400">
                        {reward.stat === 'str' && 'Strength'}
                        {reward.stat === 'agi' && 'Agility'}
                        {reward.stat === 'vit' && 'Vitality'}
                        {reward.stat === 'int' && 'Intelligence'}
                        {reward.stat === 'sense' && 'Sense'}
                        {reward.stat === 'luck' && 'Luck'}
                      </div>
                    </div>
                  </div>
                  <div className={`text-xl font-bold ${getStatColor(reward.stat)}`}>
                    +{reward.value}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="card-glow"
        >
          <div className="text-center">
            <h2 className="text-xl font-semibold text-white mb-4">
              Ready to Complete?
            </h2>
            <p className="text-gray-300 mb-6">
              Make sure you've actually completed this quest before marking it as done.
            </p>
            
            <button
              onClick={() => setShowCompleteModal(true)}
              className="btn-primary text-lg px-8 py-4 flex items-center mx-auto"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Complete Quest
            </button>
          </div>
        </motion.div>
      </div>

      {/* Complete Modal */}
      {showCompleteModal && (
        <QuestCompleteModal
          quest={currentQuest}
          onComplete={handleComplete}
          onClose={() => setShowCompleteModal(false)}
        />
      )}
    </div>
  )
}

export default QuestDetail
