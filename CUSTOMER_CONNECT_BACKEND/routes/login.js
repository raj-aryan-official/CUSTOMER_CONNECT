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

    // Input validation
    if (!email || !password) {
      return res.status(400).json({ error: "Please provide both email and password" });
    }

    // Find user
    const user = await userModel.findOne({ email: email.toLowerCase() });
    
    // Create login attempt record
    const loginAttempt = new LoginAttempt({
      email: email.toLowerCase(),
      success: false,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.headers['user-agent'] || 'Unknown'
    });

    if (!user) {
      await loginAttempt.save();
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      await loginAttempt.save();
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Update login attempt as successful
    loginAttempt.success = true;
    await loginAttempt.save();

    // Generate token
    const token = jwt.sign(
      { 
        id: user._id, 
        email: user.email,
        role: user.role 
      }, 
      JWT_SECRET, 
      { expiresIn: '24h' }
    );

    // Send response
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ 
      success: false,
      error: "Internal server error",
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

module.exports = router;
