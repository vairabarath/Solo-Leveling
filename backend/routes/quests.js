const express = require('express');
const { getDailyQuests, getAvailableQuests, getQuestById, completeQuest } = require('../controllers/questController');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/quests/daily
// @desc    Get user's daily quests
// @access  Private
router.get('/daily', auth, getDailyQuests);

// @route   GET /api/quests/available
// @desc    Get available quests
// @access  Private
router.get('/available', auth, getAvailableQuests);

// @route   GET /api/quests/:id
// @desc    Get single quest details
// @access  Private
router.get('/:id', auth, getQuestById);

// @route   POST /api/quests/:id/complete
// @desc    Complete a quest
// @access  Private
router.post('/:id/complete', auth, completeQuest);

module.exports = router;
