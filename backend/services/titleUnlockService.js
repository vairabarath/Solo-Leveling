const Title = require("../models/Title");
const User = require("../models/User");
const CompletedQuest = require("../models/CompletedQuest");

// Check if user has unlocked any new titles
const checkTitleUnlocks = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const unlockedTitles = [];

  // Get all titles user doesn't own yet
  const allTitles = await Title.find({ isActive: true });
  const ownedTitleIds = user.ownedTitles.map((id) => id.toString());
  const availableTitles = allTitles.filter(
    (title) => !ownedTitleIds.includes(title._id.toString()),
  );

  for (const title of availableTitles) {
    if (await checkTitleRequirement(user, title)) {
      // Unlock the title
      user.ownedTitles.push(title._id);
      unlockedTitles.push(title);
    }
  }

  if (unlockedTitles.length > 0) {
    await user.save();
  }

  return unlockedTitles;
};

// Check if a specific title requirement is met
const checkTitleRequirement = async (user, title) => {
  switch (title.requirementType) {
    case "questCount":
      return user.totalQuestsCompleted >= title.requirementValue;

    case "streak":
      return user.dailyQuestStreak >= title.requirementValue;

    case "level":
      return user.level >= title.requirementValue;

    case "category":
      const categoryQuests = await CompletedQuest.countDocuments({
        userId: user._id,
        questId: { $exists: true },
      }).populate("questId", "category");

      // This is a simplified check - in a real implementation,
      // you'd need to filter by category properly
      return categoryQuests >= title.requirementValue;

    case "stat":
      // Check if user has required stat values
      const statName = title.requirementCategory; // e.g., 'strength'
      return user[statName] >= title.requirementValue;

    default:
      return false;
  }
};

// Get user's titles (owned and locked)
const getUserTitles = async (userId) => {
  const user = await User.findById(userId).populate("ownedTitles activeTitle");
  if (!user) throw new Error("User not found");

  const allTitles = await Title.find({ isActive: true });
  const ownedTitleIds = user.ownedTitles.map((id) => id.toString());

  const owned = allTitles.filter((title) =>
    ownedTitleIds.includes(title._id.toString()),
  );
  const locked = allTitles.filter(
    (title) => !ownedTitleIds.includes(title._id.toString()),
  );

  // Add progress info for locked titles
  const lockedWithProgress = await Promise.all(
    locked.map(async (title) => {
      const progress = await getTitleProgress(user, title);
      return {
        ...title.toObject(),
        progress,
      };
    }),
  );

  return {
    owned: owned.map((title) => ({
      ...title.toObject(),
      isEquipped:
        user.activeTitle &&
        user.activeTitle._id.toString() === title._id.toString(),
    })),
    locked: lockedWithProgress,
  };
};

// Get progress toward a locked title
const getTitleProgress = async (user, title) => {
  switch (title.requirementType) {
    case "questCount":
      return {
        current: user.totalQuestsCompleted,
        required: title.requirementValue,
        percentage: Math.round(
          (user.totalQuestsCompleted / title.requirementValue) * 100,
        ),
      };

    case "streak":
      return {
        current: user.dailyQuestStreak,
        required: title.requirementValue,
        percentage: Math.round(
          (user.dailyQuestStreak / title.requirementValue) * 100,
        ),
      };

    case "level":
      return {
        current: user.level,
        required: title.requirementValue,
        percentage: Math.round((user.level / title.requirementValue) * 100),
      };

    case "category":
      const categoryQuests = await CompletedQuest.countDocuments({
        userId: user._id,
      });
      return {
        current: categoryQuests,
        required: title.requirementValue,
        percentage: Math.round((categoryQuests / title.requirementValue) * 100),
      };

    case "stat":
      const statValue = user[title.requirementCategory] || 0;
      return {
        current: statValue,
        required: title.requirementValue,
        percentage: Math.round((statValue / title.requirementValue) * 100),
      };

    default:
      return {
        current: 0,
        required: title.requirementValue,
        percentage: 0,
      };
  }
};

// Equip a title
const equipTitles = async (userId, titleId) => {
  const user = await User.findById(userId).populate("ownedTitles");
  if (!user) throw new Error("User not found");

  // Check if user owns the title
  const ownedTitleIds = user.ownedTitles.map((id) => id.toString());
  if (!ownedTitleIds.includes(titleId)) {
    throw new Error("Title not unlocked");
  }

  // Get the title details
  const title = await Title.findById(titleId);
  if (!title) throw new Error("Title not found");

  // Equip the title
  user.activeTitle = titleId;
  await user.save();

  return title;
};

module.exports = {
  checkTitleUnlocks,
  getUserTitles,
  equipTitles,
};
