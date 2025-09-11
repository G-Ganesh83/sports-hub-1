const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require('../middleware/auth');

exports.register = async (req, res) => {
  try {
    // normalize payload to support both frontend shapes
    const name = req.body.name || req.body.user_name;
    const email = (req.body.email || req.body.user_email || '').toLowerCase();
    const { password } = req.body;
    const role = req.body.role;

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const user = await User.create({ name, email, password: hashedPassword, role });

    // generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const userResponse = { id: String(user._id), user_name: user.name, user_email: user.email, role: user.role, avatarUrl: null };
    res.status(201).json({ message: "User registered", token, user: userResponse });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    // allow email or username
    const email = (req.body.email || req.body.user_email || '').toLowerCase();
    const userName = req.body.user_name || req.body.name;
    const { password } = req.body;

    // find user
    let user = null;
    if (email) {
      user = await User.findOne({ email });
    } else if (userName) {
      user = await User.findOne({ name: userName });
    }
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // check password (support legacy plaintext imports by re-hashing on first login)
    let isMatch = false;
    try {
      isMatch = await bcrypt.compare(password, user.password);
    } catch (e) {
      isMatch = false;
    }
    if (!isMatch) {
      const looksHashed = typeof user.password === 'string' && user.password.startsWith('$2');
      if (!looksHashed && password === user.password) {
        try {
          const newHash = await bcrypt.hash(password, 10);
          user.password = newHash;
          await user.save();
          isMatch = true;
        } catch (rehashErr) {
          return res.status(400).json({ message: "Invalid credentials" });
        }
      } else {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    }

    // generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const userResponse = { id: String(user._id), user_name: user.name, user_email: user.email, name: user.name, email: user.email, role: user.role, avatarUrl: null };
    res.status(200).json({ message: "Login successful", token, user: userResponse });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).lean();
    if (!user) return res.status(404).json({ message: 'Not found' });
    const userResponse = {
      id: String(user._id),
      user_name: user.name,
      user_email: user.email,
      name: user.name,
      email: user.email,
      phone: user.phone || null,
      location: user.location || {},
      position: user.position || null,
      specialization: user.specialization || null,
      role: user.role,
      avatarUrl: null,
    };
    res.json({ user: userResponse });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.updateMe = async (req, res) => {
  try {
    const allowed = ['name', 'email', 'phone', 'location', 'position', 'specialization'];
    const updates = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = key === 'email' ? String(req.body[key]).toLowerCase() : req.body[key];
    }
    const user = await User.findByIdAndUpdate(req.user.id, { $set: updates }, { new: true });
    const userResponse = {
      id: String(user._id),
      user_name: user.name,
      user_email: user.email,
      name: user.name,
      email: user.email,
      phone: user.phone || null,
      location: user.location || {},
      position: user.position || null,
      specialization: user.specialization || null,
      role: user.role,
      avatarUrl: null,
    };
    res.json({ user: userResponse });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};


