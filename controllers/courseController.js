const connection = require('../config/db.js');
const { checkUserById, insertNewCourse, allCourse, courseStatus, checkCourseById, editCourseById } = require('../models/courseModel.js');

exports.createCourse = async (req, res) => {
  const { title, description, category, coverImage, createdBy } = req.body;
  if (!title || !description || !category || !coverImage) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }
  if (!createdBy) {
    return res.status(400).json({ success: false, message: 'User ID is missing' });
  }
  try {
    const user = await checkUserById(createdBy)
    if (user.length === 0) {
      return res.status(400).json({ success: false, message: 'User does not exist' });
    }
    const resultInsert = await insertNewCourse(title, description, category, coverImage, createdBy)
    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      courseId: resultInsert.insertId,
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

exports.getAllCourse = async (req, res) => {
  try {
    const data = await allCourse()
    res.status(200).json({
      success: true,
      message: 'Get All Course Successfully',
      data: data
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCourseByStatus = async (req, res) => {
  const { status } = req.params;
  try {
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }
    const data = await courseStatus(status)
    res.status(200).json({
      success: true,
      message: 'Get Course Status Successfully',
      data: data
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.editCourse = async (req, res) => {
  const { id } = req.params;
  const { title, description, category, coverImage, createdBy } = req.body;
  if (!title || !description || !category || !coverImage) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const data = await checkCourseById(id)
    if (data.length === 0) {
      return res.status(400).json({ success: false, message: 'Course does not exist' });
    }
    await editCourseById(id, title, description, category, coverImage, createdBy)
    res.status(200).json({
      success: true,
      message: 'Course updated successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



