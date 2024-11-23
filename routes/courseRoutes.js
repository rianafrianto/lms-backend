const express = require('express');
const { createCourse, submitCourse } = require('../controllers/courseController.js');
const router = express.Router();

router.post('/courses', createCourse);
router.post('/courses/:id/submit', submitCourse);

module.exports = router;
