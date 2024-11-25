const connection = require('../config/db.js');


// Insert new lesson to unit
const insertLesson = async (unitId, title, content, mediaUrl, created_at, updated_at) => {
  const [result] = await connection.promise().query(
    'INSERT INTO Lesson (unit_id, title, content, mediaUrl, created_at, updated_at) VALUES (?,?,?,?, NOW(), NOW())',
    [unitId, title, content, mediaUrl]
  );
  return result
};

// Get units by course ID
const getUnitById = async (id) => {
  const [result] = await connection.promise().query('SELECT * FROM Unit WHERE course_id = ? AND deleted_at IS NULL;',
    [id]);
  return result
}

// Check exist unit
const checkUnitById = async (id) => {
  const [result] = await connection.promise().query(
    'SELECT * FROM Unit WHERE id = ? AND deleted_at IS NULL',
    [id]
  );
  return result;
};

// Update unit
const updateUnitById = async (id, title, description) => {
  const [result] = await connection.promise().query(
    'UPDATE Unit SET title = ?, description = ?, updated_at = NOW() WHERE id = ? AND deleted_at IS NULL',
    [title, description, id]
  );
  return result;
};

// delete unit
const deleteUnit = async (deleted_by, id) => {
  const [result] = await connection.promise().query(
    'UPDATE Unit SET deleted_at = NOW(), deleted_by = ? WHERE id = ? AND deleted_at IS NULL',
    [deleted_by, id]
  );
  return result
}



module.exports = {
  insertLesson,
  getUnitById,
  checkUnitById,
  updateUnitById,
  deleteUnit
}