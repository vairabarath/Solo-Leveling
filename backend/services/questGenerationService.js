const Quest = require("../models/Quest");
const DailyQuestAssignment = require("../models/DailyQuestAssignment");

// Generate daily quests for a user based on their tiers
const generateDailyQuests = async (userId, questTiers) => {
  try {
    // Get one quest from each category based on user's tier
    const strengthQuest = await getQuestByCategoryAndTier(
      "fitness",
      questTiers.strengthTier,
    );
    const enduranceQuest = await getQuestByCategoryAndTier(
      "cardio",
      questTiers.enduranceTier,
    );
    const focusQuest = await getQuestByCategoryAndTier(
      "mental",
      questTiers.focusTier,
    );
    const mindfulnessQuest = await getQuestByCategoryAndTier(
      "wellness",
      questTiers.mindfulnessTier,
    );

    const quests = [
      strengthQuest,
      enduranceQuest,
      focusQuest,
      mindfulnessQuest,
    ].filter(Boolean);

    if (quests.length !== 4) {
      throw new Error("Could not generate 4 daily quests");
    }

    // Create daily quest assignment
    const assignment = new DailyQuestAssignment({
      userId,
      assignedDate: new Date(),
      quests: quests.map((quest) => ({
        questId: quest._id,
        isCompleted: false,
      })),
    });

    await assignment.save();
    return assignment;
  } catch (error) {
    throw new Error(`Failed to generate daily quests: ${error.message}`);
  }
};

// Get a random quest by category and tier
const getQuestByCategoryAndTier = async (category, tier) => {
  const quests = await Quest.find({
    category,
    tier,
    isActive: true,
  });

  if (quests.length === 0) {
    // Fallback to any quest in category if no tier-specific quests
    const fallbackQuests = await Quest.find({
      category,
      isActive: true,
    });

    if (fallbackQuests.length === 0) {
      throw new Error(`No quests found for category: ${category}`);
    }

    return fallbackQuests[Math.floor(Math.random() * fallbackQuests.length)];
  }

  return quests[Math.floor(Math.random() * quests.length)];
};

// Get today's daily quests for a user
const getTodaysDailyQuests = async (userId) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const assignment = await DailyQuestAssignment.findOne({
    userId,
    assignedDate: {
      $gte: today,
      $lt: tomorrow,
    },
  }).populate("quests.questId");

  return assignment;
};

// Get available quests for browsing
const getAllAvailableQuests = async (userId, category = null) => {
  const user = await require("../models/User").findById(userId);
  if (!user) throw new Error("User not found");

  const query = {
    isActive: true,
    questType: "available",
  };

  if (category) {
    query.category = category;
  }

  const quests = await Quest.find(query).sort({ tier: 1, category: 1 });
  return quests;
};

// Check if user needs new daily quests
const needsNewDailyQuests = async (userId) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const existingAssignment = await DailyQuestAssignment.findOne({
    userId,
    assignedDate: {
      $gte: today,
      $lt: tomorrow,
    },
  });

  return !existingAssignment;
};

module.exports = {
  generateDailyQuests,
  getTodaysDailyQuests,
  getAllAvailableQuests,
  needsNewDailyQuests,
};
