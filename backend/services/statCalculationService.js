// Calculate initial stats based on assessment data
const calculateInitialStats = (assessmentData) => {
  let strength = 10;
  let agility = 10;
  let vitality = 10;
  let intelligence = 10;
  let sense = 10;
  let luck = 5;

  // Physical capacity bonuses
  const pushUpBonus = getPushUpBonus(assessmentData.pushUpCapacity);
  const squatBonus = getSquatBonus(assessmentData.squatCapacity);
  const runningBonus = getRunningBonus(assessmentData.runningCapacity);
  const plankBonus = getPlankBonus(assessmentData.plankCapacity);

  strength += pushUpBonus + squatBonus;
  agility += runningBonus + plankBonus;
  vitality += pushUpBonus + runningBonus + plankBonus;

  // Mental capacity bonuses
  const focusBonus = getFocusBonus(assessmentData.focusCapacity);
  const learningBonus = getLearningBonus(assessmentData.learningLevel);
  const studyHabitsBonus = getStudyHabitsBonus(assessmentData.studyHabits);

  intelligence += focusBonus + learningBonus + studyHabitsBonus;
  sense += focusBonus + learningBonus;

  // Lifestyle bonuses
  const timeBonus = getTimeBonus(assessmentData.dailyTimeAvailable);
  const activityBonus = getActivityBonus(assessmentData.activityLevel);
  const meditationBonus = getMeditationBonus(assessmentData.meditationLevel);

  // Apply lifestyle bonuses to all stats
  strength += timeBonus + activityBonus;
  agility += timeBonus + activityBonus;
  vitality += timeBonus + activityBonus;
  intelligence += timeBonus + meditationBonus;
  sense += meditationBonus;
  luck += Math.floor((timeBonus + activityBonus + meditationBonus) / 2);

  return {
    strength: Math.max(10, strength),
    agility: Math.max(10, agility),
    vitality: Math.max(10, vitality),
    intelligence: Math.max(10, intelligence),
    sense: Math.max(10, sense),
    luck: Math.max(5, luck)
  };
};

// Helper functions for stat bonuses
const getPushUpBonus = (capacity) => {
  const bonuses = { '0-10': 0, '11-30': 2, '31-50': 4, '51+': 6 };
  return bonuses[capacity] || 0;
};

const getSquatBonus = (capacity) => {
  const bonuses = { '0-15': 0, '16-40': 2, '41-70': 4, '71+': 6 };
  return bonuses[capacity] || 0;
};

const getRunningBonus = (capacity) => {
  const bonuses = { '<1km': 0, '1-3km': 2, '3-5km': 4, '5km+': 6 };
  return bonuses[capacity] || 0;
};

const getPlankBonus = (capacity) => {
  const bonuses = { '<30s': 0, '31-60s': 1, '61-90s': 2, '90s+': 3 };
  return bonuses[capacity] || 0;
};

const getFocusBonus = (capacity) => {
  const bonuses = { '15-30min': 0, '30-60min': 2, '1-2hr': 4, '2hr+': 6 };
  return bonuses[capacity] || 0;
};

const getLearningBonus = (level) => {
  const bonuses = { 'beginner': 1, 'occasional': 2, 'regular': 4, 'advanced': 6 };
  return bonuses[level] || 0;
};

const getStudyHabitsBonus = (level) => {
  const bonuses = { 'casual': 0, 'occasional': 1, 'regular': 3, 'intensive': 5 };
  return bonuses[level] || 0;
};

const getTimeBonus = (time) => {
  const bonuses = { '15-30min': 0, '30-60min': 1, '1-2hr': 2, '2hr+': 3 };
  return bonuses[time] || 0;
};

const getActivityBonus = (level) => {
  const bonuses = { 'sedentary': 0, 'light': 1, 'moderate': 2, 'active': 3 };
  return bonuses[level] || 0;
};

const getMeditationBonus = (level) => {
  const bonuses = { 'never': 0, 'tried': 1, 'regular': 2, 'advanced': 3 };
  return bonuses[level] || 0;
};

// Calculate quest tiers based on assessment
const calculateQuestTiers = (assessmentData) => {
  const strengthTier = calculateStrengthTier(assessmentData);
  const enduranceTier = calculateEnduranceTier(assessmentData);
  const focusTier = calculateFocusTier(assessmentData);
  const mindfulnessTier = calculateMindfulnessTier(assessmentData);

  return {
    strengthTier,
    enduranceTier,
    focusTier,
    mindfulnessTier
  };
};

const calculateStrengthTier = (data) => {
  const pushUpScore = getPushUpBonus(data.pushUpCapacity);
  const squatScore = getSquatBonus(data.squatCapacity);
  const totalScore = pushUpScore + squatScore;
  
  if (totalScore >= 8) return 'elite';
  if (totalScore >= 6) return 'advanced';
  if (totalScore >= 4) return 'intermediate';
  return 'beginner';
};

const calculateEnduranceTier = (data) => {
  const runningScore = getRunningBonus(data.runningCapacity);
  const plankScore = getPlankBonus(data.plankCapacity);
  const totalScore = runningScore + plankScore;
  
  if (totalScore >= 8) return 'elite';
  if (totalScore >= 6) return 'advanced';
  if (totalScore >= 4) return 'intermediate';
  return 'beginner';
};

const calculateFocusTier = (data) => {
  const focusScore = getFocusBonus(data.focusCapacity);
  const learningScore = getLearningBonus(data.learningLevel);
  const totalScore = focusScore + learningScore;
  
  if (totalScore >= 8) return 'elite';
  if (totalScore >= 6) return 'advanced';
  if (totalScore >= 4) return 'intermediate';
  return 'beginner';
};

const calculateMindfulnessTier = (data) => {
  const meditationScore = getMeditationBonus(data.meditationLevel);
  const activityScore = getActivityBonus(data.activityLevel);
  const totalScore = meditationScore + activityScore;
  
  if (totalScore >= 6) return 'elite';
  if (totalScore >= 4) return 'advanced';
  if (totalScore >= 2) return 'intermediate';
  return 'beginner';
};

module.exports = {
  calculateInitialStats,
  calculateQuestTiers
};
