const { DataTypes } = require('sequelize');
const sequelize = require('../database/db'); // Ensure you are importing the correct sequelize instance

const Vote = sequelize.define('Vote', {
  type: {
    type: DataTypes.ENUM('upvote', 'downvote'),
    allowNull: false,
  },
});

module.exports = Vote;
