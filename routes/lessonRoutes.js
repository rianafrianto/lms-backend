const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middlewares/authMiddleware.js');
const { getLesson, updateLesson, softDeleteLesson } = require('../controllers/lessonController.js');

router.get('/lesson/:id', authenticateJWT, getLesson);
router.put('/lesson/:id', authenticateJWT, updateLesson);
router.delete('/lesson/delete/:id', authenticateJWT, softDeleteLesson);

module.exports = router;
