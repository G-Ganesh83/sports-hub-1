const express = require('express');
const auth = require('../middleware/auth');
const Selector = require('../models/Selector');

const router = express.Router();

// Create or update selector profile for current user
router.post('/', auth, async (req, res) => {
  try {
    const payload = { ...req.body, user: req.user.id };
    const doc = await Selector.findOneAndUpdate(
      { user: req.user.id },
      { $set: payload },
      { new: true, upsert: true }
    );
    res.json(doc);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Get current user's selector profile
router.get('/me', auth, async (req, res) => {
  try {
    const doc = await Selector.findOne({ user: req.user.id });
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;


