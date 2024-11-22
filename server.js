require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('../backend/src/routes/authRoutes.js');
const cors = require('cors');
const connection = require("./src/config/db.js")
const PORT = process.env.PORT || 5000;


const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());


// Routes
app.use('/api/auth', authRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});