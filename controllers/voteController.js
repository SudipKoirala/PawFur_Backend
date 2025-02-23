const { Vote } = require('../models/votes'); // Correct import
const { Post } = require('../models/post'); // Correct import

// Add a vote
exports.addVote = async (req, res) => {
  try {
    const { post_id, user_id, vote_type } = req.body; // 1 for upvote, -1 for downvote

    // Check if the user already voted
    const existingVote = await Vote.findOne({
      where: { post_id, user_id }
    });
    
    if (existingVote) {
      return res.status(400).json({ success: false, message: 'User has already voted on this post' });
    }

    // Create a new vote
    const newVote = await Vote.create({ post_id, user_id, vote_type });

    // Update the post's vote count
    const post = await Post.findByPk(post_id);
    post.votes += vote_type;
    await post.save();

    res.status(201).json({ success: true, vote: newVote });
  } catch (error) {
    console.error('Error adding vote:', error);
    res.status(500).json({ success: false, error: 'Failed to add vote' });
  }
};

// Get vote count for a post
exports.getVoteCount = async (req, res) => {
  try {
    const { post_id } = req.params;

    const post = await Post.findByPk(post_id, {
      include: [{ model: Vote }]
    });

    res.status(200).json({ success: true, votes: post.votes });
  } catch (error) {
    console.error('Error fetching vote count:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch vote count' });
  }
};
