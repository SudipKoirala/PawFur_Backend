const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); 

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      "17d0ff32c98f397d6cf5dc569acf1d45f89321b1983a8003a29b38d8819107fa41624e69b1612a4774fa2a58c68e406d4b8648b81bc01c4071e01dd1c2121389", 
      { expiresIn: "1h" }
    );

    res.json({ success: true, message: "Login successful", token });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, error: 'Login error' });
  }
});

module.exports = router;
