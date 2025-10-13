import { motion } from 'framer-motion'
import { useStats } from '../../context/StatsContext'
import HPBar from './HPBar'
import MPBar from './MPBar'
import XPBar from './XPBar'
import StatBar from './StatBar'

const StatusWindow = () => {
  const { currentStats } = useStats()

  if (!currentStats) {
    return (
      <div className="card-glow">
        <div className="animate-pulse">
          <div className="h-4 bg-sl-light-gray rounded mb-4" />
          <div className="h-4 bg-sl-light-gray rounded mb-4" />
          <div className="h-4 bg-sl-light-gray rounded" />
        </div>
      </div>
    )
  }

  const stats = [
    { name: 'STR', value: currentStats.strength, color: 'text-sl-red', bgColor: 'bg-sl-red' },
    { name: 'AGI', value: currentStats.agility, color: 'text-sl-blue', bgColor: 'bg-sl-blue' },
    { name: 'VIT', value: currentStats.vitality, color: 'text-sl-green', bgColor: 'bg-sl-green' },
    { name: 'INT', value: currentStats.intelligence, color: 'text-sl-purple', bgColor: 'bg-sl-purple' },
    { name: 'SENSE', value: currentStats.sense, color: 'text-sl-yellow', bgColor: 'bg-sl-yellow' },
    { name: 'LUCK', value: currentStats.luck, color: 'text-sl-orange', bgColor: 'bg-sl-orange' }
  ]

  return (
    <div className="card-glow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold glow-text">
          Hunter Status
        </h2>
        <div className="text-right">
          <div className="text-3xl font-bold text-sl-blue">
            Lv. {currentStats.level}
          </div>
          <div className="text-sm text-gray-400">
            {currentStats.activeTitle?.name || 'No Title'}
          </div>
        </div>
      </div>

      {/* Resource Bars */}
      <div className="space-y-4 mb-6">
        <HPBar 
          current={currentStats.currentHP} 
          max={currentStats.maxHP} 
          percentage={currentStats.hpProgress}
        />
        <MPBar 
          current={currentStats.currentMP} 
          max={currentStats.maxMP} 
          percentage={currentStats.mpProgress}
        />
        <XPBar 
          current={currentStats.currentXP} 
          nextLevel={currentStats.nextLevelXP} 
          percentage={currentStats.xpProgress}
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-sl-darker rounded-lg p-4 border border-sl-light-gray hover:border-sl-blue/50 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-400">
                {stat.name}
              </span>
              <span className={`text-lg font-bold ${stat.color}`}>
                {stat.value}
              </span>
            </div>
            <StatBar 
              value={stat.value} 
              max={100} 
              color={stat.bgColor}
              showValue={false}
            />
          </motion.div>
        ))}
      </div>

      {/* Title Bonuses */}
      {currentStats.activeTitle && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 p-4 bg-sl-yellow/10 border border-sl-yellow/30 rounded-lg"
        >
          <div className="flex items-center mb-2">
            <span className="text-sl-yellow font-semibold">
              {currentStats.activeTitle.name}
            </span>
            <span className="ml-2 text-xs text-gray-400">
              (Active Title)
            </span>
          </div>
          <div className="text-sm text-gray-300">
            Provides stat bonuses when equipped
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default StatusWindow
