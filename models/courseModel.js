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

// Get Detail Course With Unit & Lesson
const getDetail = async (id) => {
  const [result] = await connection.promise().query(
    `SELECT
      c.id AS course_id,
      c.title AS course_title,
      c.description AS course_description,
      c.status AS course_status,
      c.feedback AS course_feedback,
      c.coverImage AS course_cover_image,
      u.id AS unit_id,
      u.title AS unit_title,
      u.description AS unit_description,
      l.id AS lesson_id,
      l.title AS lesson_title,
      l.content AS lesson_content
    FROM
      Course c
    LEFT JOIN
      Unit u ON u.course_id = c.id
    LEFT JOIN
      Lesson l ON l.unit_id = u.id
    WHERE
      c.id = ?;`,
    [id]
  );
  return result;
}

// validate course have min 1 unit and 1 lesson
const validateCourse = async (id) => {
  const [result] = await connection.promise().query(
    `SELECT
      COUNT(DISTINCT u.id) AS unit_count,
      COUNT(DISTINCT l.id) AS lesson_count
    FROM
      Course c
    LEFT JOIN
      Unit u ON u.course_id = c.id
    LEFT JOIN
      Lesson l ON l.unit_id = u.id
    WHERE
      c.id = ?;`,
    [id]
  );
  return result;
}

// update course status 
const updateCourseStatus = async (id, status) => {
  const [result] = await connection.promise().query(
    'UPDATE Course SET status =? WHERE id =?',
    [status, id]
  );
  return result;
};


module.exports = {
  checkUserById,
  insertNewCourse,
  allCourse,
  courseStatus,
  checkCourseById,
  editCourseById,
  insertUnit,
  getDetail,
  validateCourse,
  updateCourseStatus
};
