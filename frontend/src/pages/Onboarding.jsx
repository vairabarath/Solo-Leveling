import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { onboardingService } from '../services/onboardingService'
import { useAuth } from '../context/AuthContext'
import { useStats } from '../context/StatsContext'
import ProgressBar from '../components/Onboarding/ProgressBar'
import LoadingAnimation from '../components/Onboarding/LoadingAnimation'
import toast from 'react-hot-toast'

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [assessmentData, setAssessmentData] = useState({})
  const [loading, setLoading] = useState(false)
  const [systemActivating, setSystemActivating] = useState(false)
  
  const { user, updateUser } = useAuth()
  const { getCurrentStats } = useStats()
  const navigate = useNavigate()

  const steps = [
    {
      id: 'welcome',
      title: 'Welcome to the Hunter System',
      component: 'Welcome'
    },
    {
      id: 'physical',
      title: 'Physical Assessment',
      component: 'PhysicalAssessment'
    },
    {
      id: 'mental',
      title: 'Mental Assessment',
      component: 'MentalAssessment'
    },
    {
      id: 'lifestyle',
      title: 'Lifestyle Assessment',
      component: 'LifestyleAssessment'
    },
    {
      id: 'activation',
      title: 'System Activation',
      component: 'SystemActivation'
    }
  ]

  const handleAssessmentChange = (category, data) => {
    setAssessmentData(prev => ({
      ...prev,
      [category]: data
    }))
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const completeOnboarding = async () => {
    setLoading(true)
    setSystemActivating(true)

    try {
      // Validate that all assessment data is present
      if (!assessmentData.physical || !assessmentData.mental || !assessmentData.lifestyle) {
        throw new Error('Please complete all assessment steps before activating the system.')
      }

      // Flatten the assessment data structure
      const flattenedAssessmentData = {
        ...assessmentData.physical,
        ...assessmentData.mental,
        ...assessmentData.lifestyle
      }

      // Validate that all required fields are present
      const requiredFields = [
        'pushUpCapacity', 'squatCapacity', 'runningCapacity', 'plankCapacity',
        'focusCapacity', 'learningLevel', 'codingLevel',
        'dailyTimeAvailable', 'activityLevel', 'meditationLevel'
      ]

      const missingFields = requiredFields.filter(field => !flattenedAssessmentData[field])
      if (missingFields.length > 0) {
        throw new Error(`Please complete all assessment questions. Missing: ${missingFields.join(', ')}`)
      }
      
      console.log('Sending assessment data:', flattenedAssessmentData) // Debug log
      
      const response = await onboardingService.completeOnboarding(flattenedAssessmentData)
      
      // Update user data
      updateUser(response.data.user)
      
      // Get updated stats
      await getCurrentStats()
      
      toast.success('Hunter System activated! Your stats have been calculated.')
      
      // Navigate to dashboard after a delay
      setTimeout(() => {
        navigate('/dashboard')
      }, 2000)
      
    } catch (error) {
      console.error('Onboarding error:', error)
      let errorMessage = 'Failed to activate Hunter System. Please try again.'
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error.response?.data?.errors) {
        // Handle validation errors
        const validationErrors = error.response.data.errors.map(err => err.msg).join(', ')
        errorMessage = `Validation error: ${validationErrors}`
      } else if (error.message) {
        errorMessage = error.message
      }
      
      toast.error(errorMessage)
      setSystemActivating(false)
    } finally {
      setLoading(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStep onNext={nextStep} />
      case 1:
        return (
          <PhysicalAssessmentStep
            data={assessmentData.physical}
            onChange={(data) => handleAssessmentChange('physical', data)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      case 2:
        return (
          <MentalAssessmentStep
            data={assessmentData.mental}
            onChange={(data) => handleAssessmentChange('mental', data)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      case 3:
        return (
          <LifestyleAssessmentStep
            data={assessmentData.lifestyle}
            onChange={(data) => handleAssessmentChange('lifestyle', data)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      case 4:
        return (
          <SystemActivationStep
            assessmentData={assessmentData}
            onComplete={completeOnboarding}
            loading={loading}
            systemActivating={systemActivating}
          />
        )
      default:
        return null
    }
  }

  // Redirect if already completed onboarding
  useEffect(() => {
    if (user?.onboardingCompleted) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  return (
    <div className="min-h-screen bg-sl-dark">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-sl-blue/10 via-transparent to-sl-purple/10" />
      <div className="absolute inset-0 bg-pattern opacity-5" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-sl-blue rounded-full animate-float" />
      <div className="absolute top-40 right-20 w-6 h-6 bg-sl-cyan rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 left-20 w-3 h-3 bg-sl-purple rounded-full animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Progress Bar */}
        <div className="pt-8 px-6">
          <ProgressBar currentStep={currentStep} totalSteps={steps.length} />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

// Welcome Step Component
const WelcomeStep = ({ onNext }) => (
  <div className="text-center">
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="mb-8"
    >
      <div className="w-24 h-24 bg-gradient-to-r from-sl-blue to-sl-cyan rounded-full mx-auto mb-6 flex items-center justify-center">
        <span className="text-4xl">⚔️</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-4 glow-text">
        The System Has Chosen You
      </h1>
      <p className="text-xl text-gray-300 mb-8">
        Welcome to the Hunter System. We need to assess your current capabilities to calculate your initial stats and assign appropriate quest tiers.
      </p>
    </motion.div>

    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      onClick={onNext}
      className="btn-primary text-lg px-8 py-4"
    >
      Begin Assessment
    </motion.button>
  </div>
)

// Physical Assessment Step Component
const PhysicalAssessmentStep = ({ data, onChange, onNext, onPrev }) => {
  const [formData, setFormData] = useState(data || {})

  const handleChange = (field, value) => {
    const newData = { ...formData, [field]: value }
    setFormData(newData)
    onChange(newData)
  }

  const handleNext = () => {
    if (Object.keys(formData).length >= 4) {
      onNext()
    }
  }

  const questions = [
    {
      field: 'pushUpCapacity',
      question: 'How many push-ups can you do in one set?',
      options: [
        { value: '0-10', label: '0-10 push-ups' },
        { value: '11-30', label: '11-30 push-ups' },
        { value: '31-50', label: '31-50 push-ups' },
        { value: '51+', label: '51+ push-ups' }
      ]
    },
    {
      field: 'squatCapacity',
      question: 'How many squats can you do in one set?',
      options: [
        { value: '0-15', label: '0-15 squats' },
        { value: '16-40', label: '16-40 squats' },
        { value: '41-70', label: '41-70 squats' },
        { value: '71+', label: '71+ squats' }
      ]
    },
    {
      field: 'runningCapacity',
      question: 'How far can you run without stopping?',
      options: [
        { value: '<1km', label: 'Less than 1km' },
        { value: '1-3km', label: '1-3km' },
        { value: '3-5km', label: '3-5km' },
        { value: '5km+', label: '5km or more' }
      ]
    },
    {
      field: 'plankCapacity',
      question: 'How long can you hold a plank?',
      options: [
        { value: '<30s', label: 'Less than 30 seconds' },
        { value: '31-60s', label: '31-60 seconds' },
        { value: '61-90s', label: '61-90 seconds' },
        { value: '90s+', label: '90+ seconds' }
      ]
    }
  ]

  return (
    <div className="card-glow">
      <h2 className="text-2xl font-bold mb-6 text-center glow-text">
        Physical Assessment
      </h2>
      <p className="text-gray-300 mb-6 text-center">
        Let's assess your current physical capabilities to determine your strength and endurance stats.
      </p>

      <div className="space-y-6">
        {questions.map((q, index) => (
          <div key={q.field}>
            <h3 className="text-lg font-semibold mb-3 text-white">
              {q.question}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {q.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleChange(q.field, option.value)}
                  className={`p-3 rounded-lg border transition-all duration-300 ${
                    formData[q.field] === option.value
                      ? 'border-sl-blue bg-sl-blue/20 text-sl-blue'
                      : 'border-sl-light-gray hover:border-sl-blue/50 text-gray-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={onPrev} className="btn-secondary">
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={Object.keys(formData).length < 4}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  )
}

// Mental Assessment Step Component
const MentalAssessmentStep = ({ data, onChange, onNext, onPrev }) => {
  const [formData, setFormData] = useState(data || {})

  const handleChange = (field, value) => {
    const newData = { ...formData, [field]: value }
    setFormData(newData)
    onChange(newData)
  }

  const handleNext = () => {
    if (Object.keys(formData).length >= 3) {
      onNext()
    }
  }

  const questions = [
    {
      field: 'focusCapacity',
      question: 'How long can you focus on a single task without distraction?',
      options: [
        { value: '15-30min', label: '15-30 minutes' },
        { value: '30-60min', label: '30-60 minutes' },
        { value: '1-2hr', label: '1-2 hours' },
        { value: '2hr+', label: '2+ hours' }
      ]
    },
    {
      field: 'learningLevel',
      question: 'How would you describe your learning habits?',
      options: [
        { value: 'beginner', label: 'Beginner - just starting to learn' },
        { value: 'occasional', label: 'Occasional - learn when needed' },
        { value: 'regular', label: 'Regular - consistent learning' },
        { value: 'advanced', label: 'Advanced - continuous learning' }
      ]
    },
    {
      field: 'codingLevel',
      question: 'What is your programming experience?',
      options: [
        { value: 'none', label: 'No programming experience' },
        { value: 'basic', label: 'Basic - simple scripts' },
        { value: 'intermediate', label: 'Intermediate - can build applications' },
        { value: 'advanced', label: 'Advanced - complex systems' }
      ]
    }
  ]

  return (
    <div className="card-glow">
      <h2 className="text-2xl font-bold mb-6 text-center glow-text">
        Mental Assessment
      </h2>
      <p className="text-gray-300 mb-6 text-center">
        Now let's assess your mental capabilities to determine your intelligence and sense stats.
      </p>

      <div className="space-y-6">
        {questions.map((q, index) => (
          <div key={q.field}>
            <h3 className="text-lg font-semibold mb-3 text-white">
              {q.question}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {q.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleChange(q.field, option.value)}
                  className={`p-3 rounded-lg border transition-all duration-300 ${
                    formData[q.field] === option.value
                      ? 'border-sl-blue bg-sl-blue/20 text-sl-blue'
                      : 'border-sl-light-gray hover:border-sl-blue/50 text-gray-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={onPrev} className="btn-secondary">
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={Object.keys(formData).length < 3}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  )
}

// Lifestyle Assessment Step Component
const LifestyleAssessmentStep = ({ data, onChange, onNext, onPrev }) => {
  const [formData, setFormData] = useState(data || {})

  const handleChange = (field, value) => {
    const newData = { ...formData, [field]: value }
    setFormData(newData)
    onChange(newData)
  }

  const handleNext = () => {
    if (Object.keys(formData).length >= 3) {
      onNext()
    }
  }

  const questions = [
    {
      field: 'dailyTimeAvailable',
      question: 'How much time can you dedicate daily to quests?',
      options: [
        { value: '15-30min', label: '15-30 minutes' },
        { value: '30-60min', label: '30-60 minutes' },
        { value: '1-2hr', label: '1-2 hours' },
        { value: '2hr+', label: '2+ hours' }
      ]
    },
    {
      field: 'activityLevel',
      question: 'What is your current activity level?',
      options: [
        { value: 'sedentary', label: 'Sedentary - mostly sitting' },
        { value: 'light', label: 'Light - some walking' },
        { value: 'moderate', label: 'Moderate - regular exercise' },
        { value: 'active', label: 'Active - intense exercise' }
      ]
    },
    {
      field: 'meditationLevel',
      question: 'What is your meditation/mindfulness experience?',
      options: [
        { value: 'never', label: 'Never tried' },
        { value: 'tried', label: 'Tried a few times' },
        { value: 'regular', label: 'Regular practice' },
        { value: 'advanced', label: 'Advanced practitioner' }
      ]
    }
  ]

  return (
    <div className="card-glow">
      <h2 className="text-2xl font-bold mb-6 text-center glow-text">
        Lifestyle Assessment
      </h2>
      <p className="text-gray-300 mb-6 text-center">
        Finally, let's understand your lifestyle to optimize your quest assignments.
      </p>

      <div className="space-y-6">
        {questions.map((q, index) => (
          <div key={q.field}>
            <h3 className="text-lg font-semibold mb-3 text-white">
              {q.question}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {q.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleChange(q.field, option.value)}
                  className={`p-3 rounded-lg border transition-all duration-300 ${
                    formData[q.field] === option.value
                      ? 'border-sl-blue bg-sl-blue/20 text-sl-blue'
                      : 'border-sl-light-gray hover:border-sl-blue/50 text-gray-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={onPrev} className="btn-secondary">
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={Object.keys(formData).length < 3}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Activate System
        </button>
      </div>
    </div>
  )
}

// System Activation Step Component
const SystemActivationStep = ({ assessmentData, onComplete, loading, systemActivating }) => {
  const [showStats, setShowStats] = useState(false)

  useEffect(() => {
    if (systemActivating) {
      const timer = setTimeout(() => {
        setShowStats(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [systemActivating])

  if (systemActivating && !showStats) {
    return <LoadingAnimation />
  }

  if (systemActivating && showStats) {
    return (
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-sl-green to-sl-blue rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="text-4xl">⚡</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 glow-text">
            System Activated!
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Your Hunter System is now active. Your stats have been calculated based on your assessment.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card-glow mb-8"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            Your Initial Stats
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: 'STR', value: 15, color: 'text-sl-red' },
              { name: 'AGI', value: 15, color: 'text-sl-blue' },
              { name: 'VIT', value: 15, color: 'text-sl-green' },
              { name: 'INT', value: 18, color: 'text-sl-purple' },
              { name: 'SENSE', value: 12, color: 'text-sl-yellow' },
              { name: 'LUCK', value: 5, color: 'text-sl-orange' }
            ].map((stat, index) => (
              <div key={stat.name} className="text-center">
                <div className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.name}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <p className="text-gray-300 mb-4">
            Redirecting to your dashboard...
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sl-blue mx-auto" />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-8"
      >
        <div className="w-24 h-24 bg-gradient-to-r from-sl-blue to-sl-cyan rounded-full mx-auto mb-6 flex items-center justify-center">
          <span className="text-4xl">⚔️</span>
        </div>
        <h1 className="text-4xl font-bold mb-4 glow-text">
          Ready to Activate System
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Based on your assessment, we'll calculate your initial stats and assign appropriate quest tiers.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card-glow mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">Assessment Summary</h2>
        <div className="space-y-2 text-left">
          <div className="flex justify-between">
            <span className="text-gray-300">Physical Assessment:</span>
            <span className="text-sl-green">✓ Complete</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Mental Assessment:</span>
            <span className="text-sl-green">✓ Complete</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Lifestyle Assessment:</span>
            <span className="text-sl-green">✓ Complete</span>
          </div>
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        onClick={onComplete}
        disabled={loading}
        className="btn-primary text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
            Activating System...
          </span>
        ) : (
          'Activate Hunter System'
        )}
      </motion.button>
    </div>
  )
}

export default Onboarding
