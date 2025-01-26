const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db');  // Import the sequelize instance

const Post = sequelize.define('Post', {
    // Define columns
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        },
    },
}, {
    timestamps: true,
    tableName: 'posts',
});

module.exports = Post;
