const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            age: user.age,
            weight: user.weight,
            height: user.height,
            goal: user.goal,
            assignedTrainer: user.assignedTrainer
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.age = req.body.age || user.age;
        user.weight = req.body.weight || user.weight;
        user.height = req.body.height || user.height;
        user.goal = req.body.goal || user.goal;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            age: updatedUser.age,
            weight: updatedUser.weight,
            height: updatedUser.height,
            goal: updatedUser.goal,
            token: req.body.token // Maintain token if client needs it, or generate new one
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Assign trainer to user
// @route   PUT /api/users/assign-trainer
// @access  Private
const assignTrainer = async (req, res) => {
    const { trainerId } = req.body;

    const user = await User.findById(req.user._id);

    if (user) {
        user.assignedTrainer = trainerId;
        await user.save();
        res.json({ message: 'Trainer assigned', assignedTrainer: trainerId });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
}

module.exports = { getUserProfile, updateUserProfile, assignTrainer };
