const express = require('express');
const { completeOnboarding } = require('../controllers/onboardingController');
const { validateAssessment } = require('../middleware/validation');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/onboarding/complete
// @desc    Complete onboarding and calculate initial stats
// @access  Private
router.post('/complete', auth, validateAssessment, completeOnboarding);

module.exports = router;
