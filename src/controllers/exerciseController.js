const Exercise = require('../models/Exercise');

// @desc    Get all exercises
// @route   GET /api/exercises
// @access  Public
const getExercises = async (req, res) => {
    const exercises = await Exercise.find({});
    res.json(exercises);
};

// @desc    Create an exercise
// @route   POST /api/exercises
// @access  Private/Admin (or Trainer)
const createExercise = async (req, res) => {
    const { name, category, sets, reps, videoUrl, imageUrl } = req.body;

    const exercise = new Exercise({
        name,
        category,
        sets,
        reps,
        videoUrl,
        imageUrl
    });

    const createdExercise = await exercise.save();
    res.status(201).json(createdExercise);
};

module.exports = { getExercises, createExercise };
