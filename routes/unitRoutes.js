const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middlewares/authMiddleware.js');
const { createLessonToUnit, getUnit, updateUnit, softDeleteUnit } = require('../controllers/unitController.js');

router.post('/units/:id', authenticateJWT, createLessonToUnit);
router.get('/units/:id', authenticateJWT, getUnit);
router.put('/units/:id', authenticateJWT, updateUnit);
router.delete('/units/delete/:id', authenticateJWT, softDeleteUnit);

module.exports = router;
