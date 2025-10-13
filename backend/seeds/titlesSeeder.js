const Title = require('../models/Title');

const titles = [
  // Common Titles
  {
    name: "Novice Hunter",
    description: "Complete your first quest",
    rarity: "common",
    requirementType: "questCount",
    requirementValue: 1,
    strBonus: 1,
    agiBonus: 1,
    vitBonus: 1,
    intBonus: 1,
    senseBonus: 1,
    luckBonus: 1,
    borderColor: "#6B7280"
  },
  {
    name: "Quest Seeker",
    description: "Complete 10 quests",
    rarity: "common",
    requirementType: "questCount",
    requirementValue: 10,
    strBonus: 2,
    agiBonus: 2,
    vitBonus: 2,
    intBonus: 2,
    senseBonus: 2,
    luckBonus: 1,
    borderColor: "#6B7280"
  },
  {
    name: "Dedicated Hunter",
    description: "Complete 25 quests",
    rarity: "common",
    requirementType: "questCount",
    requirementValue: 25,
    strBonus: 3,
    agiBonus: 3,
    vitBonus: 3,
    intBonus: 3,
    senseBonus: 3,
    luckBonus: 2,
    borderColor: "#6B7280"
  },
  {
    name: "Streak Master",
    description: "Maintain a 7-day quest streak",
    rarity: "common",
    requirementType: "streak",
    requirementValue: 7,
    strBonus: 2,
    agiBonus: 2,
    vitBonus: 2,
    intBonus: 2,
    senseBonus: 2,
    luckBonus: 3,
    borderColor: "#6B7280"
  },

  // Rare Titles
  {
    name: "Wolf Slayer",
    description: "Complete 50 strength-based quests",
    rarity: "rare",
    requirementType: "category",
    requirementValue: 50,
    requirementCategory: "fitness",
    strBonus: 5,
    agiBonus: 3,
    vitBonus: 2,
    borderColor: "#3B82F6"
  },
  {
    name: "Wind Runner",
    description: "Complete 50 cardio quests",
    rarity: "rare",
    requirementType: "category",
    requirementValue: 50,
    requirementCategory: "cardio",
    agiBonus: 5,
    vitBonus: 3,
    strBonus: 2,
    borderColor: "#3B82F6"
  },
  {
    name: "Mind Sage",
    description: "Complete 50 mental quests",
    rarity: "rare",
    requirementType: "category",
    requirementValue: 50,
    requirementCategory: "mental",
    intBonus: 5,
    senseBonus: 3,
    agiBonus: 2,
    borderColor: "#3B82F6"
  },
  {
    name: "Spirit Walker",
    description: "Complete 50 wellness quests",
    rarity: "rare",
    requirementType: "category",
    requirementValue: 50,
    requirementCategory: "wellness",
    senseBonus: 5,
    vitBonus: 3,
    intBonus: 2,
    borderColor: "#3B82F6"
  },
  {
    name: "Iron Will",
    description: "Maintain a 30-day quest streak",
    rarity: "rare",
    requirementType: "streak",
    requirementValue: 30,
    strBonus: 4,
    agiBonus: 4,
    vitBonus: 4,
    intBonus: 4,
    senseBonus: 4,
    luckBonus: 5,
    borderColor: "#3B82F6"
  },
  {
    name: "Rising Star",
    description: "Reach level 25",
    rarity: "rare",
    requirementType: "level",
    requirementValue: 25,
    strBonus: 3,
    agiBonus: 3,
    vitBonus: 3,
    intBonus: 3,
    senseBonus: 3,
    luckBonus: 4,
    borderColor: "#3B82F6"
  },

  // Epic Titles
  {
    name: "Demon Hunter",
    description: "Reach level 50",
    rarity: "epic",
    requirementType: "level",
    requirementValue: 50,
    strBonus: 10,
    agiBonus: 10,
    vitBonus: 10,
    intBonus: 10,
    senseBonus: 10,
    luckBonus: 8,
    borderColor: "#8B5CF6"
  },
  {
    name: "Quest Legend",
    description: "Complete 200 quests",
    rarity: "epic",
    requirementType: "questCount",
    requirementValue: 200,
    strBonus: 8,
    agiBonus: 8,
    vitBonus: 8,
    intBonus: 8,
    senseBonus: 8,
    luckBonus: 10,
    borderColor: "#8B5CF6"
  },
  {
    name: "Unbreakable",
    description: "Maintain a 100-day quest streak",
    rarity: "epic",
    requirementType: "streak",
    requirementValue: 100,
    strBonus: 12,
    agiBonus: 12,
    vitBonus: 12,
    intBonus: 12,
    senseBonus: 12,
    luckBonus: 15,
    borderColor: "#8B5CF6"
  },
  {
    name: "Master of All",
    description: "Complete 100 quests in each category",
    rarity: "epic",
    requirementType: "questCount",
    requirementValue: 500,
    strBonus: 15,
    agiBonus: 15,
    vitBonus: 15,
    intBonus: 15,
    senseBonus: 15,
    luckBonus: 12,
    borderColor: "#8B5CF6"
  },

  // Legendary Titles
  {
    name: "Shadow Monarch",
    description: "Reach level 100",
    rarity: "legendary",
    requirementType: "level",
    requirementValue: 100,
    strBonus: 25,
    agiBonus: 25,
    vitBonus: 25,
    intBonus: 25,
    senseBonus: 25,
    luckBonus: 20,
    borderColor: "#F59E0B"
  },
  {
    name: "Eternal Hunter",
    description: "Complete 1000 quests",
    rarity: "legendary",
    requirementType: "questCount",
    requirementValue: 1000,
    strBonus: 30,
    agiBonus: 30,
    vitBonus: 30,
    intBonus: 30,
    senseBonus: 30,
    luckBonus: 25,
    borderColor: "#F59E0B"
  },
  {
    name: "Immortal",
    description: "Maintain a 365-day quest streak",
    rarity: "legendary",
    requirementType: "streak",
    requirementValue: 365,
    strBonus: 40,
    agiBonus: 40,
    vitBonus: 40,
    intBonus: 40,
    senseBonus: 40,
    luckBonus: 35,
    borderColor: "#F59E0B"
  }
];

const seedTitles = async () => {
  try {
    // Clear existing titles
    await Title.deleteMany({});
    console.log('Cleared existing titles');

    // Insert new titles
    const createdTitles = await Title.insertMany(titles);
    console.log(`Created ${createdTitles.length} titles`);

    return createdTitles;
  } catch (error) {
    console.error('Error seeding titles:', error);
    throw error;
  }
};

module.exports = { seedTitles };
