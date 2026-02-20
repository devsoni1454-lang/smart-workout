const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, assignTrainer } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router.put('/assign-trainer', protect, assignTrainer);

module.exports = router;
