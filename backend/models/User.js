const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  
  // Core Stats
  level: {
    type: Number,
    default: 1
  },
  currentXP: {
    type: Number,
    default: 0
  },
  totalXP: {
    type: Number,
    default: 0
  },
  
  // Resource Bars
  currentHP: {
    type: Number,
    default: 100
  },
  maxHP: {
    type: Number,
    default: 100
  },
  currentMP: {
    type: Number,
    default: 50
  },
  maxMP: {
    type: Number,
    default: 50
  },
  
  // Six Stat System
  strength: {
    type: Number,
    default: 10
  },
  agility: {
    type: Number,
    default: 10
  },
  vitality: {
    type: Number,
    default: 10
  },
  intelligence: {
    type: Number,
    default: 10
  },
  sense: {
    type: Number,
    default: 10
  },
  luck: {
    type: Number,
    default: 5
  },
  
  // Assessment Data (from onboarding)
  assessmentData: {
    pushUpCapacity: {
      type: String,
      enum: ['0-10', '11-30', '31-50', '51+']
    },
    squatCapacity: {
      type: String,
      enum: ['0-15', '16-40', '41-70', '71+']
    },
    runningCapacity: {
      type: String,
      enum: ['<1km', '1-3km', '3-5km', '5km+']
    },
    plankCapacity: {
      type: String,
      enum: ['<30s', '31-60s', '61-90s', '90s+']
    },
    focusCapacity: {
      type: String,
      enum: ['15-30min', '30-60min', '1-2hr', '2hr+']
    },
    learningLevel: {
      type: String,
      enum: ['beginner', 'occasional', 'regular', 'advanced']
    },
    codingLevel: {
      type: String,
      enum: ['none', 'basic', 'intermediate', 'advanced']
    },
    dailyTimeAvailable: {
      type: String,
      enum: ['15-30min', '30-60min', '1-2hr', '2hr+']
    },
    activityLevel: {
      type: String,
      enum: ['sedentary', 'light', 'moderate', 'active']
    },
    meditationLevel: {
      type: String,
      enum: ['never', 'tried', 'regular', 'advanced']
    }
  },
  
  // Quest Tier Assignments
  questTiers: {
    strengthTier: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'elite'],
      default: 'beginner'
    },
    enduranceTier: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'elite'],
      default: 'beginner'
    },
    focusTier: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'elite'],
      default: 'beginner'
    },
    mindfulnessTier: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'elite'],
      default: 'beginner'
    }
  },
  
  // Tier Progression Tracking
  questsCompletedAtTier: {
    strength: {
      type: Number,
      default: 0
    },
    endurance: {
      type: Number,
      default: 0
    },
    focus: {
      type: Number,
      default: 0
    },
    mindfulness: {
      type: Number,
      default: 0
    }
  },
  
  // Streak & Activity
  dailyQuestStreak: {
    type: Number,
    default: 0
  },
  lastQuestDate: {
    type: Date
  },
  totalQuestsCompleted: {
    type: Number,
    default: 0
  },
  
  // Titles & Achievements
  activeTitle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Title',
    default: null
  },
  ownedTitles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Title'
  }],
  
  // Metadata
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLoginAt: {
    type: Date
  },
  onboardingCompleted: {
    type: Boolean,
    default: false
  }
});

// Indexes
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ level: -1 });
userSchema.index({ dailyQuestStreak: -1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Calculate HP based on vitality
userSchema.methods.calculateMaxHP = function() {
  return Math.floor(100 + (this.vitality * 10));
};

// Calculate MP based on intelligence
userSchema.methods.calculateMaxMP = function() {
  return Math.floor(50 + (this.intelligence * 5));
};

// Update resource bars when stats change
userSchema.pre('save', function(next) {
  if (this.isModified('vitality')) {
    this.maxHP = this.calculateMaxHP();
    if (this.currentHP > this.maxHP) {
      this.currentHP = this.maxHP;
    }
  }
  
  if (this.isModified('intelligence')) {
    this.maxMP = this.calculateMaxMP();
    if (this.currentMP > this.maxMP) {
      this.currentMP = this.maxMP;
    }
  }
  
  next();
});

module.exports = mongoose.model('User', userSchema);
