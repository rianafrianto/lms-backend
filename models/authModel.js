const bcrypt = require('bcryptjs');
const connection = require('../config/db.js');

// Check if the user already exists
const checkUserExists = async (email) => {
  const [existingUser] = await connection.promise().query(
    'SELECT * FROM User WHERE email = ?',
    [email]
  );
  return existingUser;
};

// Insert new user
const insertUser = async (username, email, hashedPassword, role) => {
  await connection.promise().query(
    'INSERT INTO User (username, email, password, role) VALUES (?, ?, ?, ?)',
    [username, email, hashedPassword, role]
  );
};

module.exports = {
  checkUserExists,
  insertUser,
};
