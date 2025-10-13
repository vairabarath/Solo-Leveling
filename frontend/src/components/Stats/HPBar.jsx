import { motion } from 'framer-motion'

const HPBar = ({ current, max, percentage }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-sl-red">HP</span>
        <span className="text-sm text-gray-400">
          {current} / {max}
        </span>
      </div>
      <div className="stat-bar">
        <motion.div
          className="stat-fill bg-gradient-to-r from-sl-red to-red-500"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            boxShadow: '0 0 10px #ff0040, 0 0 20px #ff0040, 0 0 30px #ff0040'
          }}
        />
      </div>
    </div>
  )
}

export default HPBar
