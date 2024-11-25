const connection = require("../config/db.js");

// Query untuk membuat tabel User
const createUserTable = `
CREATE TABLE IF NOT EXISTS User (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  deleted_by INT NULL
)`;

// Query untuk membuat tabel Course
const createCourseTable = `
CREATE TABLE IF NOT EXISTS Course (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(255),
  coverImage VARCHAR(255),
  status ENUM('pending', 'approved', 'rejected') DEFAULT NULL,
  feedback TEXT,
  created_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES User(id) ON DELETE CASCADE,
  deleted_at TIMESTAMP NULL,
  deleted_by INT NULL
)`;

// Query untuk membuat tabel Unit
const createUnitTable = `
CREATE TABLE IF NOT EXISTS Unit (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  // description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES Course(id) ON DELETE CASCADE,
  deleted_at TIMESTAMP NULL,
  deleted_by INT NULL
)`;

// Query untuk membuat tabel Lesson
const createLessonTable = `
CREATE TABLE IF NOT EXISTS Lesson (
  id INT AUTO_INCREMENT PRIMARY KEY,
  unit_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  mediaUrl VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (unit_id) REFERENCES Unit(id) ON DELETE CASCADE,
  deleted_at TIMESTAMP NULL,
  deleted_by INT NULL
)`;

// Menjalankan query untuk membuat tabel User
connection.query(createUserTable, (err, result) => {
  if (err) {
    console.error("Error creating table 'User':", err.message);
  } else {
    console.log("Table 'User' created successfully.");
  }
});

// Menjalankan query untuk membuat tabel Course
connection.query(createCourseTable, (err, result) => {
  if (err) {
    console.error("Error creating table 'Course':", err.message);
  } else {
    console.log("Table 'Course' created successfully.");
  }
});

// Menjalankan query untuk membuat tabel Unit
connection.query(createUnitTable, (err, result) => {
  if (err) {
    console.error("Error creating table 'Unit':", err.message);
  } else {
    console.log("Table 'Unit' created successfully.");
  }
});

// Menjalankan query untuk membuat tabel Lesson
connection.query(createLessonTable, (err, result) => {
  if (err) {
    console.error("Error creating table 'Lesson':", err.message);
  } else {
    console.log("Table 'Lesson' created successfully.");
  }
});

connection.end(); // Menutup koneksi setelah semua query selesai
