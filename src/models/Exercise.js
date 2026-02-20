const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String, // e.g., 'Chest', 'Cardio'
        required: true
    },
    sets: {
        type: Number,
        default: 3
    },
    reps: {
        type: String, // e.g., '10-12' or could be Number
        default: '12'
    },
    videoUrl: {
        type: String // Optional link to video
    },
    imageUrl: {
        type: String // Optional image
    }
}, {
    timestamps: true
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
