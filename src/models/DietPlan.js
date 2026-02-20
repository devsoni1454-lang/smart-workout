const mongoose = require('mongoose');

const dietPlanSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Veg', 'Non-Veg', 'Vegan', 'Keto'],
        required: true
    },
    goal: {
        type: String,
        enum: ['Weight Loss', 'Muscle Gain', 'Maintenance'],
        required: true
    },
    meals: [{
        time: String, // Breakfast, Lunch, etc.
        items: [String],
        calories: Number
    }]
}, {
    timestamps: true
});

const DietPlan = mongoose.model('DietPlan', dietPlanSchema);

module.exports = DietPlan;
