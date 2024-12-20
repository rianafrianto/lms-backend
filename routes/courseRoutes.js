const express = require('express');
const { createCourse, updateCouseStatus, getAllCourse, getCourseByStatus, editCourse, createUnitToCourse, getDetailCourse, softDeleteCourse, getAllCourseAdmin, getCourseById } = require('../controllers/courseController.js');
const authenticateJWT = require('../middlewares/authMiddleware.js');
const router = express.Router();

router.post('/courses', authenticateJWT, createCourse);
router.post('/courses/:id', createUnitToCourse);
router.post('/courses/:id/:status', authenticateJWT, updateCouseStatus);
router.get('/courses', authenticateJWT, getAllCourse);
router.get('/courses/admin', authenticateJWT, getAllCourseAdmin);
router.get('/courses/:status', authenticateJWT, getCourseByStatus);
router.get('/courses/user/:id', authenticateJWT, getCourseById);
router.put('/courses/:id', authenticateJWT, editCourse);
router.get('/courses/detail/:id', authenticateJWT, getDetailCourse);
router.delete('/courses/delete/:id', authenticateJWT, softDeleteCourse);



module.exports = router;
