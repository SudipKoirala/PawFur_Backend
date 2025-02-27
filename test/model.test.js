const SequelizeMock = require("sequelize-mock");
const bcrypt = require("bcryptjs");

// Mock Sequelize instance
const dbMock = new SequelizeMock();

// Mock User model
const User = dbMock.define("User", {
  username: "testUser",
  email: "test@example.com",
  password: bcrypt.hashSync("password123", 10),
});

describe("User Model (CRUD)", () => {
  test("Should create a new user", async () => {
    const user = await User.create({
      username: "johnDoe",
      email: "john@example.com",
      password: bcrypt.hashSync("securePass", 10),
    });

    expect(user.username).toBe("johnDoe");
    expect(user.email).toBe("john@example.com");
  });

  test("Should update a user's username", async () => {
    let user = await User.create({
      username: "oldName",
      email: "update@example.com",
      password: bcrypt.hashSync("password123", 10),
    });

    user.username = "newName";
    await user.save();

    expect(user.username).toBe("newName");
  });

  test("Should delete a user", async () => {
    const user = await User.create({
      username: "deleteUser",
      email: "delete@example.com",
      password: bcrypt.hashSync("password123", 10),
    });

    const destroySpy = jest.spyOn(user, "destroy");
    await user.destroy();
    
    expect(destroySpy).toHaveBeenCalled();
  });
});
