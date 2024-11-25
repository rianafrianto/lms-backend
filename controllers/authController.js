const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../config/db');
const { checkUserExists, insertUser } = require('../models/authModel.js');

// Register User
exports.registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields (username, email, password, role) are required.' });
  }

  try {
    // Check if the user already exists
    const existingUser = await checkUserExists(email);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user with role
    await insertUser(username, email, hashedPassword, role);
    res.status(201).json({ message: 'User registered successfully.', success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error.' });
  }
};


// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {

    // Check if user exists
    const user = await checkUserExists(email);
    if (user.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user[0].id, role: user[0].role, username:user[0].username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    const dataUser = {
      username: user[0].username,
      role: user[0].role,
    }
    
    res.status(200).json({ message: 'Login successful.', success: true, token, user: dataUser });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error.' });
  }
};
