const Note = require('../models/Note');

// Create Note
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.create({
      title,
      content,
      user: req.user.id
    });
    res.status(201).json({ success: true, data: note });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get All Notes for logged in user
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id, isArchived: false })
      .populate('user', 'username email');
    res.status(200).json({ success: true, count: notes.length, data: notes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Note
const getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id).populate('user', 'username email');
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }
    if (note.user._id.toString() !== req.user.id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to access this note' });
    }
    res.status(200).json({ success: true, data: note });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Note
const updateNote = async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }
    if (note.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this note' });
    }
    note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({ success: true, data: note });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete Note
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }
    if (note.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this note' });
    }
    await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Archive Note
const archiveNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }
    if (note.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    note.isArchived = true;
    await note.save();
    res.status(200).json({ success: true, message: 'Note archived successfully', data: note });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createNote, getNotes, getNote, updateNote, deleteNote, archiveNote };