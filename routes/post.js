const express = require('express');
const router = express.Router();

// Importing createPost from postController.js
const { createPost } = require('../controllers/postController');

router.post('/create', createPost); // Directly using createPost

module.exports = router;
