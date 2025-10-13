import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useStats } from '../context/StatsContext'
import { useAuth } from '../context/AuthContext'
import StatusWindow from '../components/Stats/StatusWindow'
import StatGrowthChart from '../components/Stats/StatGrowthChart'
import StatBreakdown from '../components/Stats/StatBreakdown'
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Award,
  Calendar,
  Zap
} from 'lucide-react'

const Stats = () => {
  const { user } = useAuth()
  const { 
    currentStats, 
    statsHistory, 
    statsBreakdown, 
    getCurrentStats, 
    getStatsHistory, 
    getStatsBreakdown,
    loading 
  } = useStats()
  
  const [selectedPeriod, setSelectedPeriod] = useState('7')

  useEffect(() => {
    const loadStats = async () => {
      try {
        await Promise.all([
          getCurrentStats(),
          getStatsHistory(parseInt(selectedPeriod)),
          getStatsBreakdown()
        ])
      } catch (error) {
        console.error('Failed to load stats:', error)
      }
    }

    loadStats()
  }, [selectedPeriod])

  const getRankTitle = (level) => {
    if (level >= 100) return 'S-Rank Hunter'
    if (level >= 80) return 'A-Rank Hunter'
    if (level >= 60) return 'B-Rank Hunter'
    if (level >= 40) return 'C-Rank Hunter'
    if (level >= 20) return 'D-Rank Hunter'
    return 'E-Rank Hunter'
  }

  const getRankColor = (level) => {
    if (level >= 100) return 'text-sl-yellow'
    if (level >= 80) return 'text-sl-purple'
    if (level >= 60) return 'text-sl-blue'
    if (level >= 40) return 'text-sl-green'
    if (level >= 20) return 'text-sl-orange'
    return 'text-gray-400'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-sl-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sl-blue mx-auto mb-4" />
          <p className="text-gray-300">Loading stats...</p>
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
            Hunter Statistics
          </h1>
          <p className="text-gray-300 text-lg">
            Track your progress and growth as a hunter
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Current Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Window */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <StatusWindow />
            </motion.div>

            {/* Stats Growth Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <StatGrowthChart 
                data={statsHistory}
                period={selectedPeriod}
                onPeriodChange={setSelectedPeriod}
              />
            </motion.div>

            {/* Stats Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <StatBreakdown data={statsBreakdown} />
            </motion.div>
          </div>

          {/* Right Column - Info and Achievements */}
          <div className="space-y-6">
            {/* Hunter Rank */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card-glow"
            >
              <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
                <Award className="w-5 h-5 mr-2 text-sl-yellow" />
                Hunter Rank
              </h3>
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${getRankColor(currentStats?.level || 1)}`}>
                  {getRankTitle(currentStats?.level || 1)}
                </div>
                <div className="text-sl-blue text-lg font-semibold">
                  Level {currentStats?.level || 1}
                </div>
                <div className="text-sm text-gray-400 mt-2">
                  {currentStats?.activeTitle?.name || 'No active title'}
                </div>
              </div>
            </motion.div>

            {/* Quest Statistics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="card-glow"
            >
              <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
                <Target className="w-5 h-5 mr-2 text-sl-blue" />
                Quest Statistics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Completed</span>
                  <span className="text-sl-green font-semibold">
                    {user?.totalQuestsCompleted || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Current Streak</span>
                  <span className="text-sl-blue font-semibold">
                    {user?.dailyQuestStreak || 0} days
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total XP Earned</span>
                  <span className="text-sl-yellow font-semibold">
                    {user?.totalXP || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Success Rate</span>
                  <span className="text-sl-green font-semibold">
                    {user?.totalQuestsCompleted > 0 ? '100%' : '0%'}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Recent Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="card-glow"
            >
              <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
                <Zap className="w-5 h-5 mr-2 text-sl-purple" />
                Recent Achievements
              </h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-sl-green rounded-full mr-3" />
                  <span className="text-gray-300">Completed first quest</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-sl-blue rounded-full mr-3" />
                  <span className="text-gray-300">Reached level 10</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-sl-yellow rounded-full mr-3" />
                  <span className="text-gray-300">7-day quest streak</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-sl-purple rounded-full mr-3" />
                  <span className="text-gray-300">Unlocked "Wolf Slayer" title</span>
                </div>
              </div>
            </motion.div>

            {/* Progress to Next Level */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="card-glow"
            >
              <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-sl-cyan" />
                Next Level Progress
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Current XP</span>
                  <span className="text-sl-blue font-semibold">
                    {currentStats?.currentXP || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Next Level</span>
                  <span className="text-sl-yellow font-semibold">
                    {currentStats?.nextLevelXP || 0} XP
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-sl-blue">
                      {Math.round(currentStats?.xpProgress || 0)}%
                    </span>
                  </div>
                  <div className="stat-bar">
                    <div 
                      className="stat-fill bg-gradient-to-r from-sl-blue to-sl-cyan"
                      style={{ width: `${currentStats?.xpProgress || 0}%` }}
                    />
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

export default Stats
