const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");

const initialUsers = [
  {
    username: "monkey",
    name: "Ignacio Olaciregui",
    id: "6518b61e136e1a224cf44521",
  },
  {
    username: "mars",
    name: "Martiniano Leguizamon",
    id: "6518b630136e1a224cf44523",
  },
];

const nonExistingId = async () => {
  const user = new User({
    username: "tester",
    name: "Test Mosby",
    passwordHash: "thisIsNotReallyHashed",
    likes: 5,
  });
  await user.save();
  await user.deleteOne();

  return user._id.toString();
};

beforeEach(async () => {
  await User.deleteMany({});
  const userObjects = initialUsers.map((user) => new User(user));
  const promiseArray = userObjects.map((userObjects) => userObjects.save());
  await Promise.all(promiseArray);
});

describe("GET users", () => {
  test("all users are returned", async () => {
    const response = await api.get("/api/users");

    expect(response.body).toHaveLength(initialUsers.length);
  });
});

describe("create a new user", () => {
  test("it should not allow the creation of a new user if username or password are less than 3 characters", async () => {
    const userToCreateWithWrongData = {
      username: "ma",
      name: "Test Name",
      password: "123",
    };

    const response = await api.post("/api/users").expect(400);

    expect(response.body.error).toBeDefined();
    const users = await User.find({});

    expect(users.length).toBe(initialUsers.length);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
