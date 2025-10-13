const express = require('express');
const { getTitles, getTitleProgress, equipTitle } = require('../controllers/titleController');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/titles
// @desc    Get all titles (owned and locked)
// @access  Private
router.get('/', auth, getTitles);

// @route   GET /api/titles/progress
// @desc    Get progress toward locked titles
// @access  Private
router.get('/progress', auth, getTitleProgress);

// @route   POST /api/titles/:id/equip
// @desc    Equip a title
// @access  Private
router.post('/:id/equip', auth, equipTitle);

module.exports = router;
