// Import the Post model
const Post = require('../models/post');

// Controller to handle creating a post
exports.createPost = async (req, res) => {
    try {
        const { title, content, userId } = req.body; // Assuming these fields are required
        const post = await Post.create({ title, content, userId });
        res.status(201).json(post);  // Return the created post as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create post' });
    }
};

// Controller to handle getting all posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll(); // Fetch all posts from the database
        res.status(200).json(posts); // Return all posts as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve posts' });
    }
};

// Controller to handle getting a post by ID
exports.getPostById = async (req, res) => {
    const { id } = req.params; // Get the post ID from the request parameters
    try {
        const post = await Post.findByPk(id); // Find the post by primary key (ID)
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post); // Return the post as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve the post' });
    }
};

// Controller to handle updating a post
exports.updatePost = async (req, res) => {
    const { id } = req.params; // Get the post ID from the request parameters
    const { title, content } = req.body; // Get the updated fields from the request body
    try {
        const post = await Post.findByPk(id); // Find the post by primary key (ID)
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        
        // Update the post fields
        post.title = title || post.title; 
        post.content = content || post.content;
        await post.save(); // Save the updated post

        res.status(200).json(post); // Return the updated post as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update the post' });
    }
};

// Controller to handle deleting a post
exports.deletePost = async (req, res) => {
    const { id } = req.params; // Get the post ID from the request parameters
    try {
        const post = await Post.findByPk(id); // Find the post by primary key (ID)
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Delete the post
        await post.destroy();
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete the post' });
    }
};
