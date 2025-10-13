import { motion } from 'framer-motion'

const StatBar = ({ value, max = 100, color = 'bg-sl-blue', showValue = true }) => {
  const percentage = Math.min((value / max) * 100, 100)

  return (
    <div className="space-y-1">
      {showValue && (
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">Progress</span>
          <span className="text-xs text-gray-400">
            {value} / {max}
          </span>
        </div>
      )}
      <div className="stat-bar">
        <motion.div
          className={`stat-fill ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

export default StatBar
