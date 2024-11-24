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

// Check exist course
const checkCourseById = async (id) => {
  const [result] = await connection.promise().query(
    'SELECT * FROM Course WHERE id = ?',
    [id]
  );
  return result;
};

// Edit course
const editCourseById = async (id, title, description, category, coverImage, createdBy) => {
  const [result] = await connection.promise().query(
    `UPDATE Course 
     SET title = ?, description = ?, category = ?, coverImage = ?, created_by = ?
     WHERE id = ?`,
    [title, description, category, coverImage, createdBy, id]
  );
  return result;
};


// Insert new unit to course
const insertUnit = async (courseId, title,description, created_at, updated_at) => {
  const [result] =  await connection.promise().query(
    'INSERT INTO Unit (course_id, title, description, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
    [courseId, title, description]
  );
  return result
};


module.exports = {
  checkUserById,
  insertNewCourse,
  allCourse,
  courseStatus,
  checkCourseById,
  editCourseById,
  insertUnit
};
