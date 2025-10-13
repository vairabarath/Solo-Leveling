import { motion } from 'framer-motion'

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = ((currentStep + 1) / totalSteps) * 100

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium text-gray-300">
          Step {currentStep + 1} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-sl-blue">
          {Math.round(progress)}% Complete
        </span>
      </div>
      
      <div className="w-full bg-sl-darker rounded-full h-3 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-sl-blue to-sl-cyan rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      
      <div className="flex justify-between mt-2">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index <= currentStep
                ? 'bg-sl-blue shadow-lg shadow-sl-blue/50'
                : 'bg-sl-light-gray'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default ProgressBar
