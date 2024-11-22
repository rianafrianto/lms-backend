const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController.js');

const router = express.Router();

// Register endpoint
router.post('/register', registerUser);

// Login endpoint
router.post('/login', loginUser);

module.exports = router;
