const User = require('../models/User');
const CompletedQuest = require('../models/CompletedQuest');
const { getXPRequiredForLevel } = require('../services/levelUpService');

// @desc    Get current user stats
// @route   GET /api/stats/current
// @access  Private
const getCurrentStats = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).populate('activeTitle');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const nextLevelXP = getXPRequiredForLevel(user.level + 1);
    const xpProgress = (user.currentXP / nextLevelXP) * 100;

    res.status(200).json({
      success: true,
      data: {
        level: user.level,
        currentXP: user.currentXP,
        nextLevelXP,
        xpProgress: Math.round(xpProgress * 100) / 100,
        currentHP: user.currentHP,
        maxHP: user.maxHP,
        hpProgress: Math.round((user.currentHP / user.maxHP) * 100),
        currentMP: user.currentMP,
        maxMP: user.maxMP,
        mpProgress: Math.round((user.currentMP / user.maxMP) * 100),
        strength: user.strength,
        agility: user.agility,
        vitality: user.vitality,
        intelligence: user.intelligence,
        sense: user.sense,
        luck: user.luck,
        activeTitle: user.activeTitle ? {
          name: user.activeTitle.name,
          bonuses: {
            str: user.activeTitle.strBonus,
            agi: user.activeTitle.agiBonus,
            vit: user.activeTitle.vitBonus,
            int: user.activeTitle.intBonus,
            sense: user.activeTitle.senseBonus,
            luck: user.activeTitle.luckBonus
          }
        } : null
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

// @desc    Get stat growth history
// @route   GET /api/stats/history
// @access  Private
const getStatsHistory = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { days = 7 } = req.query;

    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - parseInt(days));

    // Get completed quests in the time period
    const completedQuests = await CompletedQuest.find({
      userId,
      completedAt: { $gte: daysAgo }
    }).sort({ completedAt: 1 });

    // Group by date and calculate daily stats
    const historyMap = new Map();
    
    // Initialize with current stats
    const user = await User.findById(userId);
    const currentStats = {
      strength: user.strength,
      agility: user.agility,
      vitality: user.vitality,
      intelligence: user.intelligence,
      sense: user.sense,
      luck: user.luck
    };

    // Work backwards from current stats
    for (let i = completedQuests.length - 1; i >= 0; i--) {
      const quest = completedQuests[i];
      const date = quest.completedAt.toISOString().split('T')[0];
      
      if (!historyMap.has(date)) {
        historyMap.set(date, { ...currentStats });
      }
      
      // Subtract the gains to get stats at the beginning of that day
      const dayStats = historyMap.get(date);
      dayStats.strength -= quest.statsGained.str;
      dayStats.agility -= quest.statsGained.agi;
      dayStats.vitality -= quest.statsGained.vit;
      dayStats.intelligence -= quest.statsGained.int;
      dayStats.sense -= quest.statsGained.sense;
      dayStats.luck -= quest.statsGained.luck;
    }

    // Convert to array and sort by date
    const history = Array.from(historyMap.entries())
      .map(([date, stats]) => ({ date, ...stats }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    // Calculate total gains
    const totalGains = {
      str: completedQuests.reduce((sum, quest) => sum + quest.statsGained.str, 0),
      agi: completedQuests.reduce((sum, quest) => sum + quest.statsGained.agi, 0),
      vit: completedQuests.reduce((sum, quest) => sum + quest.statsGained.vit, 0),
      int: completedQuests.reduce((sum, quest) => sum + quest.statsGained.int, 0),
      sense: completedQuests.reduce((sum, quest) => sum + quest.statsGained.sense, 0),
      luck: completedQuests.reduce((sum, quest) => sum + quest.statsGained.luck, 0)
    };

    res.status(200).json({
      success: true,
      data: {
        period: `${days}days`,
        history,
        totalGains
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

// @desc    Get stat breakdown by category
// @route   GET /api/stats/breakdown
// @access  Private
const getStatsBreakdown = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get all completed quests with their categories
    const completedQuests = await CompletedQuest.find({ userId })
      .populate('questId', 'category');

    // Group by category
    const categoryStats = {};
    let totalQuests = 0;

    completedQuests.forEach(quest => {
      const category = quest.questId?.category || 'unknown';
      
      if (!categoryStats[category]) {
        categoryStats[category] = {
          questsCompleted: 0,
          statsGained: {
            str: 0,
            agi: 0,
            vit: 0,
            int: 0,
            sense: 0,
            luck: 0
          }
        };
      }

      categoryStats[category].questsCompleted++;
      categoryStats[category].statsGained.str += quest.statsGained.str;
      categoryStats[category].statsGained.agi += quest.statsGained.agi;
      categoryStats[category].statsGained.vit += quest.statsGained.vit;
      categoryStats[category].statsGained.int += quest.statsGained.int;
      categoryStats[category].statsGained.sense += quest.statsGained.sense;
      categoryStats[category].statsGained.luck += quest.statsGained.luck;
      totalQuests++;
    });

    // Calculate percentages
    Object.keys(categoryStats).forEach(category => {
      categoryStats[category].percentage = Math.round(
        (categoryStats[category].questsCompleted / totalQuests) * 100
      );
    });

    res.status(200).json({
      success: true,
      data: {
        byCategory: categoryStats,
        totalQuests
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
  getCurrentStats,
  getStatsHistory,
  getStatsBreakdown
};
