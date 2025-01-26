const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

// Define the Pet model (assuming you have pets in the database)
const Pet = sequelize.define('Pet', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    breed: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',  // Refers to the 'Users' table
            key: 'id'
        }
    }
});

module.exports = Pet;
