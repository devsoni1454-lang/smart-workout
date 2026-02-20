const DietPlan = require('../models/DietPlan');
const Guide = require('../models/Guide');

// @desc    Get all diet plans
// @route   GET /api/diet
// @access  Public
const getDietPlans = async (req, res) => {
    const plans = await DietPlan.find({});
    res.json(plans);
};

// @desc    Create a diet plan
// @route   POST /api/diet
// @access  Private (Admin/Trainer)
const createDietPlan = async (req, res) => {
    const { name, type, goal, meals } = req.body;
    const plan = new DietPlan({ name, type, goal, meals });
    const createdPlan = await plan.save();
    res.status(201).json(createdPlan);
};

// @desc    Get all guides
// @route   GET /api/guides
// @access  Public
const getGuides = async (req, res) => {
    const guides = await Guide.find({}).populate('author', 'name');
    res.json(guides);
};

// @desc    Create a guide
// @route   POST /api/guides
// @access  Private (Admin/Trainer)
const createGuide = async (req, res) => {
    const { title, category, content } = req.body;
    const guide = new Guide({
        title,
        category,
        content,
        author: req.user._id
    });
    const createdGuide = await guide.save();
    res.status(201).json(createdGuide);
};

module.exports = { getDietPlans, createDietPlan, getGuides, createGuide };
