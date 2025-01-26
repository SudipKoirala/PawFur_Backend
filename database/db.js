const { Sequelize } = require('sequelize');

// Setup the Sequelize instance to connect to the PostgreSQL database
const sequelize = new Sequelize('pawfur', 'postgres', 'admin123', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: false,
});

// Function to test database connection
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('DB connection successful');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();  // Test the connection on app start

module.exports = sequelize;
