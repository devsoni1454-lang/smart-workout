const express = require('express');
const router = express.Router();
const { getDietPlans, createDietPlan } = require('../controllers/dietController');
const { protect, trainer } = require('../middleware/authMiddleware');

router.route('/')
    .get(getDietPlans)
    .post(protect, trainer, createDietPlan);

module.exports = router;
