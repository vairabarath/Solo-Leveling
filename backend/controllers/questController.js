const Quest = require("../models/Quest");
const CompletedQuest = require("../models/CompletedQuest");
const DailyQuestAssignment = require("../models/DailyQuestAssignment");
const {
  getTodaysDailyQuests,
  getAllAvailableQuests,
  needsNewDailyQuests,
  generateDailyQuests,
} = require("../services/questGenerationService");
const {
  checkLevelUp,
  applyStatRewards,
} = require("../services/levelUpService");

// @desc    Get user's daily quests
// @route   GET /api/quests/daily
// @access  Private
const getDailyQuests = async (req, res) => {
  try {
    const userId = req.user.userId;
    const User = require("../models/User");

    const user = await User.findById(userId);
    if (!user || !user.onboardingCompleted) {
      return res.status(400).json({
        success: false,
        message: "User must complete onboarding first",
      });
    }

    // Streak breaking + HP punishment for missed previous day
    const now = new Date();
    const todayStart = new Date(now); todayStart.setHours(0, 0, 0, 0);
    const yesterdayStart = new Date(todayStart); yesterdayStart.setDate(yesterdayStart.getDate() - 1);

    let userModified = false;
    let hpPunishment = null;

    if (user.lastQuestDate) {
      const lastDay = new Date(user.lastQuestDate); lastDay.setHours(0, 0, 0, 0);
      const dayDiff = Math.round((todayStart - lastDay) / 86400000);

      if (dayDiff > 1) {
        user.dailyQuestStreak = 0;
        userModified = true;
      }

      if (dayDiff === 1) {
        const yesterdayAssignment = await DailyQuestAssignment.findOne({
          userId,
          assignedDate: { $gte: yesterdayStart, $lt: todayStart },
        });
        if (yesterdayAssignment) {
          const incompleteCount = yesterdayAssignment.quests.filter((q) => !q.isCompleted).length;
          if (incompleteCount > 0) {
            user.dailyQuestStreak = 0;
            const hpPenalty = incompleteCount * 10;
            const hpLost = Math.min(hpPenalty, user.currentHP - 1);
            user.currentHP = Math.max(1, user.currentHP - hpPenalty);
            hpPunishment = { incompleteQuests: incompleteCount, hpLost };
            userModified = true;
          }
        }
      }
    }

    if (userModified) await user.save();

    // Check if user needs new daily quests
    const needsNew = await needsNewDailyQuests(userId);
    if (needsNew) {
      await generateDailyQuests(userId, user.questTiers);
    }

    // Get today's quests
    const assignment = await getTodaysDailyQuests(userId);
    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "No daily quests found",
      });
    }

    const quests = assignment.quests.map((q) => ({
      questId: q.questId._id,
      title: q.questId.title,
      category: q.questId.category,
      strReward: q.questId.strReward,
      agiReward: q.questId.agiReward,
      vitReward: q.questId.vitReward,
      intReward: q.questId.intReward,
      senseReward: q.questId.senseReward,
      luckReward: q.questId.luckReward,
      xpReward: q.questId.xpReward,
      estimatedTime: q.questId.estimatedTime,
      isCompleted: q.isCompleted,
      completedAt: q.completedAt,
    }));

    // Calculate time remaining
    const tomorrow = new Date(todayStart);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const timeRemaining = tomorrow - now;
    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60),
    );

    const freshUser = await User.findById(userId);

    res.status(200).json({
      success: true,
      data: {
        assignedDate: assignment.assignedDate,
        quests,
        completedCount: assignment.completedCount,
        totalQuests: 4,
        allCompleted: assignment.allCompleted,
        streak: freshUser.dailyQuestStreak,
        currentHP: freshUser.currentHP,
        maxHP: freshUser.maxHP,
        hpPunishment,
        timeRemaining: `${hours}h ${minutes}m`,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Get available quests
// @route   GET /api/quests/available
// @access  Private
const getAvailableQuests = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { category } = req.query;

    const quests = await getAllAvailableQuests(userId, category);
    const user = await require("../models/User").findById(userId);

    res.status(200).json({
      success: true,
      data: {
        quests: quests.map((quest) => ({
          _id: quest._id,
          title: quest.title,
          description: quest.description,
          category: quest.category,
          tier: quest.tier,
          strReward: quest.strReward,
          agiReward: quest.agiReward,
          vitReward: quest.vitReward,
          intReward: quest.intReward,
          senseReward: quest.senseReward,
          luckReward: quest.luckReward,
          xpReward: quest.xpReward,
          estimatedTime: quest.estimatedTime,
          requiredLevel: quest.requiredLevel,
        })),
        userTier: user.questTiers,
        totalCount: quests.length,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Get single quest details
// @route   GET /api/quests/:id
// @access  Private
const getQuestById = async (req, res) => {
  try {
    const { id } = req.params;
    const quest = await Quest.findById(id);

    if (!quest) {
      return res.status(404).json({
        success: false,
        message: "Quest not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        _id: quest._id,
        title: quest.title,
        description: quest.description,
        category: quest.category,
        tier: quest.tier,
        strReward: quest.strReward,
        agiReward: quest.agiReward,
        vitReward: quest.vitReward,
        intReward: quest.intReward,
        senseReward: quest.senseReward,
        luckReward: quest.luckReward,
        xpReward: quest.xpReward,
        estimatedTime: quest.estimatedTime,
        requiredLevel: quest.requiredLevel,
        difficulty:
          "★".repeat(
            ["beginner", "intermediate", "advanced", "elite"].indexOf(
              quest.tier,
            ) + 1,
          ) +
          "☆".repeat(
            4 -
              (["beginner", "intermediate", "advanced", "elite"].indexOf(
                quest.tier,
              ) +
                1),
          ),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Complete a quest
// @route   POST /api/quests/:id/complete
// @access  Private
const completeQuest = async (req, res) => {
  try {
    const { id } = req.params;
    const { confirmed } = req.body;
    const userId = req.user.userId;

    if (!confirmed) {
      return res.status(400).json({
        success: false,
        message: "Quest completion must be confirmed",
      });
    }

    // Get quest
    const quest = await Quest.findById(id);
    if (!quest) {
      return res.status(404).json({
        success: false,
        message: "Quest not found",
      });
    }

    // Check if already completed today (for daily quests)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const existingCompletion = await CompletedQuest.findOne({
      userId,
      questId: id,
      completedAt: { $gte: today, $lt: tomorrow },
    });

    if (existingCompletion) {
      return res.status(400).json({
        success: false,
        message: "Quest already completed today",
      });
    }

    // Apply stat rewards
    const statRewards = {
      str: quest.strReward,
      agi: quest.agiReward,
      vit: quest.vitReward,
      int: quest.intReward,
      sense: quest.senseReward,
      luck: quest.luckReward,
    };

    const updatedStats = await applyStatRewards(userId, statRewards);

    // Check for level up
    const levelUpResult = await checkLevelUp(userId, quest.xpReward);

    // Record quest completion
    const completedQuest = new CompletedQuest({
      userId,
      questId: id,
      questTitle: quest.title,
      statsGained: statRewards,
      xpGained: quest.xpReward,
      leveledUp: levelUpResult.leveledUp,
      newLevel: levelUpResult.newLevel,
    });

    await completedQuest.save();

    // Update user's quest completion count and activity date
    const user = await require("../models/User").findById(userId);
    user.totalQuestsCompleted += 1;
    user.lastQuestDate = new Date();
    await user.save();

    // Check if this was a daily quest and update progress
    const assignment = await DailyQuestAssignment.findOne({
      userId,
      assignedDate: { $gte: today, $lt: tomorrow },
    });

    let dailyQuestProgress = null;
    if (assignment) {
      const questInAssignment = assignment.quests.find(
        (q) => q.questId.toString() === id,
      );
      if (questInAssignment && !questInAssignment.isCompleted) {
        questInAssignment.isCompleted = true;
        questInAssignment.completedAt = new Date();
        await assignment.save();

        dailyQuestProgress = {
          completed: assignment.completedCount,
          total: 4,
        };

        // Increment streak when all daily quests are done
        if (assignment.allCompleted) {
          const streakUser = await require("../models/User").findById(userId);
          streakUser.dailyQuestStreak += 1;
          streakUser.lastQuestDate = new Date();
          await streakUser.save();
        }
      }
    }

    res.status(200).json({
      success: true,
      data: {
        quest: {
          title: quest.title,
          completedAt: completedQuest.completedAt,
        },
        rewards: {
          statsGained: statRewards,
          xpGained: quest.xpReward,
        },
        updatedUser: updatedStats,
        levelUp: levelUpResult.leveledUp,
        newLevel: levelUpResult.newLevel,
        levelUpBonuses: levelUpResult.levelUpBonuses,
        dailyQuestProgress,
        message: levelUpResult.leveledUp
          ? `LEVEL UP! You are now level ${levelUpResult.newLevel}!`
          : `Quest completed! +${quest.strReward} STR, +${quest.agiReward} AGI, +${quest.vitReward} VIT, +${quest.intReward} INT, +${quest.senseReward} SENSE, +${quest.luckReward} LUCK, +${quest.xpReward} XP`,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  getDailyQuests,
  getAvailableQuests,
  getQuestById,
  completeQuest,
};
