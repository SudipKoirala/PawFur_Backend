// Import models
const User = require('./models/user');
const Pet = require('./models/pet');  // Import any other models you have

// Define the setupAssociations function
function setupAssociations() {
    // Example: A User can have many Pets
    User.hasMany(Pet, { foreignKey: 'userId' });  // Set up the foreign key relationship
    Pet.belongsTo(User, { foreignKey: 'userId' });  // The reverse relationship: A Pet belongs to a User
}

// Call the function to set up associations
setupAssociations();

// Export the setupAssociations function if needed elsewhere
module.exports = setupAssociations;
