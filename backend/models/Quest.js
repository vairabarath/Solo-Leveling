const mongoose = require('mongoose');

const questSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Quest title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Quest category is required'],
    enum: ['fitness', 'cardio', 'mental', 'wellness', 'career']
  },
  difficulty: {
    type: String,
    required: [true, 'Quest difficulty is required'],
    enum: ['beginner', 'intermediate', 'advanced', 'elite']
  },
  tier: {
    type: String,
    required: [true, 'Quest tier is required'],
    enum: ['beginner', 'intermediate', 'advanced', 'elite']
  },
  
  // Stat Rewards (automatic allocation)
  strReward: {
    type: Number,
    default: 0
  },
  agiReward: {
    type: Number,
    default: 0
  },
  vitReward: {
    type: Number,
    default: 0
  },
  intReward: {
    type: Number,
    default: 0
  },
  senseReward: {
    type: Number,
    default: 0
  },
  luckReward: {
    type: Number,
    default: 0
  },
  xpReward: {
    type: Number,
    required: [true, 'XP reward is required']
  },
  
  // Quest Requirements
  requiredLevel: {
    type: Number,
    default: 1
  },
  requiredStats: {
    minStrength: {
      type: Number,
      default: 0
    },
    minAgility: {
      type: Number,
      default: 0
    },
    minIntelligence: {
      type: Number,
      default: 0
    }
  },
  
  // Quest Properties
  questType: {
    type: String,
    enum: ['daily', 'available', 'special'],
    default: 'available'
  },
  isRepeatable: {
    type: Boolean,
    default: true
  },
  estimatedTime: {
    type: String,
    default: '15-30 minutes'
  },
  
  // Metadata
  createdAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

// Indexes
questSchema.index({ category: 1, tier: 1 });
questSchema.index({ questType: 1 });
questSchema.index({ isActive: 1 });

module.exports = mongoose.model('Quest', questSchema);
