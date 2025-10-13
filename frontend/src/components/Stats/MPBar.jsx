import { motion } from 'framer-motion'

const MPBar = ({ current, max, percentage }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-sl-cyan">MP</span>
        <span className="text-sm text-gray-400">
          {current} / {max}
        </span>
      </div>
      <div className="stat-bar">
        <motion.div
          className="stat-fill bg-gradient-to-r from-sl-cyan to-cyan-500"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            boxShadow: '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff'
          }}
        />
      </div>
    </div>
  )
}

export default MPBar
