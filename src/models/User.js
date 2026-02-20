const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        default: 0
    },
    weight: {
        type: Number, // in kg
        default: 0
    },
    height: {
        type: Number, // in cm
        default: 0
    },
    goal: {
        type: String, // e.g., 'Weight Loss', 'Muscle Gain'
        default: ''
    },
    role: {
        type: String,
        enum: ['user', 'trainer', 'admin'],
        default: 'user'
    },
    assignedTrainer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Referencing another User who is a trainer
        default: null
    }
}, {
    timestamps: true
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
