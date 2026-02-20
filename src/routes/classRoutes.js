const express = require('express');
const router = express.Router();
const { getClasses, createClass } = require('../controllers/classController');
const { protect, trainer } = require('../middleware/authMiddleware');

router.route('/')
    .get(getClasses)
    .post(protect, trainer, createClass);

module.exports = router;
