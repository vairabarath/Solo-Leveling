import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useStats } from '../context/StatsContext'
import { userService } from '../services/userService'
import { 
  User, 
  Award, 
  Target, 
  TrendingUp, 
  Calendar,
  Star,
  Crown,
  Shield,
  Sword
} from 'lucide-react'

const Profile = () => {
  const { user, updateUser } = useAuth()
  const { currentStats } = useStats()
  const [profile, setProfile] = useState(null)
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const [profileData, historyData] = await Promise.all([
          userService.getProfile(),
          userService.getHistory()
        ])
        
        setProfile(profileData.data)
        setHistory(historyData.data.completedQuests || [])
      } catch (error) {
        console.error('Failed to load profile:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [])

  const getRankIcon = (level) => {
    if (level >= 100) return <Crown className="w-6 h-6 text-sl-yellow" />
    if (level >= 80) return <Star className="w-6 h-6 text-sl-purple" />
    if (level >= 60) return <Shield className="w-6 h-6 text-sl-blue" />
    if (level >= 40) return <Sword className="w-6 h-6 text-sl-green" />
    return <Target className="w-6 h-6 text-gray-400" />
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
          <p className="text-gray-300">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-sl-dark py-6 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2 glow-text">
            Hunter Profile
          </h1>
          <p className="text-gray-300 text-lg">
            Your journey as a hunter
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hunter Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="card-glow"
            >
              <div className="flex items-center space-x-6 mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-sl-blue to-sl-cyan rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {user?.name}
                  </h2>
                  <div className="flex items-center space-x-2">
                    {getRankIcon(currentStats?.level || 1)}
                    <span className={`text-lg font-semibold ${getRankColor(currentStats?.level || 1)}`}>
                      {profile?.rank || 'E-Rank Hunter'}
                    </span>
                  </div>
                  <div className="text-sl-blue text-lg">
                    Level {currentStats?.level || 1}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Active Title</div>
                  <div className="text-white font-semibold">
                    {user?.activeTitle?.name || 'No Title'}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Member Since</div>
                  <div className="text-white font-semibold">
                    {new Date(user?.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card-glow"
            >
              <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-sl-blue" />
                Current Stats
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { name: 'STR', value: currentStats?.strength || 0, color: 'text-sl-red' },
                  { name: 'AGI', value: currentStats?.agility || 0, color: 'text-sl-blue' },
                  { name: 'VIT', value: currentStats?.vitality || 0, color: 'text-sl-green' },
                  { name: 'INT', value: currentStats?.intelligence || 0, color: 'text-sl-purple' },
                  { name: 'SENSE', value: currentStats?.sense || 0, color: 'text-sl-yellow' },
                  { name: 'LUCK', value: currentStats?.luck || 0, color: 'text-sl-orange' }
                ].map((stat, index) => (
                  <div key={stat.name} className="text-center p-3 bg-sl-darker rounded-lg">
                    <div className={`text-2xl font-bold ${stat.color}`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">
                      {stat.name}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quest History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="card-glow"
            >
              <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
                <Target className="w-5 h-5 mr-2 text-sl-green" />
                Recent Quest History
              </h3>
              
              <div className="space-y-3">
                {history.slice(0, 5).map((quest, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-sl-darker rounded-lg">
                    <div>
                      <div className="text-white font-medium">
                        {quest.questTitle}
                      </div>
                      <div className="text-sm text-gray-400">
                        {new Date(quest.completedAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sl-yellow font-semibold">
                        +{quest.xpGained} XP
                      </div>
                      {quest.leveledUp && (
                        <div className="text-xs text-sl-green">
                          Level Up!
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {history.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    No quest history yet
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Achievements and Stats */}
          <div className="space-y-6">
            {/* Achievement Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card-glow"
            >
              <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
                <Award className="w-5 h-5 mr-2 text-sl-yellow" />
                Achievement Stats
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Quests</span>
                  <span className="text-sl-green font-semibold">
                    {profile?.stats?.totalQuestsCompleted || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Current Streak</span>
                  <span className="text-sl-blue font-semibold">
                    {profile?.stats?.dailyQuestStreak || 0} days
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Longest Streak</span>
                  <span className="text-sl-purple font-semibold">
                    {profile?.stats?.longestStreak || 0} days
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total XP Earned</span>
                  <span className="text-sl-yellow font-semibold">
                    {profile?.stats?.totalXPEarned || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Success Rate</span>
                  <span className="text-sl-green font-semibold">
                    {profile?.stats?.successRate || 0}%
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Titles */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="card-glow"
            >
              <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
                <Crown className="w-5 h-5 mr-2 text-sl-purple" />
                Active Title
              </h3>
              
              {user?.activeTitle ? (
                <div className="p-4 bg-sl-yellow/10 border border-sl-yellow/30 rounded-lg">
                  <div className="text-sl-yellow font-semibold mb-1">
                    {user.activeTitle.name}
                  </div>
                  <div className="text-sm text-gray-300">
                    Provides stat bonuses when equipped
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 text-gray-400">
                  No active title
                </div>
              )}
            </motion.div>

            {/* Progress to Next Rank */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="card-glow"
            >
              <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-sl-cyan" />
                Next Rank Progress
              </h3>
              
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-sl-blue mb-1">
                    {currentStats?.level || 1}
                  </div>
                  <div className="text-sm text-gray-400">Current Level</div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">XP Progress</span>
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
                
                <div className="text-center text-sm text-gray-400">
                  {currentStats?.nextLevelXP - currentStats?.currentXP || 0} XP to next level
                </div>
              </div>
            </motion.div>

            {/* System Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="card-glow"
            >
              <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-sl-green" />
                System Info
              </h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Hunter ID</span>
                  <span className="text-white font-mono">
                    #{user?._id?.slice(-8) || 'Unknown'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">System Version</span>
                  <span className="text-white">1.0.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Last Login</span>
                  <span className="text-white">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <span className="text-sl-green">Active</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
