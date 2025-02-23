// index.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./database/db');  // Import Sequelize configuration
const postRoutes = require('./routes/post');  // Import post routes
const userRoutes = require('./routes/users');  // Import user routes

dotenv.config();  // Load environment variables

const app = express();

app.use(cors());
app.use(express.json());  // Middleware to parse JSON request bodies

// Use routes for user and post endpoints
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);  // Post route for creating a new post
// index.js
app.use('/uploads', express.static('uploads'));
// Sync the database
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

  const PORT = 5000;
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
