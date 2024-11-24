// routes/uploadRoutes.js
const express = require('express');
const { uploadCoverImage } = require('../controllers/uploadController.js');
const authenticateJWT = require('../middlewares/authMiddleware.js');

const router = express.Router();

// Route untuk upload cover image
router.post('/upload-cover-image', authenticateJWT ,uploadCoverImage);

module.exports = router;
