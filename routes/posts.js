const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController'); // Ensure correct import

// Define your routes and bind them to controller actions
router.post('/', postController.createPost);         // Route to create a post
router.get('/', postController.getAllPosts);        // Route to get all posts
router.get('/:id', postController.getPostById);     // Route to get a post by ID
router.put('/:id', postController.updatePost);      // Route to update a post
router.delete('/:id', postController.deletePost);   // Route to delete a post

module.exports = router;
