const express = require('express');
const router = express.Router();
const { getGuides, createGuide } = require('../controllers/dietController'); // Reusing dietController for efficiency
const { protect, trainer } = require('../middleware/authMiddleware');

router.route('/')
    .get(getGuides)
    .post(protect, trainer, createGuide);

module.exports = router;
