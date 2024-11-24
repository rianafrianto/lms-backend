const { insertLesson } = require("../models/unitModel.js");

exports.createLessonToUnit = async (req, res) => {
    const { id } = req.params;
    const { title, content, mediaUrl } = req.body;
    if (!title || !content || !mediaUrl) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    try {
      await insertLesson(id, title, content, mediaUrl)
      res.status(201).json({
        success: true,
        message: 'Lesson successfully added to unit',
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  