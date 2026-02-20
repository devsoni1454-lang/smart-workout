const express = require('express');
const router = express.Router();
const { getTrainers, getTrainerById, updateTrainerProfile } = require('../controllers/trainerController');
const { protect, trainer } = require('../middleware/authMiddleware');

router.route('/')
    .get(getTrainers)
    .post(protect, trainer, updateTrainerProfile);

router.route('/:id')
    .get(getTrainerById);

module.exports = router;
