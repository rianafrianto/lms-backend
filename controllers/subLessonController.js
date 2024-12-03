const { insertSubLesson, getSubLesson, deleteSubLesson, updateSubLessonById } = require("../models/subLessonModel.js");

exports.createSubLessonToLesson = async (req, res) => {
    const { id } = req.params;
    const { title, content, mediaUrl, value, position, content_type, game_type } = req.body;
    if (!title || !content || !content_type) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    try {
      await insertSubLesson(id, title, content, mediaUrl, value, position, content_type, game_type)
      res.status(201).json({
        success: true,
        message: 'Sub Lesson successfully added to lesson',
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  exports.getSubLesson = async (req, res) => {
    try {
      const subLesson = await getSubLesson();
      res.status(200).json({ success: true, message: 'Get Sub Lesson successfully', data: subLesson });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  exports.softDeleteSubLesson = async (req, res) => {
    const { id } = req.params;
    const { deleted_by } = req.body
    try {
      await deleteSubLesson(deleted_by, id)
      res.status(200).json({
        success: true,
        message: 'Sub Lesson deleted successfully',
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  exports.updateSubLesson = async (req, res) => {
    const { id } = req.params;
    const { title, content, mediaUrl, value, position, content_type, game_type } = req.body;
    try {
      if (!title || !content || !content_type) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
      }
      await updateSubLessonById(id, title, content, mediaUrl, value, position, content_type, game_type)
      res.status(200).json({ success: true, message: 'Update Sub Lesson successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }