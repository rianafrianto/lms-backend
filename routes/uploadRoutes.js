// routes/uploadRoutes.js
const express = require('express');
const { uploadCoverImage } = require('../controllers/uploadController.js');

const router = express.Router();

// Route untuk upload cover image
router.post('/upload-cover-image', uploadCoverImage);

module.exports = router;
