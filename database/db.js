const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('pawfur_db', 'postgres', 'admin123', {
  host: 'localhost',
  dialect: 'postgres',
  
  
});

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); 
    console.log('Database synced successfully!');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

syncDatabase();

module.exports = sequelize;
