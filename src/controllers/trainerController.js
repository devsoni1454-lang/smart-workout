const Trainer = require('../models/Trainer');
const User = require('../models/User');

// @desc    Get all trainers
// @route   GET /api/trainers
// @access  Public
const getTrainers = async (req, res) => {
    try {
        const trainers = await Trainer.find().populate('user', 'name email role');
        res.json(trainers);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get trainer by ID
// @route   GET /api/trainers/:id
// @access  Public
const getTrainerById = async (req, res) => {
    try {
        const trainer = await Trainer.findById(req.params.id).populate('user', 'name email role');

        if (trainer) {
            res.json(trainer);
        } else {
            res.status(404).json({ message: 'Trainer not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create/Update Trainer Profile (For Trainers/Admins)
// @route   POST /api/trainers
// @access  Private (Trainer/Admin)
const updateTrainerProfile = async (req, res) => {
    const { specialization, experience, bio } = req.body;

    // Check if trainer profile exists for this user
    let trainer = await Trainer.findOne({ user: req.user._id });

    if (trainer) {
        // Update
        trainer.specialization = specialization || trainer.specialization;
        trainer.experience = experience || trainer.experience;
        trainer.bio = bio || trainer.bio;
    } else {
        // Create
        trainer = new Trainer({
            user: req.user._id,
            specialization,
            experience,
            bio
        });
    }

    const updatedTrainer = await trainer.save();
    res.json(updatedTrainer);
};

module.exports = { getTrainers, getTrainerById, updateTrainerProfile };
