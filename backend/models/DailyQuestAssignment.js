const mongoose = require('mongoose');

const dailyQuestAssignmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  assignedDate: {
    type: Date,
    required: [true, 'Assigned date is required'],
    default: Date.now
  },
  
  // 4 Daily Quests
  quests: [{
    questId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quest',
      required: true
    },
    isCompleted: {
      type: Boolean,
      default: false
    },
    completedAt: {
      type: Date
    }
  }],
  
  // Progress
  completedCount: {
    type: Number,
    default: 0,
    min: 0,
    max: 4
  },
  allCompleted: {
    type: Boolean,
    default: false
  },
  bonusAwarded: {
    type: Boolean,
    default: false
  }
});

// Indexes
dailyQuestAssignmentSchema.index({ userId: 1, assignedDate: -1 });
dailyQuestAssignmentSchema.index({ userId: 1 });

// Validate that we have exactly 4 quests
dailyQuestAssignmentSchema.pre('save', function(next) {
  if (this.quests.length !== 4) {
    return next(new Error('Daily quest assignment must have exactly 4 quests'));
  }
  next();
});

// Update completedCount when quests are marked as completed
dailyQuestAssignmentSchema.pre('save', function(next) {
  this.completedCount = this.quests.filter(quest => quest.isCompleted).length;
  this.allCompleted = this.completedCount === 4;
  next();
});

module.exports = mongoose.model('DailyQuestAssignment', dailyQuestAssignmentSchema);
