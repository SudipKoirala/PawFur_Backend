const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { signup } = require('../controllers/userController'); // Assuming the path to your controller

// Mock Sequelize's User model
jest.mock('../models/user', () => {
  return {
    User: {
      findOne: jest.fn(),
      create: jest.fn(),
    },
  };
});

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('mocked_token'),
}));

describe('User Controller - Signup', () => {
  test('Should successfully register a new user and return a token', async () => {
    const req = {
      body: {
        username: 'johnDoe',
        email: 'john@example.com',
        password: 'securePass',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the findOne method to return null (no user found)
    const mockCreate = jest.fn().mockResolvedValue({
      id: 1,
      username: 'johnDoe',
      email: 'john@example.com',
      password: bcrypt.hashSync('securePass', 10),
    });
    require('../models/user').User.create = mockCreate;

    await signup(req, res);

    // Check if status and response are as expected
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'User registered successfully',
      token: 'mocked_token', // Mocked token
    });
  });

  test('Should return an error if user already exists', async () => {
    const req = {
      body: {
        username: 'johnDoe',
        email: 'test@example.com', // This email already exists in the mock DB
        password: 'securePass',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the findOne method to simulate an existing user
    require('../models/user').User.findOne = jest.fn().mockResolvedValue({
      id: 1,
      username: 'testUser',
      email: 'test@example.com',
      password: bcrypt.hashSync('password123', 10),
    });

    await signup(req, res);

    // Check if status and response are as expected for already existing user
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'User already exists' });
  });

  

});
