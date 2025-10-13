const {
  getUserTitles,
  equipTitles,
} = require("../services/titleUnlockService");

// @desc    Get all titles (owned and locked)
// @route   GET /api/titles
// @access  Private
const getTitles = async (req, res) => {
  try {
    const userId = req.user.userId;
    const titles = await getUserTitles(userId);

    res.status(200).json({
      success: true,
      data: titles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Get progress toward locked titles
// @route   GET /api/titles/progress
// @access  Private
const getTitleProgress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { locked } = await getUserTitles(userId);

    const progress = locked.map((title) => ({
      titleId: title._id,
      name: title.name,
      requirementType: title.requirementType,
      progress: title.progress,
    }));

    res.status(200).json({
      success: true,
      data: progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Equip a title
// @route   POST /api/titles/:id/equip
// @access  Private
const equipTitle = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const title = await equipTitles(userId, id);

    // Get updated user stats with title bonuses
    const user = await require("../models/User").findById(userId);
    const updatedStats = {
      strength: user.strength + title.strBonus,
      agility: user.agility + title.agiBonus,
      vitality: user.vitality + title.vitBonus,
      intelligence: user.intelligence + title.intBonus,
      sense: user.sense + title.senseBonus,
      luck: user.luck + title.luckBonus,
    };

    res.status(200).json({
      success: true,
      data: {
        activeTitle: {
          _id: title._id,
          name: title.name,
          bonuses: {
            str: title.strBonus,
            agi: title.agiBonus,
            vit: title.vitBonus,
            int: title.intBonus,
            sense: title.senseBonus,
            luck: title.luckBonus,
          },
        },
        updatedStats,
        message: `Title '${title.name}' equipped! +${title.strBonus} STR, +${title.agiBonus} AGI, +${title.vitBonus} VIT, +${title.intBonus} INT, +${title.senseBonus} SENSE, +${title.luckBonus} LUCK`,
      },
    });
  } catch (error) {
    if (error.message === "Title not unlocked") {
      return res.status(403).json({
        success: false,
        message: "Title not unlocked",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  getTitles,
  getTitleProgress,
  equipTitle,
};
