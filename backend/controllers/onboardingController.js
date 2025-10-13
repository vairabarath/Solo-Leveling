const User = require('../models/User');
const { calculateInitialStats, calculateQuestTiers } = require('../services/statCalculationService');
const { generateDailyQuests } = require('../services/questGenerationService');

// @desc    Complete onboarding and calculate initial stats
// @route   POST /api/onboarding/complete
// @access  Private
const completeOnboarding = async (req, res) => {
  try {
    const { assessmentData } = req.body;
    const userId = req.user.userId;

    // Get user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (user.onboardingCompleted) {
      return res.status(400).json({
        success: false,
        message: 'Onboarding already completed'
      });
    }

    // Calculate initial stats
    const initialStats = calculateInitialStats(assessmentData);
    const questTiers = calculateQuestTiers(assessmentData);

    // Update user with assessment data and calculated stats
    user.assessmentData = assessmentData;
    user.strength = initialStats.strength;
    user.agility = initialStats.agility;
    user.vitality = initialStats.vitality;
    user.intelligence = initialStats.intelligence;
    user.sense = initialStats.sense;
    user.luck = initialStats.luck;
    user.questTiers = questTiers;
    user.onboardingCompleted = true;

    // Update HP/MP based on new stats
    user.maxHP = user.calculateMaxHP();
    user.currentHP = user.maxHP;
    user.maxMP = user.calculateMaxMP();
    user.currentMP = user.maxMP;

    await user.save();

    // Generate initial daily quests
    let dailyQuests = null;
    try {
      const assignment = await generateDailyQuests(userId, questTiers);
      dailyQuests = assignment.quests.map(q => ({
        _id: q.questId._id,
        title: q.questId.title,
        category: q.questId.category,
        strReward: q.questId.strReward,
        agiReward: q.questId.agiReward,
        vitReward: q.questId.vitReward,
        intReward: q.questId.intReward,
        senseReward: q.questId.senseReward,
        luckReward: q.questId.luckReward,
        xpReward: q.questId.xpReward,
        estimatedTime: q.questId.estimatedTime
      }));
    } catch (error) {
      console.error('Failed to generate daily quests:', error);
      // Continue without quests - they can be generated later
    }

    res.status(200).json({
      success: true,
      data: {
        user: {
          _id: user._id,
          onboardingCompleted: user.onboardingCompleted,
          strength: user.strength,
          agility: user.agility,
          vitality: user.vitality,
          intelligence: user.intelligence,
          sense: user.sense,
          luck: user.luck,
          questTiers: user.questTiers
        },
        dailyQuests: dailyQuests || []
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during onboarding completion',
      error: error.message
    });
  }
};

module.exports = {
  completeOnboarding
};
