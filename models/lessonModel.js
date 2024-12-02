const connection = require('../config/db.js');

// Get lesson by unit_id
const getLessonById = async (id) => {
  const [result] = await connection.promise().query('SELECT * FROM Lesson WHERE unit_id = ? AND deleted_at IS NULL;',
    [id]);
  return result
}

// Update lesson 
const updateLessonById = async (id, title, content, mediaUrl, value, position, content_type, game_type) => {
  const [result] = await connection.promise().query(
    'UPDATE Lesson SET title = ?, content = ?, mediaUrl = ?, value = ?, position = ?, content_type = ?, game_type = ?, updated_at = NOW() WHERE id = ? AND deleted_at IS NULL',
    [title, content, mediaUrl, value, position, content_type, game_type, id]
  );
  return result;
};


// delete lesson
const deleteLesson = async (deleted_by, id) => {
  const [result] = await connection.promise().query(
    'UPDATE Lesson SET deleted_at = NOW(), deleted_by = ? WHERE id = ? AND deleted_at IS NULL',
    [deleted_by, id]
  );
  return result
}

module.exports = {
  getLessonById,
  updateLessonById,
  deleteLesson
}