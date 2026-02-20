const mongoose = require('mongoose');

const trainerSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    specialization: {
        type: String, // e.g., 'Yoga', 'HIIT', 'Bodybuilding'
        required: true
    },
    experience: {
        type: Number, // Years of experience
        required: true
    },
    bio: {
        type: String,
        default: ''
    },
    clients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
});

const Trainer = mongoose.model('Trainer', trainerSchema);

module.exports = Trainer;
