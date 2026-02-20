const WorkoutTracker = require('../models/WorkoutTracker');

// @desc    Log a daily workout
// @route   POST /api/tracker
// @access  Private
const addWorkoutLog = async (req, res) => {
    const { date, workoutType, duration, caloriesBurned, currentWeight, notes } = req.body;

    const tracker = new WorkoutTracker({
        user: req.user._id,
        date: date || Date.now(),
        workoutType,
        duration,
        caloriesBurned,
        currentWeight,
        notes
    });

    const createdTracker = await tracker.save();
    res.status(201).json(createdTracker);
};

// @desc    Get user workout history
// @route   GET /api/tracker/history
// @access  Private
const getWorkoutHistory = async (req, res) => {
    const history = await WorkoutTracker.find({ user: req.user._id }).sort({ date: -1 });
    res.json(history);
};

module.exports = { addWorkoutLog, getWorkoutHistory };
