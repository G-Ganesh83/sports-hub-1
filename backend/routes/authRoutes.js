const express = require("express");
const { register, login, me, updateMe } = require("../controllers/authController");
const auth = require('../middleware/auth');

const router = express.Router();

// Register (alias)
router.post("/register", register);
router.post("/signup", register);

// Login
router.post("/login", login);

// Me
router.get('/me', auth, me);

// Update current user
router.put('/update', auth, updateMe);

module.exports = router;


