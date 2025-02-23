const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');

// POST route to add a vote
router.post('/', voteController.addVote);

// GET route to retrieve vote count for a specific post
router.get('/:post_id/votes', voteController.getVoteCount);

module.exports = router;
