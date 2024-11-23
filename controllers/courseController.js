const connection = require('../config/db.js');

exports.createCourse = async (req, res) => {
  const { title, description, category, coverImage, createdBy } = req.body;

  // Pastikan semua field yang dibutuhkan ada, termasuk created_by
  if (!title || !description || !category || !coverImage) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  if (!createdBy) {
    return res.status(400).json({ success: false, message: 'User ID is missing' });
  }

  try {
    // Mengecek apakah user dengan createdBy (ID pengguna) ada di tabel user
    const [user] = await connection.promise().query('SELECT id FROM user WHERE id = ?', [createdBy]);

    if (user.length === 0) {
      return res.status(400).json({ success: false, message: 'User does not exist' });
    }

    // Menyusun query untuk menambahkan course ke tabel course
    const query = 'INSERT INTO course (title, description, category, coverImage, created_by) VALUES (?, ?, ?, ?, ?)';
    const values = [title, description, category, coverImage, createdBy];

    // Eksekusi query dan insert data course
    const [result] = await connection.promise().query(query, values);

    // Mengembalikan response sukses jika berhasil
    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      courseId: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};




exports.submitCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'SELECT COUNT(*) as count FROM unit WHERE courseId = ?';
    const [[unitCount]] = await connection.execute(query, [id]);

    const queryLesson = 'SELECT COUNT(*) as count FROM lesson WHERE unitId IN (SELECT id FROM unit WHERE courseId = ?)';
    const [[lessonCount]] = await connection.execute(queryLesson, [id]);

    if (unitCount.count === 0 || lessonCount.count === 0) {
      return res.status(400).json({ success: false, message: 'Course must have at least one unit and one lesson to be submitted' });
    }

    const updateQuery = 'UPDATE course SET status = ? WHERE id = ?';
    await connection.execute(updateQuery, ['pending', id]);

    res.status(200).json({ success: true, message: 'Course submitted for review' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
