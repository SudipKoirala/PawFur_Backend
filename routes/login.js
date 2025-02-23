const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Correct path

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // Compare the password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      "your_secret_key", // replace with actual secret
      { expiresIn: "1h" }
    );

    res.json({ success: true, message: "Login successful", token });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, error: 'Login error' });
  }
});

module.exports = router;
