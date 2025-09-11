const express = require('express');
const Profile = require('../models/Profile');
const auth = require('../middleware/auth');

const router = express.Router();

// Create or update current user's profile
router.post('/', auth, async (req, res) => {
  try {
    const payload = { ...req.body };
    payload.user = req.user.id;
    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: payload },
      { upsert: true, new: true }
    );
    return res.status(200).json(profile);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

// Get current user's profile
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).lean();
    if (!profile) return res.status(404).json({ message: 'Not found' });
    return res.json(profile);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

// List profiles (basic pagination)
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page || '1', 10);
  const limit = parseInt(req.query.limit || '10', 10);
  const skip = (page - 1) * limit;
  const filter = {};
  if (req.query.sport) filter.sport = req.query.sport;
  try {
    const [items, total] = await Promise.all([
      Profile.find(filter).skip(skip).limit(limit).lean(),
      Profile.countDocuments(filter),
    ]);
    return res.json({ items, total, page, limit });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

// Get by id
router.get('/:id', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id).lean();
    if (!profile) return res.status(404).json({ message: 'Not found' });
    return res.json(profile);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;


