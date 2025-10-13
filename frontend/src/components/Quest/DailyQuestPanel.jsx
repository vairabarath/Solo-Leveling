import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useQuests } from '../../context/QuestContext'
import { useStats } from '../../context/StatsContext'
import QuestCard from './QuestCard'
import { Target, Clock, Zap } from 'lucide-react'

const DailyQuestPanel = () => {
  const { dailyQuests, getDailyQuests, loading } = useQuests()
  const { currentStats } = useStats()
  const [timeRemaining, setTimeRemaining] = useState('')

  useEffect(() => {
    getDailyQuests()
  }, [])

  useEffect(() => {
    // Calculate time remaining until next day
    const updateTimeRemaining = () => {
      const now = new Date()
      const tomorrow = new Date(now)
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(0, 0, 0, 0)
      
      const diff = tomorrow - now
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      
      setTimeRemaining(`${hours}h ${minutes}m`)
    }

    updateTimeRemaining()
    const interval = setInterval(updateTimeRemaining, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="card-glow">
        <div className="animate-pulse">
          <div className="h-6 bg-sl-light-gray rounded mb-4" />
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 bg-sl-light-gray rounded" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!dailyQuests || dailyQuests.length === 0) {
    return (
      <div className="card-glow">
        <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
          <Target className="w-5 h-5 mr-2 text-sl-blue" />
          Daily Quests
        </h3>
        <div className="text-center py-8">
          <div className="text-gray-400 mb-4">No daily quests available</div>
          <button
            onClick={() => getDailyQuests()}
            className="btn-primary"
          >
            Generate Daily Quests
          </button>
        </div>
      </div>
    )
  }

  const completedCount = dailyQuests.filter(quest => quest.isCompleted).length
  const allCompleted = completedCount === dailyQuests.length

  return (
    <div className="card-glow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white flex items-center">
          <Target className="w-5 h-5 mr-2 text-sl-blue" />
          Daily Quests
        </h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center text-gray-400">
            <Clock className="w-4 h-4 mr-1" />
            {timeRemaining}
          </div>
          <div className="text-sl-blue">
            {completedCount}/{dailyQuests.length}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">Progress</span>
          <span className="text-sm text-sl-blue font-semibold">
            {Math.round((completedCount / dailyQuests.length) * 100)}%
          </span>
        </div>
        <div className="stat-bar">
          <motion.div
            className="stat-fill bg-gradient-to-r from-sl-blue to-sl-cyan"
            initial={{ width: 0 }}
            animate={{ width: `${(completedCount / dailyQuests.length) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Quest Cards */}
      <div className="grid gap-4">
        {dailyQuests.map((quest, index) => (
          <motion.div
            key={quest.questId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <QuestCard
              quest={quest}
              isDaily={true}
              showRewards={true}
            />
          </motion.div>
        ))}
      </div>

      {/* Completion Bonus */}
      {allCompleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-6 p-4 bg-sl-green/10 border border-sl-green/30 rounded-lg"
        >
          <div className="flex items-center justify-center">
            <Zap className="w-5 h-5 mr-2 text-sl-green" />
            <span className="text-sl-green font-semibold">
              All daily quests completed! +1 LUCK bonus earned!
            </span>
          </div>
        </motion.div>
      )}

      {/* Streak Info */}
      <div className="mt-6 p-4 bg-sl-light-gray rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-400">Current Streak</div>
            <div className="text-lg font-semibold text-sl-blue">
              {currentStats?.dailyQuestStreak || 0} days
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">Next Bonus</div>
            <div className="text-sm text-sl-yellow">
              {7 - ((currentStats?.dailyQuestStreak || 0) % 7)} days
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DailyQuestPanel
