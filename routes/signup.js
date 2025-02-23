const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user'); // Correct path

// Signup route
router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      first_name: firstName,  // Use exact model field names
      last_name: lastName,
      email,
      password: hashedPassword
    });

    res.status(201).json({ success: true, message: "User created successfully" });

  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ success: false, error: 'Failed to create user' });
  }
});

module.exports = router;
