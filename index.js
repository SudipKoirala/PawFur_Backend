const express = require('express');
const sequelize = require('./database/db');
const setupAssociations = require('./relationships');  // For setting up model associations
const User = require('./models/user');  // Import models so Sequelize recognizes them
const Pet = require('./models/pet');
const Post = require('./models/post');

// Import route files
const userRoutes = require('./routes/users');
const petRoutes = require('./routes/pets');
const postRoutes = require('./routes/posts');

const app = express();
const PORT = process.env.PORT || 5000;

// Call the function to set up relationships
setupAssociations();

// Middleware to parse JSON requests
app.use(express.json());

// Mount the routes to the server
app.use('/api/users', userRoutes);  // Handle routes related to users
app.use('/api/pets', petRoutes);    // Handle routes related to pets
app.use('/api/posts', postRoutes);  // Handle routes related to posts

// Sync database
sequelize.sync({ force: false })  // Set force to true for development if you want to reset tables
    .then(() => {
        console.log('Database synced successfully!');
    })
    .catch((err) => {
        console.error('Failed to sync database:', err);
    });

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
