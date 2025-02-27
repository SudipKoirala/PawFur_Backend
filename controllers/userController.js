const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user'); 

exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        let user = await User.findOne({ where: { email } });
        if (user) return res.status(400).json({ error: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({ username, email, password: hashedPassword });

        const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
