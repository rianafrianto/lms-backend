const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const authRoutes = require("./routes/authRoutes.js")
const cors = require('cors');
const PORT = process.env.PORT || 5000;


const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());


// Routes
app.use('/api/auth', authRoutes);


app.get("/", (req, res) => {
  res.send("Api Work")
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});