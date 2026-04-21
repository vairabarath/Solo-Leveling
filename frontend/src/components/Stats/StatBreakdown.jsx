import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { Target, TrendingUp } from 'lucide-react'

const StatBreakdown = ({ data }) => {
  if (!data) {
    return (
      <div className="card-glow">
        <div className="animate-pulse">
          <div className="h-4 bg-sl-light-gray rounded mb-4" />
          <div className="h-64 bg-sl-light-gray rounded" />
        </div>
      </div>
    )
  }

  const categoryColors = {
    fitness: '#ff0040',
    cardio: '#00d4ff',
    mental: '#8b5cf6',
    wellness: '#00ff40',
    nutrition: '#f97316'
  }

  const categoryNames = {
    fitness: 'Fitness',
    cardio: 'Cardio',
    mental: 'Mental',
    wellness: 'Wellness',
    nutrition: 'Nutrition'
  }

  // Prepare data for pie chart
  const pieData = Object.entries(data.byCategory || {}).map(([category, info]) => ({
    name: categoryNames[category] || category,
    value: info.percentage || 0,
    quests: info.questsCompleted || 0,
    color: categoryColors[category] || '#6b7280'
  }))

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-sl-darker border border-sl-light-gray rounded-lg p-3">
          <div className="text-white font-semibold">{data.name}</div>
          <div className="text-gray-300 text-sm">
            {data.quests} quests ({data.value}%)
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="card-glow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white flex items-center">
          <Target className="w-5 h-5 mr-2 text-sl-green" />
          Quest Breakdown
        </h3>
        <div className="text-sm text-gray-400">
          {data.totalQuests || 0} total quests
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Category Details */}
        <div className="space-y-4">
          {Object.entries(data.byCategory || {}).map(([category, info], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-sl-darker rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: categoryColors[category] }}
                  />
                  <span className="font-semibold text-white">
                    {categoryNames[category] || category}
                  </span>
                </div>
                <span className="text-sl-blue font-semibold">
                  {info.percentage || 0}%
                </span>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Quests Completed</span>
                  <span className="text-gray-300">{info.questsCompleted || 0}</span>
                </div>
                
                {info.statsGained && (
                  <div className="text-sm text-gray-400">
                    Stats Gained: {Object.entries(info.statsGained)
                      .filter(([_, value]) => value > 0)
                      .map(([stat, value]) => `+${value} ${stat.toUpperCase()}`)
                      .join(', ') || 'None'}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 bg-sl-light-gray rounded-lg"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-sl-blue">
              {data.totalQuests || 0}
            </div>
            <div className="text-sm text-gray-400">Total Quests</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-sl-green">
              {Object.values(data.byCategory || {}).reduce((sum, cat) => sum + (cat.questsCompleted || 0), 0)}
            </div>
            <div className="text-sm text-gray-400">Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-sl-yellow">
              {Object.keys(data.byCategory || {}).length}
            </div>
            <div className="text-sm text-gray-400">Categories</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-sl-purple">
              {Math.round(Object.values(data.byCategory || {}).reduce((sum, cat) => sum + (cat.percentage || 0), 0) / Object.keys(data.byCategory || {}).length) || 0}%
            </div>
            <div className="text-sm text-gray-400">Avg. Distribution</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default StatBreakdown
