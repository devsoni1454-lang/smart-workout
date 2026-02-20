const express = require('express');
const router = express.Router();
const { addWorkoutLog, getWorkoutHistory } = require('../controllers/trackerController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, addWorkoutLog);

router.route('/history')
    .get(protect, getWorkoutHistory);

module.exports = router;
