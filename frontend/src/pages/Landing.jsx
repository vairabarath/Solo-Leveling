import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sword, Shield, Zap, Target, Users, Star } from 'lucide-react'

const Landing = () => {
  const features = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Daily Quests",
      description: "Complete personalized daily quests to level up your stats"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Stat Progression",
      description: "6 core stats that grow automatically as you complete quests"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Achievement Titles",
      description: "Unlock powerful titles that provide stat bonuses"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Level System",
      description: "Experience the thrill of leveling up with automatic stat bonuses"
    },
    {
      icon: <Sword className="w-8 h-8" />,
      title: "Hunter Ranks",
      description: "Progress from E-Rank to S-Rank Hunter through dedication"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Personalized System",
      description: "Assessment-based stat calculation for your unique journey"
    }
  ]

  return (
    <div className="min-h-screen bg-sl-dark">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-sl-blue/20 via-transparent to-sl-purple/20" />
        <div className="absolute inset-0 bg-pattern opacity-10" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-sl-blue rounded-full animate-float" />
        <div className="absolute top-40 right-20 w-6 h-6 bg-sl-cyan rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-sl-purple rounded-full animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl md:text-8xl font-black mb-6 glow-text text-shadow-xl">
              SOLO LEVELING
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              The Hunter System has chosen you. Complete quests, level up your stats, and become the ultimate hunter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="btn-primary text-lg px-8 py-4 animate-glow"
              >
                Start Your Journey
              </Link>
              <Link
                to="/login"
                className="btn-secondary text-lg px-8 py-4"
              >
                Continue Adventure
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
              Hunter System Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the complete Solo Leveling system with personalized quests, stat progression, and achievement titles.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-glow group"
              >
                <div className="text-sl-blue mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-sl-blue/10 to-sl-purple/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
              Ready to Begin Your Hunt?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join the Hunter System and start your journey to becoming the ultimate hunter.
            </p>
            <Link
              to="/register"
              className="btn-primary text-xl px-12 py-5 animate-pulse-glow"
            >
              Enter the System
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-sl-light-gray">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 Solo Leveling Hunter System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Landing
