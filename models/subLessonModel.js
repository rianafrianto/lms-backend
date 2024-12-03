const connection = require('../config/db.js');

// Insert new sub lesson to lesson
const insertSubLesson = async (lessonId, title, content, mediaUrl, value, position, content_type, game_type) => {
  const [result] = await connection.promise().query(
    'INSERT INTO SubLesson (lesson_id, title, content, mediaUrl, value, position, content_type, game_type, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,NOW(),NOW())',
    [lessonId, title, content, mediaUrl, value, position, content_type, game_type]
  );
  return result;
};

// Get sub lesson
const getSubLesson = async () => {
  const [result] = await connection.promise().query('SELECT * FROM SubLesson WHERE deleted_at IS NULL ORDER BY position ASC;');
  return result;
}

// delete sub lesson
const deleteSubLesson = async (deleted_by, id) => {
  const [result] = await connection.promise().query(
    'UPDATE SubLesson SET deleted_at = NOW(), deleted_by = ? WHERE id = ? AND deleted_at IS NULL',
    [deleted_by, id]
  );
  return result
}

// Update sub lesson 
const updateSubLessonById = async (id, title, content, mediaUrl, value, position, content_type, game_type) => {
  const [result] = await connection.promise().query(
    'UPDATE SubLesson SET title = ?, content = ?, mediaUrl = ?, value = ?, position = ?, content_type = ?, game_type = ?, updated_at = NOW() WHERE id = ? AND deleted_at IS NULL',
    [title, content, mediaUrl, value, position, content_type, game_type, id]
  );
  return result;
};


module.exports = {
    insertSubLesson,
    getSubLesson,
    deleteSubLesson,
    updateSubLessonById
  }