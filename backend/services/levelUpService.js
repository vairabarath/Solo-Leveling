const User = require('../models/User');

// Calculate XP required for next level
const getXPRequiredForLevel = (level) => {
  return Math.floor(100 * Math.pow(1.2, level - 1));
};

// Check if user should level up and apply bonuses
const checkLevelUp = async (userId, xpGained) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  let leveledUp = false;
  let newLevel = user.level;
  let levelUpBonuses = null;

  // Add XP
  user.currentXP += xpGained;
  user.totalXP += xpGained;

  // Check for level ups
  while (user.currentXP >= getXPRequiredForLevel(user.level + 1)) {
    user.level += 1;
    leveledUp = true;
    newLevel = user.level;

    // Apply level up bonuses (+1 to all stats)
    user.strength += 1;
    user.agility += 1;
    user.vitality += 1;
    user.intelligence += 1;
    user.sense += 1;
    user.luck += 1;

    // Update HP/MP based on new stats
    user.maxHP = user.calculateMaxHP();
    user.currentHP = user.maxHP; // Full heal on level up
    user.maxMP = user.calculateMaxMP();
    user.currentMP = user.maxMP; // Full MP on level up

    levelUpBonuses = {
      allStats: 1
    };
  }

  await user.save();

  return {
    leveledUp,
    newLevel,
    levelUpBonuses,
    currentXP: user.currentXP,
    nextLevelXP: getXPRequiredForLevel(user.level + 1),
    xpProgress: (user.currentXP / getXPRequiredForLevel(user.level + 1)) * 100
  };
};

// Apply stat rewards from quest completion
const applyStatRewards = async (userId, statRewards) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  // Apply stat increases
  user.strength += statRewards.str || 0;
  user.agility += statRewards.agi || 0;
  user.vitality += statRewards.vit || 0;
  user.intelligence += statRewards.int || 0;
  user.sense += statRewards.sense || 0;
  user.luck += statRewards.luck || 0;

  // Update HP/MP based on new vitality/intelligence
  const newMaxHP = user.calculateMaxHP();
  const newMaxMP = user.calculateMaxMP();

  // If max HP increased, add the difference to current HP
  if (newMaxHP > user.maxHP) {
    user.currentHP += (newMaxHP - user.maxHP);
  }
  user.maxHP = newMaxHP;

  // If max MP increased, add the difference to current MP
  if (newMaxMP > user.maxMP) {
    user.currentMP += (newMaxMP - user.maxMP);
  }
  user.maxMP = newMaxMP;

  await user.save();

  return {
    strength: user.strength,
    agility: user.agility,
    vitality: user.vitality,
    intelligence: user.intelligence,
    sense: user.sense,
    luck: user.luck,
    currentHP: user.currentHP,
    maxHP: user.maxHP,
    currentMP: user.currentMP,
    maxMP: user.maxMP
  };
};

module.exports = {
  getXPRequiredForLevel,
  checkLevelUp,
  applyStatRewards
};
