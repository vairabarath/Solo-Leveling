const mongoose = require('mongoose');

const completedQuestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  questId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quest',
    required: [true, 'Quest ID is required']
  },
  questTitle: {
    type: String,
    required: [true, 'Quest title is required']
  },
  
  // Completion Details
  completedAt: {
    type: Date,
    required: [true, 'Completion date is required'],
    default: Date.now
  },
  wasDaily: {
    type: Boolean,
    default: false
  },
  
  // Rewards Granted
  statsGained: {
    str: {
      type: Number,
      default: 0
    },
    agi: {
      type: Number,
      default: 0
    },
    vit: {
      type: Number,
      default: 0
    },
    int: {
      type: Number,
      default: 0
    },
    sense: {
      type: Number,
      default: 0
    },
    luck: {
      type: Number,
      default: 0
    }
  },
  xpGained: {
    type: Number,
    required: [true, 'XP gained is required']
  },
  leveledUp: {
    type: Boolean,
    default: false
  },
  newLevel: {
    type: Number
  }
});

// Indexes
completedQuestSchema.index({ userId: 1, completedAt: -1 });
completedQuestSchema.index({ userId: 1, wasDaily: 1 });
completedQuestSchema.index({ completedAt: -1 });

module.exports = mongoose.model('CompletedQuest', completedQuestSchema);
