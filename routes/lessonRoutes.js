const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middlewares/authMiddleware.js');
const { getLesson } = require('../controllers/lessonController.js');

router.get('/lesson/:id', authenticateJWT, getLesson);
// router.put('/units/:id', authenticateJWT, updateUnit);
// router.delete('/units/delete/:id', authenticateJWT, softDeleteUnit);

module.exports = router;
