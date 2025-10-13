import { motion } from 'framer-motion'

const XPBar = ({ current, nextLevel, percentage }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-sl-yellow">XP</span>
        <span className="text-sm text-gray-400">
          {current} / {nextLevel}
        </span>
      </div>
      <div className="stat-bar">
        <motion.div
          className="stat-fill bg-gradient-to-r from-sl-yellow to-yellow-500"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            boxShadow: '0 0 10px #ffd700, 0 0 20px #ffd700, 0 0 30px #ffd700'
          }}
        />
      </div>
    </div>
  )
}

export default XPBar
