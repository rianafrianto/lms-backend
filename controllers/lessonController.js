const { getLessonById, updateLessonById, deleteLesson } = require("../models/lessonModel.js");

exports.getLesson = async (req, res) => {
  const { id } = req.params;
  try {
    const lesson = await getLessonById(id);
    if (!lesson) {
      return res.status(404).json({ success: false, message: 'Lesson not found' });
    }
    res.status(200).json({ success: true, message: 'Get Lesson successfully', data: lesson });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

exports.updateLesson = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  const { title, content, mediaUrl } = req.body;
  try {
    if (!title || !content || !mediaUrl) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    await updateLessonById(id, title, content, mediaUrl)
    res.status(200).json({ success: true, message: 'Update Lesson successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

exports.softDeleteLesson = async (req, res) => {
  const { id } = req.params;
  const { deleted_by } = req.body
  try {
    await deleteLesson(deleted_by, id)
    res.status(200).json({
      success: true,
      message: 'Lesson deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

