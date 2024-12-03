const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const authRoutes = require("./routes/authRoutes.js")
const courseRoutes = require("./routes/courseRoutes.js")
const uploadRoutes = require('./routes/uploadRoutes.js');
const unitRoutes = require('./routes/unitRoutes.js');
const lessonRoutes = require('./routes/lessonRoutes.js');
const subLessonRoutes = require('./routes/subLessonRoutes.js');
const cors = require('cors');
const PORT = process.env.PORT || 5000;


const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/feature', courseRoutes, unitRoutes, lessonRoutes, subLessonRoutes);
app.use('/api/s3', uploadRoutes);


app.get("/", (req, res) => {
  res.send("Api Work")
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});