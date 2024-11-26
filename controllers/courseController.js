const connection = require('../config/db.js');
const { checkUserById, insertNewCourse, allCourse, courseStatus, checkCourseById, editCourseById, insertUnit, getDetail, validateCourse, updateCourseStatus, deleteCourse, allCourseForAdmin, allCourseForUser } = require('../models/courseModel.js');

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


exports.updateCouseStatus = async (req, res) => {
  const { id, status } = req.params;
  const { feedback } = req.body;
  try {
    const validate = await validateCourse(id)
    const { unit_count, lesson_count } = validate[0]; 

    if(status === "pending") {
      if (unit_count < 1) {
        return res.status(400).json({ success: false, message: 'Course must have at least one unit.' });
      }
  
      if (lesson_count < 1) {
        return res.status(400).json({ success: false, message: 'Each unit must have at least one lesson.' });
      }
    }

    if (status === "rejected" && !feedback) {
      return res.status(400).json({ success: false, message: 'Feedback is required when rejecting the course.' });
    }

    await updateCourseStatus(id, status, feedback)

    res.status(200).json({ success: true, message: status === "pending" ? 'Course submitted for review' : 'Course Approved' });
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

exports.createUnitToCourse = async (req, res) => {
  const { id } = req.params;
  const { title} = req.body;
  if (!title) {
    return res.status(400).json({ success: false, message: 'Title field are required' });
  }
  try {
    await insertUnit(id, title)
    res.status(201).json({
      success: true,
      message: 'Unit successfully added to course',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getDetailCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await checkCourseById(id)
    if (data.length === 0) {
      return res.status(400).json({ success: false, message: 'Course does not exist' });
    }
    const resultData = await getDetail(id)
    if (resultData.length === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }
    const course = {
      id: resultData[0].course_id,
      title: resultData[0].course_title,
      description: resultData[0].course_description,
      category: resultData[0].course_category,
      coverImage: resultData[0].course_cover_image,
      status: resultData[0].course_status,
      feedback: resultData[0].course_feedback,
      units: [],
    };
    // Buat mapping unit dan lesson
    const unitMap = new Map();

    resultData.forEach((row) => {
      if (row.unit_id) {
        if (!unitMap.has(row.unit_id)) {
          unitMap.set(row.unit_id, {
            unit_id: row.unit_id,
            title: row.unit_title,
            description: row.unit_description,
            lessons: [],
          });
        }

        if (row.lesson_id) {
          unitMap.get(row.unit_id).lessons.push({
            lesson_id: row.lesson_id,
            title: row.lesson_title,
            content: row.lesson_content,
            mediaUrl: row.lesson_media_url,
          });
        }
      }
    });

    // Masukkan unit ke course
    course.units = Array.from(unitMap.values());

    res.status(200).json({
      success: true,
      message: 'Get Detail Course Successfully',
      data: course
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.softDeleteCourse = async (req, res) => {
  const { id } = req.params;
  const {deleted_by} = req.body
  try {
    await deleteCourse(deleted_by, id)
    res.status(200).json({
      success: true,
      message: 'Course deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

exports.getAllCourseAdmin = async (req, res) => {
  try {
    const data = await allCourseForAdmin()
    res.status(200).json({
      success: true,
      message: 'Get All Course Admin Successfully',
      data: data
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCourseById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await allCourseForUser(id)
    res.status(200).json({
      success: true,
      message: 'Get All Course User Successfully',
      data: data
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}