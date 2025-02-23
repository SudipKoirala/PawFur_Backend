// models/post.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db');  // Make sure this path is correct

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',  // Ensure that 'Users' exists as a table in the DB
      key: 'id'
    }
  },
  category: {
    type: Sequelize.STRING,
    allowNull: true,  // You can set this to false if you want to make it required
  },
  
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
});

module.exports = Post;
