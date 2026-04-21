const { body, validationResult } = require('express-validator');

// Validation result handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// User registration validation
const validateRegister = [
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  handleValidationErrors
];

// User login validation
const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

// Assessment data validation
const validateAssessment = [
  body('assessmentData')
    .isObject()
    .withMessage('Assessment data is required'),
  body('assessmentData.pushUpCapacity')
    .isIn(['0-10', '11-30', '31-50', '51+'])
    .withMessage('Invalid push-up capacity value'),
  body('assessmentData.squatCapacity')
    .isIn(['0-15', '16-40', '41-70', '71+'])
    .withMessage('Invalid squat capacity value'),
  body('assessmentData.runningCapacity')
    .isIn(['<1km', '1-3km', '3-5km', '5km+'])
    .withMessage('Invalid running capacity value'),
  body('assessmentData.plankCapacity')
    .isIn(['<30s', '31-60s', '61-90s', '90s+'])
    .withMessage('Invalid plank capacity value'),
  body('assessmentData.focusCapacity')
    .isIn(['15-30min', '30-60min', '1-2hr', '2hr+'])
    .withMessage('Invalid focus capacity value'),
  body('assessmentData.learningLevel')
    .isIn(['beginner', 'occasional', 'regular', 'advanced'])
    .withMessage('Invalid learning level value'),
  body('assessmentData.studyHabits')
    .isIn(['casual', 'occasional', 'regular', 'intensive'])
    .withMessage('Invalid study habits value'),
  body('assessmentData.dailyTimeAvailable')
    .isIn(['15-30min', '30-60min', '1-2hr', '2hr+'])
    .withMessage('Invalid daily time available value'),
  body('assessmentData.activityLevel')
    .isIn(['sedentary', 'light', 'moderate', 'active'])
    .withMessage('Invalid activity level value'),
  body('assessmentData.meditationLevel')
    .isIn(['never', 'tried', 'regular', 'advanced'])
    .withMessage('Invalid meditation level value'),
  handleValidationErrors
];

module.exports = {
  validateRegister,
  validateLogin,
  validateAssessment,
  handleValidationErrors
};
