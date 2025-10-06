const express = require('express');
const auth = require('../middleware/auth');
const Event = require('../models/Event');

const router = express.Router();

// Create new event (selector only)
router.post('/', auth, async (req, res) => {
  try {
    const payload = {
      selector: req.user.id,
      title: req.body.title,
      description: req.body.description,
      dateTime: req.body.dateTime,
      location: req.body.location,
      contactInfo: req.body.contactInfo,
      imageUrl: req.body.imageUrl,
    };
    const ev = await Event.create(payload);
    res.status(201).json(ev);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// List events for current selector
router.get('/', auth, async (req, res) => {
  try {
    const items = await Event.find({ selector: req.user.id }).sort({ createdAt: -1 }).lean();
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Update event
router.put('/:id', auth, async (req, res) => {
  try {
    const updated = await Event.findOneAndUpdate(
      { _id: req.params.id, selector: req.user.id },
      { $set: req.body },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Delete event
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Event.findOneAndDelete({ _id: req.params.id, selector: req.user.id });
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;


