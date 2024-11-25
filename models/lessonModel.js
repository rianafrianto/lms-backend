const connection = require('../config/db.js');

// Get lesson by unit_id
const getLessonById = async (id) => {
    const [result] = await connection.promise().query('SELECT * FROM Lesson WHERE unit_id = ? AND deleted_at IS NULL;',
      [id]);
    return result
  }

  module.exports = {
    getLessonById
  }