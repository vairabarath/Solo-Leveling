const mongoose = require('mongoose');

const titleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Title name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Title description is required'],
    trim: true
  },
  rarity: {
    type: String,
    required: [true, 'Title rarity is required'],
    enum: ['common', 'rare', 'epic', 'legendary']
  },
  
  // Unlock Requirements
  requirementType: {
    type: String,
    required: [true, 'Requirement type is required'],
    enum: ['questCount', 'streak', 'stat', 'level', 'category']
  },
  requirementValue: {
    type: Number,
    required: [true, 'Requirement value is required']
  },
  requirementCategory: {
    type: String,
    enum: ['fitness', 'cardio', 'mental', 'wellness', 'nutrition', 'all'],
    default: null
  },
  
  // Stat Bonuses (applied when equipped)
  strBonus: {
    type: Number,
    default: 0
  },
  agiBonus: {
    type: Number,
    default: 0
  },
  vitBonus: {
    type: Number,
    default: 0
  },
  intBonus: {
    type: Number,
    default: 0
  },
  senseBonus: {
    type: Number,
    default: 0
  },
  luckBonus: {
    type: Number,
    default: 0
  },
  
  // Display
  iconUrl: {
    type: String
  },
  borderColor: {
    type: String,
    default: '#6B7280' // Default gray for common
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
titleSchema.index({ rarity: 1 });
titleSchema.index({ requirementType: 1 });

module.exports = mongoose.model('Title', titleSchema);
