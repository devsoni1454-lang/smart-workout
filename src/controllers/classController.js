const Class = require('../models/Class');

// @desc    Get all classes
// @route   GET /api/classes
// @access  Public
const getClasses = async (req, res) => {
    try {
        const classes = await Class.find().populate('trainer', 'name email');
        res.json(classes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a class
// @route   POST /api/classes
// @access  Private (Trainer/Admin)
const createClass = async (req, res) => {
    const { title, description, day, time, duration, capacity } = req.body;

    const newClass = new Class({
        title,
        description,
        trainer: req.user._id, // Assuming the creator is the trainer
        day,
        time,
        duration,
        capacity
    });

    const createdClass = await newClass.save();
    res.status(201).json(createdClass);
};

module.exports = { getClasses, createClass };
