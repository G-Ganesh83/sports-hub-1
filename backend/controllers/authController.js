const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const userResponse = { id: String(user._id), user_name: user.name, user_email: user.email, role: user.role, avatarUrl: null };
    res.status(200).json({ message: "Login successful", token, user: userResponse });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


