const mysql = require("mysql2");
require("dotenv").config();

// Membuat koneksi
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Tes koneksi
connection.connect((err) => {
  if (err) {
    console.error("Unable to connect to the database:", err.message);
  } else {
    console.log("Connection has been established successfully.");
  }
});

module.exports = connection;
