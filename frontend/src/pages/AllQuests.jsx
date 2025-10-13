import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useQuests } from '../context/QuestContext'
import QuestCard from '../components/Quest/QuestCard'
import { Target, Filter, Search, Clock } from 'lucide-react'

const AllQuests = () => {
  const { availableQuests, getAvailableQuests, loading } = useQuests()
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'fitness', label: 'Fitness' },
    { value: 'cardio', label: 'Cardio' },
    { value: 'mental', label: 'Mental' },
    { value: 'wellness', label: 'Wellness' },
    { value: 'career', label: 'Career' }
  ]

  useEffect(() => {
    getAvailableQuests(selectedCategory)
  }, [selectedCategory])

  const filteredQuests = availableQuests.filter(quest => {
    const matchesSearch = quest.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || quest.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-sl-dark py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2 glow-text">
            Quest Library
          </h1>
          <p className="text-gray-300 text-lg">
            Browse and complete quests to level up your stats
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="card-glow mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search quests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="md:w-64">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input-field pl-10"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quest Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="card-glow animate-pulse">
                <div className="h-4 bg-sl-light-gray rounded mb-4" />
                <div className="h-4 bg-sl-light-gray rounded mb-4" />
                <div className="h-4 bg-sl-light-gray rounded mb-4" />
                <div className="h-8 bg-sl-light-gray rounded" />
              </div>
            ))}
          </div>
        ) : filteredQuests.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No quests found
            </h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('')
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuests.map((quest, index) => (
              <motion.div
                key={quest._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <QuestCard
                  quest={quest}
                  isDaily={false}
                  showRewards={true}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Results Info */}
        {!loading && filteredQuests.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-400">
              Showing {filteredQuests.length} quest{filteredQuests.length !== 1 ? 's' : ''}
              {selectedCategory && ` in ${categories.find(c => c.value === selectedCategory)?.label}`}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default AllQuests
