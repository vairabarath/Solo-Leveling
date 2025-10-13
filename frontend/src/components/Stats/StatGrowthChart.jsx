import { useState } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { TrendingUp, Calendar } from 'lucide-react'

const StatGrowthChart = ({ data, period, onPeriodChange }) => {
  const [selectedStats, setSelectedStats] = useState(['strength', 'agility', 'vitality'])

  const statColors = {
    strength: '#ff0040',
    agility: '#00d4ff',
    vitality: '#00ff40',
    intelligence: '#8b5cf6',
    sense: '#ffd700',
    luck: '#ff6b35'
  }

  const statNames = {
    strength: 'STR',
    agility: 'AGI',
    vitality: 'VIT',
    intelligence: 'INT',
    sense: 'SENSE',
    luck: 'LUCK'
  }

  const toggleStat = (stat) => {
    setSelectedStats(prev => 
      prev.includes(stat) 
        ? prev.filter(s => s !== stat)
        : [...prev, stat]
    )
  }

  return (
    <div className="card-glow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-sl-blue" />
          Stats Growth
        </h3>
        
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <select
            value={period}
            onChange={(e) => onPeriodChange(e.target.value)}
            className="bg-sl-darker border border-sl-light-gray rounded px-3 py-1 text-white text-sm"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
          </select>
        </div>
      </div>

      {/* Stat Toggle Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.entries(statNames).map(([stat, name]) => (
          <button
            key={stat}
            onClick={() => toggleStat(stat)}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              selectedStats.includes(stat)
                ? 'bg-sl-blue text-white'
                : 'bg-sl-light-gray text-gray-300 hover:bg-sl-blue/50'
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data || []}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
            <XAxis 
              dataKey="date" 
              stroke="#9ca3af"
              fontSize={12}
            />
            <YAxis 
              stroke="#9ca3af"
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1a1a',
                border: '1px solid #2a2a2a',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Legend />
            {selectedStats.map((stat) => (
              <Line
                key={stat}
                type="monotone"
                dataKey={stat}
                stroke={statColors[stat]}
                strokeWidth={2}
                dot={{ fill: statColors[stat], strokeWidth: 2, r: 4 }}
                name={statNames[stat]}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary */}
      {data && data.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-6 p-4 bg-sl-darker rounded-lg"
        >
          <h4 className="text-sm font-semibold text-white mb-3">Growth Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {selectedStats.map((stat) => {
              const firstValue = data[0]?.[stat] || 0
              const lastValue = data[data.length - 1]?.[stat] || 0
              const growth = lastValue - firstValue
              
              return (
                <div key={stat} className="text-center">
                  <div className="text-xs text-gray-400 mb-1">
                    {statNames[stat]}
                  </div>
                  <div className={`text-sm font-semibold ${
                    growth > 0 ? 'text-sl-green' : growth < 0 ? 'text-sl-red' : 'text-gray-400'
                  }`}>
                    {growth > 0 ? '+' : ''}{growth}
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default StatGrowthChart
