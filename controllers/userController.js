const User = require('../models/user'); // Ensure your model is correctly imported

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const { name, email } = req.body;  // Assuming the body contains 'name' and 'email'
        const user = await User.create({ name, email });
        return res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error creating user' });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching users' });
    }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;  // Extract the user ID from the URL
        const { name, email } = req.body;  // Extract updated data from the body

        // Find user by ID
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user fields
        user.name = name;
        user.email = email;

        // Save updated user
        await user.save();
        return res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error updating user' });
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;  // Extract the user ID from the URL

        // Find user by ID
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete user
        await user.destroy();
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error deleting user' });
    }
};
