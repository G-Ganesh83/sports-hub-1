const express = require('express');
const cors = require('cors');
const path = require('path');

// Set environment variables for local development
process.env.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/sportsDB';
process.env.PORT = process.env.PORT || '5001';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'mySecretKey';
const connectDB = require('./config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const authRoutes = require('./routes/authRoutes');
const { register } = require('./controllers/authController');
const profileRoutes = require('./routes/profileRoutes');

const app = express();

// Connect Database (root .env)
connectDB();

// Drop legacy indexes if present (from prior schema user_email)
(async () => {
  try {
    const indexes = await User.collection.indexes();
    const legacy = indexes.find((i) => i.name === 'user_email_1');
    if (legacy) {
      await User.collection.dropIndex('user_email_1');
      console.log('Removed legacy index user_email_1');
    }
  } catch (e) {
    // ignore if collection or index not present
  }
})();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', scope: 'api' });
});

// Helpful index for the API prefix
app.get('/api', (req, res) => {
  res.json({ status: 'ok', message: 'API root. Try /api/health, /api/auth/login, ...' });
});

// Mount auth routes
app.use('/api/auth', authRoutes);
// Compatibility alias: allow legacy /signup path to register
app.post('/api/auth/signup', register);
// Profiles
app.use('/api/players', profileRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Backend API listening on port ${PORT}`);
});


