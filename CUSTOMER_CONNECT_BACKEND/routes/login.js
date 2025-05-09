const express = require('express');
const jwt = require('jsonwebtoken');
const userModel = require('../config/models/User');
const LoginAttempt = require('../config/models/LoginAttempt');
require('dotenv').config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Login route
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      await LoginAttempt.create({ email, success: false });
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      await LoginAttempt.create({ email, success: false });
      return res.status(400).json({ error: "Invalid email or password" });
    }
    await LoginAttempt.create({ email, success: true });
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
