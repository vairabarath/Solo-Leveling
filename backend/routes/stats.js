const express = require('express');
const { getCurrentStats, getStatsHistory, getStatsBreakdown } = require('../controllers/statsController');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/stats/current
// @desc    Get current user stats
// @access  Private
router.get('/current', auth, getCurrentStats);

// @route   GET /api/stats/history
// @desc    Get stat growth history
// @access  Private
router.get('/history', auth, getStatsHistory);

// @route   GET /api/stats/breakdown
// @desc    Get stat breakdown by category
// @access  Private
router.get('/breakdown', auth, getStatsBreakdown);

module.exports = router;
