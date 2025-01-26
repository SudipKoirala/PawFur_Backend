const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes for Users
router.post('/create', userController.createUser);  // Create new user
router.get('/', userController.getAllUsers);        // Get all users
router.put('/:id', userController.updateUser);      // Update a user by ID
router.delete('/:id', userController.deleteUser);   // Delete a user by ID

module.exports = router;
