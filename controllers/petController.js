// controllers/petController.js
const { Pet } = require('../models/pet');  // Assuming you have the Pet model imported

// Create a new pet
exports.createPet = async (req, res) => {
  try {
    const { name, breed, age } = req.body;
    const pet = await Pet.create({ name, breed, age });
    res.status(201).json(pet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all pets
exports.getAllPets = async (req, res) => {
  try {
    const pets = await Pet.findAll();
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get pet by ID
exports.getPetById = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await Pet.findByPk(id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update pet by ID
exports.updatePet = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, breed, age } = req.body;

    const pet = await Pet.findByPk(id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    await pet.update({ name, breed, age });
    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete pet by ID
exports.deletePet = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await Pet.findByPk(id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    await pet.destroy();
    res.status(200).json({ message: 'Pet deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
