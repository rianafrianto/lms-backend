const express = require('express');
const { createCourse, submitAndAporoveCourse, getAllCourse, getCourseByStatus, editCourse, createUnitToCourse, getDetailCourse, softDeleteCourse } = require('../controllers/courseController.js');
const authenticateJWT = require('../middlewares/authMiddleware.js');
const router = express.Router();

router.post('/courses', authenticateJWT, createCourse);
router.post('/courses/units/:id', createUnitToCourse);
router.post('/courses/:id/:status', authenticateJWT, submitAndAporoveCourse);
router.get('/courses', authenticateJWT, getAllCourse);
router.get('/courses/:status', authenticateJWT, getCourseByStatus);
router.put('/courses/:id', authenticateJWT, editCourse);
router.get('/courses/detail/:id', authenticateJWT, getDetailCourse);
router.delete('/courses/delete/:id', authenticateJWT, softDeleteCourse);



module.exports = router;
