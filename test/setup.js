// Sync the models with the database
const syncDatabase = async () => {
    try {
      await sequelize.sync({ alter: true });
      console.log('Database synced successfully!');
    } catch (error) {
      console.error('Error syncing database:', error);
    }
  };
  
  beforeAll(async () => {
    // Mock console.log and console.error to suppress output during tests
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  
    // Ensure syncDatabase completes before tests
    await syncDatabase();
  });
  
  afterAll(() => {
    // Restore original console methods after tests
    console.log.mockRestore();
    console.error.mockRestore();
  });
  