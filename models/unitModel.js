const connection = require('../config/db.js');


// Insert new lesson to unit
const insertLesson = async (unitId, title,content, mediaUrl ,created_at, updated_at) => {
    const [result] =  await connection.promise().query(
      'INSERT INTO Lesson (unit_id, title, content, mediaUrl, created_at, updated_at) VALUES (?,?,?,?, NOW(), NOW())',
      [unitId, title, content, mediaUrl]
    );
    return result
  };
  

  module.exports = {
    insertLesson
  }