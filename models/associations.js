const User = require('./user');
const Post = require('./post');
const Vote = require('./vote');

// Define associations
Post.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Post, { foreignKey: 'user_id' });

Vote.belongsTo(Post, { foreignKey: 'post_id' });
Post.hasMany(Vote, { foreignKey: 'post_id' });

Vote.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Vote, { foreignKey: 'user_id' });

module.exports = { User, Post, Vote };  // Export models and associations
