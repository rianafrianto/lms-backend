const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middlewares/authMiddleware.js');
const { createLessonToUnit, getUnit, updateUnit } = require('../controllers/unitController.js');

router.post('/units/:id/lessons', authenticateJWT, createLessonToUnit);
router.get('/units/:id', authenticateJWT, getUnit);
router.put('/units/:id', authenticateJWT, updateUnit);

module.exports = router;
