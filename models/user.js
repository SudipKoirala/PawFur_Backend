const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');  // Sequelize instance

class User extends Model {}

User.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    sequelize,
    modelName: 'User'
});

module.exports = User;
