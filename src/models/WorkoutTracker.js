const mongoose = require('mongoose');

const workoutTrackerSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    workoutType: {
        type: String,
        required: true
    },
    duration: {
        type: Number, // Minutes
        required: true
    },
    caloriesBurned: {
        type: Number
    },
    currentWeight: {
        type: Number // To track weight progress over time
    },
    notes: {
        type: String
    }
}, {
    timestamps: true
});

const WorkoutTracker = mongoose.model('WorkoutTracker', workoutTrackerSchema);

module.exports = WorkoutTracker;
