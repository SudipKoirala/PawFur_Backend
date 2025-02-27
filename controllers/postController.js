const Post = require('../models/post');

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ 
      message: "Error fetching posts", 
      error: error.message 
    });
  }
};


const getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ 
      message: "Error fetching post", 
      error: error.message 
    });
  }
};


const createPost = async (req, res) => {
  try {
    const { title, category, content, user_id } = req.body;
    
 
    if (!title || !content || !user_id) {
      return res.status(400).json({ 
        message: "Missing required fields: title, content, and user_id are required" 
      });
    }

    
    console.log('Creating new post with data:', {
      title,
      category,
      content,
      user_id
    });

    const post = await Post.create({ 
      title, 
      category, 
      content, 
      user_id 
    });

    console.log('Post created successfully:', post.id);
    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ 
      message: "Error creating post", 
      error: error.message 
    });
  }
};


const updatePost = async (req, res) => {
  try {
    const { title, category, content } = req.body;
    const post = await Post.findByPk(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }


    const updatedPost = await post.update({
      title: title || post.title,
      category: category || post.category,
      content: content || post.content
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ 
      message: "Error updating post", 
      error: error.message 
    });
  }
};


const deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await post.destroy();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ 
      message: "Error deleting post", 
      error: error.message 
    });
  }
};


const getPostsByUser = async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { user_id: req.params.userId },
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching user posts:', error);
    res.status(500).json({ 
      message: "Error fetching user posts", 
      error: error.message 
    });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getPostsByUser
};