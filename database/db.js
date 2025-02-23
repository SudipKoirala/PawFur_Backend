const { Sequelize } = require('sequelize');


// Configure database connection
const sequelize = new Sequelize('pawfur_db', 'postgres', 'admin123', {
  host: 'localhost',
  dialect: 'postgres',
});

// Sync the models with the database
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); // Sync models and create tables
    console.log('Database synced successfully!');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

syncDatabase();

module.exports = sequelize;
