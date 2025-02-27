const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');

router.post('/', voteController.addVote);

router.get('/:post_id/votes', voteController.getVoteCount);

module.exports = router;
