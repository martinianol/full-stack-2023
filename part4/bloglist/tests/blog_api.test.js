const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "This is the MAIN title",
    author: "Mars",
    url: "www.erco.com",
    likes: 10,
  },
  {
    title: "This is the second blog",
    author: "Mars",
    url: "www.seondblog.com",
    likes: 5,
  },
  {
    title: "This is the third blog",
    author: "Wanda",
    url: "www.thirdblog.com",
    likes: 3,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blogObject) => blogObject.save());
  await Promise.all(promiseArray);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(3);
});

test("verifies that the unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");
  const returnedBlogs = response.body;
  returnedBlogs.forEach((blog) => {
    expect(blog).toHaveProperty("id");
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
