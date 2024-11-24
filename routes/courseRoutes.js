const express = require('express');
const { createCourse, submitCourse } = require('../controllers/courseController.js');
const authenticateJWT = require('../middlewares/authMiddleware.js');
const router = express.Router();

router.post('/courses', authenticateJWT, createCourse);
router.post('/courses/:id/submit', authenticateJWT, submitCourse);

module.exports = router;
