const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middlewares/authMiddleware.js');
const { createSubLessonToLesson, getSubLesson, softDeleteSubLesson, updateSubLesson } = require('../controllers/subLessonController.js');

router.put('/sublesson/:id', authenticateJWT, updateSubLesson);
router.get('/sublesson', authenticateJWT, getSubLesson);
router.delete('/sublesson/delete/:id', authenticateJWT, softDeleteSubLesson);
router.post('/sublesson/:id', authenticateJWT, createSubLessonToLesson);


module.exports = router;
