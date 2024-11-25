const { getLessonById } = require("../models/lessonModel.js");

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