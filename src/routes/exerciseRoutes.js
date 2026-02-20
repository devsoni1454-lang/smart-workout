const express = require('express');
const router = express.Router();
const { getExercises, createExercise } = require('../controllers/exerciseController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getExercises)
    .post(protect, admin, createExercise);

module.exports = router;
