const mongoose = require('mongoose');

const guideSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String, // e.g., 'Nutrition', 'Safety', 'Beginner'
        required: true
    },
    content: {
        type: String, // Markdown or HTML content
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Guide = mongoose.model('Guide', guideSchema);

module.exports = Guide;
