const User = require('../models/User');
const CompletedQuest = require('../models/CompletedQuest');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).populate('activeTitle');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Calculate rank based on level
    const getRank = (level) => {
      if (level >= 100) return 'S-Rank Hunter';
      if (level >= 80) return 'A-Rank Hunter';
      if (level >= 60) return 'B-Rank Hunter';
      if (level >= 40) return 'C-Rank Hunter';
      if (level >= 20) return 'D-Rank Hunter';
      return 'E-Rank Hunter';
    };

    // Calculate success rate
    const totalQuests = user.totalQuestsCompleted;
    const successRate = totalQuests > 0 ? Math.round((totalQuests / (totalQuests + 0)) * 100) : 0; // Simplified for now

    res.status(200).json({
      success: true,
      data: {
        name: user.name,
        email: user.email,
        level: user.level,
        rank: getRank(user.level),
        activeTitle: user.activeTitle ? {
          name: user.activeTitle.name,
          rarity: user.activeTitle.rarity
        } : null,
        stats: {
          totalQuestsCompleted: user.totalQuestsCompleted,
          dailyQuestStreak: user.dailyQuestStreak,
          longestStreak: user.dailyQuestStreak, // Simplified - would need to track this separately
          totalXPEarned: user.totalXP,
          successRate,
          memberSince: user.createdAt
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get quest completion history
// @route   GET /api/users/history
// @access  Private
const getHistory = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { limit = 20, page = 1 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const completedQuests = await CompletedQuest.find({ userId })
      .populate('questId', 'category')
      .sort({ completedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalQuests = await CompletedQuest.countDocuments({ userId });
    const totalPages = Math.ceil(totalQuests / parseInt(limit));

    const history = completedQuests.map(quest => ({
      questTitle: quest.questTitle,
      category: quest.questId?.category || 'unknown',
      completedAt: quest.completedAt,
      statsGained: quest.statsGained,
      xpGained: quest.xpGained,
      leveledUp: quest.leveledUp,
      newLevel: quest.newLevel
    }));

    res.status(200).json({
      success: true,
      data: {
        completedQuests: history,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalQuests
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update allowed fields
    if (name) {
      user.name = name;
    }

    await user.save();

    res.status(200).json({
      success: true,
      data: {
        name: user.name,
        email: user.email,
        level: user.level,
        message: 'Profile updated successfully'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  getProfile,
  getHistory,
  updateProfile
};
