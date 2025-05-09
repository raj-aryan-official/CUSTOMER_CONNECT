const express = require('express');
const userModel = require('../config/models/User');
const authMiddleware = require('../middleware/auth');
require('dotenv').config();

const router = express.Router();

// Example protected route
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select('-password -confirmPassword');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
