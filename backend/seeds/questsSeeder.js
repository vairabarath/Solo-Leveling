const Quest = require('../models/Quest');

const quests = [
  // FITNESS QUESTS
  // Beginner
  {
    title: "10 Push-ups",
    description: "Complete 10 push-ups with proper form",
    category: "fitness",
    difficulty: "beginner",
    tier: "beginner",
    strReward: 2,
    vitReward: 1,
    xpReward: 15,
    estimatedTime: "2-3 minutes"
  },
  {
    title: "15 Squats",
    description: "Complete 15 bodyweight squats",
    category: "fitness",
    difficulty: "beginner",
    tier: "beginner",
    strReward: 1,
    vitReward: 2,
    xpReward: 15,
    estimatedTime: "2-3 minutes"
  },
  {
    title: "30 Second Plank",
    description: "Hold a plank position for 30 seconds",
    category: "fitness",
    difficulty: "beginner",
    tier: "beginner",
    strReward: 1,
    vitReward: 1,
    xpReward: 10,
    estimatedTime: "1 minute"
  },
  // Intermediate
  {
    title: "25 Push-ups",
    description: "Complete 25 push-ups with proper form",
    category: "fitness",
    difficulty: "intermediate",
    tier: "intermediate",
    strReward: 3,
    vitReward: 2,
    xpReward: 25,
    estimatedTime: "5-8 minutes"
  },
  {
    title: "40 Squats",
    description: "Complete 40 bodyweight squats",
    category: "fitness",
    difficulty: "intermediate",
    tier: "intermediate",
    strReward: 2,
    vitReward: 3,
    xpReward: 25,
    estimatedTime: "5-8 minutes"
  },
  {
    title: "60 Second Plank",
    description: "Hold a plank position for 60 seconds",
    category: "fitness",
    difficulty: "intermediate",
    tier: "intermediate",
    strReward: 2,
    vitReward: 2,
    xpReward: 20,
    estimatedTime: "2 minutes"
  },
  // Advanced
  {
    title: "50 Push-ups",
    description: "Complete 50 push-ups with proper form",
    category: "fitness",
    difficulty: "advanced",
    tier: "advanced",
    strReward: 4,
    vitReward: 3,
    xpReward: 40,
    estimatedTime: "10-15 minutes"
  },
  {
    title: "100 Squats",
    description: "Complete 100 bodyweight squats",
    category: "fitness",
    difficulty: "advanced",
    tier: "advanced",
    strReward: 3,
    vitReward: 4,
    xpReward: 40,
    estimatedTime: "10-15 minutes"
  },
  // Elite
  {
    title: "100 Push-ups",
    description: "Complete 100 push-ups with proper form",
    category: "fitness",
    difficulty: "elite",
    tier: "elite",
    strReward: 6,
    vitReward: 4,
    xpReward: 60,
    estimatedTime: "20-30 minutes"
  },

  // CARDIO QUESTS
  // Beginner
  {
    title: "5 Minute Walk",
    description: "Take a 5-minute brisk walk",
    category: "cardio",
    difficulty: "beginner",
    tier: "beginner",
    agiReward: 1,
    vitReward: 1,
    xpReward: 10,
    estimatedTime: "5 minutes"
  },
  {
    title: "10 Minute Jog",
    description: "Jog for 10 minutes at a comfortable pace",
    category: "cardio",
    difficulty: "beginner",
    tier: "beginner",
    agiReward: 2,
    vitReward: 2,
    xpReward: 20,
    estimatedTime: "10 minutes"
  },
  // Intermediate
  {
    title: "20 Minute Run",
    description: "Run for 20 minutes at a moderate pace",
    category: "cardio",
    difficulty: "intermediate",
    tier: "intermediate",
    agiReward: 3,
    vitReward: 3,
    xpReward: 30,
    estimatedTime: "20 minutes"
  },
  {
    title: "5km Run",
    description: "Complete a 5km run",
    category: "cardio",
    difficulty: "intermediate",
    tier: "intermediate",
    agiReward: 4,
    vitReward: 4,
    xpReward: 35,
    estimatedTime: "25-35 minutes"
  },
  // Advanced
  {
    title: "10km Run",
    description: "Complete a 10km run",
    category: "cardio",
    difficulty: "advanced",
    tier: "advanced",
    agiReward: 5,
    vitReward: 5,
    xpReward: 50,
    estimatedTime: "45-60 minutes"
  },
  // Elite
  {
    title: "Half Marathon",
    description: "Complete a half marathon (21.1km)",
    category: "cardio",
    difficulty: "elite",
    tier: "elite",
    agiReward: 8,
    vitReward: 8,
    xpReward: 100,
    estimatedTime: "90-120 minutes"
  },

  // MENTAL QUESTS
  // Beginner
  {
    title: "15 Minute Focus Session",
    description: "Focus on a single task for 15 minutes without distraction",
    category: "mental",
    difficulty: "beginner",
    tier: "beginner",
    intReward: 2,
    senseReward: 1,
    xpReward: 15,
    estimatedTime: "15 minutes"
  },
  {
    title: "Read 10 Pages",
    description: "Read 10 pages of a book or article",
    category: "mental",
    difficulty: "beginner",
    tier: "beginner",
    intReward: 1,
    senseReward: 1,
    xpReward: 10,
    estimatedTime: "15-20 minutes"
  },
  // Intermediate
  {
    title: "30 Minute Deep Work",
    description: "Focus on a complex task for 30 minutes without interruption",
    category: "mental",
    difficulty: "intermediate",
    tier: "intermediate",
    intReward: 3,
    senseReward: 2,
    xpReward: 25,
    estimatedTime: "30 minutes"
  },
  {
    title: "Learn Something New",
    description: "Spend 30 minutes learning a new skill or concept",
    category: "mental",
    difficulty: "intermediate",
    tier: "intermediate",
    intReward: 4,
    senseReward: 2,
    xpReward: 30,
    estimatedTime: "30 minutes"
  },
  // Advanced
  {
    title: "1 Hour Deep Study Session",
    description: "Spend 1 hour in deep focus studying a subject that challenges your intellect",
    category: "mental",
    difficulty: "advanced",
    tier: "advanced",
    intReward: 5,
    senseReward: 3,
    xpReward: 40,
    estimatedTime: "60 minutes"
  },
  // Elite
  {
    title: "3 Hour Deep Work Marathon",
    description: "Focus on a complex project for 3 hours with minimal breaks",
    category: "mental",
    difficulty: "elite",
    tier: "elite",
    intReward: 8,
    senseReward: 5,
    xpReward: 75,
    estimatedTime: "180 minutes"
  },

  // WELLNESS QUESTS
  // Beginner
  {
    title: "5 Minute Meditation",
    description: "Meditate for 5 minutes",
    category: "wellness",
    difficulty: "beginner",
    tier: "beginner",
    senseReward: 2,
    vitReward: 1,
    xpReward: 10,
    estimatedTime: "5 minutes"
  },
  {
    title: "10 Minute Stretch",
    description: "Do 10 minutes of stretching",
    category: "wellness",
    difficulty: "beginner",
    tier: "beginner",
    vitReward: 2,
    agiReward: 1,
    xpReward: 10,
    estimatedTime: "10 minutes"
  },
  // Intermediate
  {
    title: "20 Minute Yoga",
    description: "Complete a 20-minute yoga session",
    category: "wellness",
    difficulty: "intermediate",
    tier: "intermediate",
    senseReward: 3,
    vitReward: 2,
    agiReward: 1,
    xpReward: 25,
    estimatedTime: "20 minutes"
  },
  {
    title: "30 Minute Nature Walk",
    description: "Take a 30-minute walk in nature",
    category: "wellness",
    difficulty: "intermediate",
    tier: "intermediate",
    senseReward: 2,
    vitReward: 2,
    agiReward: 1,
    xpReward: 20,
    estimatedTime: "30 minutes"
  },
  // Advanced
  {
    title: "1 Hour Meditation",
    description: "Meditate for 1 hour",
    category: "wellness",
    difficulty: "advanced",
    tier: "advanced",
    senseReward: 5,
    vitReward: 3,
    xpReward: 40,
    estimatedTime: "60 minutes"
  },
  // Elite
  {
    title: "2 Hour Wellness Retreat",
    description: "Spend 2 hours on comprehensive wellness activities",
    category: "wellness",
    difficulty: "elite",
    tier: "elite",
    senseReward: 6,
    vitReward: 4,
    agiReward: 2,
    xpReward: 60,
    estimatedTime: "120 minutes"
  },

  // NUTRITION QUESTS
  // Beginner
  {
    title: "Track Daily Water Intake",
    description: "Log and hit your daily water intake goal of at least 2 liters",
    category: "nutrition",
    difficulty: "beginner",
    tier: "beginner",
    vitReward: 2,
    senseReward: 1,
    xpReward: 15,
    estimatedTime: "Throughout the day"
  },
  // Intermediate
  {
    title: "Meal Prep for the Week",
    description: "Prepare and portion healthy meals for the next 3-5 days",
    category: "nutrition",
    difficulty: "intermediate",
    tier: "intermediate",
    vitReward: 3,
    intReward: 2,
    xpReward: 30,
    estimatedTime: "90-120 minutes"
  },
  // Advanced
  {
    title: "Calculate and Hit Your Macros",
    description: "Track and hit your protein, carb, and fat targets for an entire day",
    category: "nutrition",
    difficulty: "advanced",
    tier: "advanced",
    vitReward: 4,
    intReward: 3,
    senseReward: 2,
    xpReward: 45,
    estimatedTime: "Throughout the day"
  },
  // Elite
  {
    title: "Master Nutrition Periodization",
    description: "Design and follow a nutrition periodization plan aligned with your training phases",
    category: "nutrition",
    difficulty: "elite",
    tier: "elite",
    vitReward: 5,
    intReward: 5,
    senseReward: 3,
    luckReward: 1,
    xpReward: 70,
    estimatedTime: "Ongoing protocol"
  }
];

const seedQuests = async () => {
  try {
    // Clear existing quests
    await Quest.deleteMany({});
    console.log('Cleared existing quests');

    // Insert new quests
    const createdQuests = await Quest.insertMany(quests);
    console.log(`Created ${createdQuests.length} quests`);

    return createdQuests;
  } catch (error) {
    console.error('Error seeding quests:', error);
    throw error;
  }
};

module.exports = { seedQuests };
