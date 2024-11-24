const connection = require('../config/db.js');

// Check user with createdBy exist in table user
const checkUserById = async (createdBy) => {
  const [existingUser] = await connection.promise().query(
    'SELECT * FROM User WHERE id = ?',
    [createdBy]
  );
  return existingUser;
};

// Insert new course
const insertNewCourse = async (title, description, category, coverImage, createdBy) => {
  const [result] =  await connection.promise().query(
    'INSERT INTO Course (title, description, category, coverImage, created_by) VALUES (?, ?, ?, ?, ?)',
    [title, description, category, coverImage, createdBy]
  );
  return result
};

// Get All Courses
const allCourse = async () => {
  const [result] = await connection.promise().query(
    'SELECT * FROM Course',
  );
  return result;
};

// Get Courses Status
const courseStatus = async (status) => {
  const [result] = await connection.promise().query(
    'SELECT * FROM Course WHERE status = ?',
    [status]
  );
  return result;
};


module.exports = {
  checkUserById,
  insertNewCourse,
  allCourse,
  courseStatus
};
