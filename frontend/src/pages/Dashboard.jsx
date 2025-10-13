import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useQuests } from '../context/QuestContext'
import { useStats } from '../context/StatsContext'
import { Target, Clock, Zap, TrendingUp, Award, Sword } from 'lucide-react'
import StatusWindow from '../components/Stats/StatusWindow'
import DailyQuestPanel from '../components/Quest/DailyQuestPanel'
import QuestCard from '../components/Quest/QuestCard'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const Dashboard = () => {
  const { user } = useAuth()
  const { dailyQuests, getDailyQuests, loading } = useQuests()
  const { currentStats, getCurrentStats } = useStats()
  const [statsHistory, setStatsHistory] = useState([])

  useEffect(() => {
    // Load daily quests and stats
    const loadData = async () => {
      try {
        await Promise.all([
          getDailyQuests(),
          getCurrentStats()
        ])
      } catch (error) {
        console.error('Failed to load dashboard data:', error)
      }
    }

    loadData()
  }, [])

  // Mock data for stats history chart
  const mockStatsHistory = [
    { day: 'Mon', strength: 42, agility: 35, vitality: 38 },
    { day: 'Tue', strength: 43, agility: 36, vitality: 39 },
    { day: 'Wed', strength: 44, agility: 37, vitality: 40 },
    { day: 'Thu', strength: 45, agility: 38, vitality: 41 },
    { day: 'Fri', strength: 46, agility: 39, vitality: 42 },
    { day: 'Sat', strength: 47, agility: 40, vitality: 43 },
    { day: 'Sun', strength: 48, agility: 41, vitality: 44 }
  ]

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  const getRankTitle = (level) => {
    if (level >= 100) return 'S-Rank Hunter'
    if (level >= 80) return 'A-Rank Hunter'
    if (level >= 60) return 'B-Rank Hunter'
    if (level >= 40) return 'C-Rank Hunter'
    if (level >= 20) return 'D-Rank Hunter'
    return 'E-Rank Hunter'
  }

  return (
    <div className="min-h-screen bg-sl-dark py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2 glow-text">
            {getGreeting()}, {user?.name}
          </h1>
          <p className="text-gray-300 text-lg">
            {getRankTitle(currentStats?.level || 1)} • Level {currentStats?.level || 1}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Stats and Progress */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Window */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <StatusWindow />
            </motion.div>

            {/* Daily Quests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <DailyQuestPanel />
            </motion.div>

            {/* Stats Growth Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="card-glow"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-sl-blue" />
                  Stats Growth
                </h3>
                <span className="text-sm text-gray-400">Last 7 days</span>
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockStatsHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                    <XAxis dataKey="day" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1a1a1a',
                        border: '1px solid #2a2a2a',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="strength"
                      stroke="#ff0040"
                      strokeWidth={2}
                      dot={{ fill: '#ff0040', strokeWidth: 2, r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="agility"
                      stroke="#00d4ff"
                      strokeWidth={2}
                      dot={{ fill: '#00d4ff', strokeWidth: 2, r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="vitality"
                      stroke="#00ff40"
                      strokeWidth={2}
                      dot={{ fill: '#00ff40', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Quick Actions and Info */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card-glow"
            >
              <h3 className="text-lg font-semibold mb-4 text-white">
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Quest Streak</span>
                  <span className="text-sl-blue font-semibold">
                    {user?.dailyQuestStreak || 0} days
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Quests</span>
                  <span className="text-sl-green font-semibold">
                    {user?.totalQuestsCompleted || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Active Title</span>
                  <span className="text-sl-yellow font-semibold">
                    {user?.activeTitle?.name || 'None'}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="card-glow"
            >
              <h3 className="text-lg font-semibold mb-4 text-white">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link
                  to="/quests"
                  className="flex items-center p-3 rounded-lg bg-sl-light-gray hover:bg-sl-blue/20 transition-colors group"
                >
                  <Target className="w-5 h-5 mr-3 text-sl-blue group-hover:scale-110 transition-transform" />
                  <span className="text-white">Browse All Quests</span>
                </Link>
                <Link
                  to="/stats"
                  className="flex items-center p-3 rounded-lg bg-sl-light-gray hover:bg-sl-blue/20 transition-colors group"
                >
                  <TrendingUp className="w-5 h-5 mr-3 text-sl-green group-hover:scale-110 transition-transform" />
                  <span className="text-white">View Detailed Stats</span>
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center p-3 rounded-lg bg-sl-light-gray hover:bg-sl-blue/20 transition-colors group"
                >
                  <Award className="w-5 h-5 mr-3 text-sl-purple group-hover:scale-110 transition-transform" />
                  <span className="text-white">Achievements & Titles</span>
                </Link>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="card-glow"
            >
              <h3 className="text-lg font-semibold mb-4 text-white">
                Recent Activity
              </h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-sl-green rounded-full mr-3" />
                  <span className="text-gray-300">Completed "40 Push-ups"</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-sl-blue rounded-full mr-3" />
                  <span className="text-gray-300">Gained +3 STR, +1 VIT</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-sl-yellow rounded-full mr-3" />
                  <span className="text-gray-300">Level up to 15!</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-sl-purple rounded-full mr-3" />
                  <span className="text-gray-300">Unlocked "Wolf Slayer" title</span>
                </div>
              </div>
            </motion.div>

            {/* System Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="card-glow"
            >
              <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
                <Zap className="w-5 h-5 mr-2 text-sl-yellow" />
                System Status
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Connection</span>
                  <span className="text-sl-green text-sm">● Online</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Quest Generation</span>
                  <span className="text-sl-green text-sm">● Active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Stat Tracking</span>
                  <span className="text-sl-green text-sm">● Active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Title System</span>
                  <span className="text-sl-green text-sm">● Active</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
