const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middlewares/authMiddleware.js');
const { createLessonToUnit } = require('../controllers/unitController.js');

router.post('/units/:id/lessons', authenticateJWT ,createLessonToUnit);

module.exports = router;
