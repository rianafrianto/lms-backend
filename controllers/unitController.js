const { insertLesson, getUnitById, checkUnitById, updateUnitById, deleteUnit } = require("../models/unitModel.js");

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

exports.getUnit = async (req, res) => {
  const { id } = req.params;
  try {
    const unit = await getUnitById(id);
    if (!unit) {
      return res.status(404).json({ success: false, message: 'Unit not found' });
    }
    res.status(200).json({ success: true, message: 'Get Unit successfully', data: unit });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

exports.updateUnit = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    if (!title) {
      return res.status(400).json({ success: false, message: 'Title field are required' });
    }
    const unit = await checkUnitById(id);
    if (!unit) {
      return res.status(404).json({ success: false, message: 'Unit not found' });
    }
    await updateUnitById(id, title)
    res.status(200).json({ success: true, message: 'Update Unit successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

exports.softDeleteUnit = async (req, res) => {
  const { id } = req.params;
  const { deleted_by } = req.body
  try {
    await deleteUnit(deleted_by, id)
    res.status(200).json({
      success: true,
      message: 'Unit deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}


