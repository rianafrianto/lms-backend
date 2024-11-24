const express = require('express');
const { createCourse, submitCourse, getAllCourse, getCourseByStatus, editCourse } = require('../controllers/courseController.js');
const authenticateJWT = require('../middlewares/authMiddleware.js');
const router = express.Router();

router.post('/courses', authenticateJWT, createCourse);
router.post('/courses/:id/submit', authenticateJWT, submitCourse);
router.get('/courses', authenticateJWT, getAllCourse);
router.get('/courses/:status', authenticateJWT, getCourseByStatus);
router.put('/courses/:id', authenticateJWT, editCourse);


module.exports = router;
