const mongoose = require('mongoose');

const classSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    trainer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Referencing User who is a Trainer
        required: true
    },
    day: {
        type: String, // e.g., 'Monday'
        required: true
    },
    time: {
        type: String, // e.g., '10:00 AM'
        required: true
    },
    duration: {
        type: Number, // in minutes
        default: 60
    },
    capacity: {
        type: Number,
        default: 20
    }
}, {
    timestamps: true
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
