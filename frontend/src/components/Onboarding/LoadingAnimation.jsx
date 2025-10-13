import { motion } from 'framer-motion'

const LoadingAnimation = () => {
  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="w-32 h-32 bg-gradient-to-r from-sl-blue to-sl-cyan rounded-full mx-auto mb-6 flex items-center justify-center relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl">⚡</span>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4 glow-text">
          Activating Hunter System
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Calculating your stats and assigning quest tiers...
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-sl-blue rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-sl-cyan rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 bg-sl-purple rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>
        
        <div className="text-sm text-gray-400">
          <span className="loading-dots">Processing assessment data</span>
        </div>
      </motion.div>
    </div>
  )
}

export default LoadingAnimation
