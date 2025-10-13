const express = require('express');
const { getProfile, getHistory, updateProfile } = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, getProfile);

// @route   GET /api/users/history
// @desc    Get quest completion history
// @access  Private
router.get('/history', auth, getHistory);

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, updateProfile);

module.exports = router;
