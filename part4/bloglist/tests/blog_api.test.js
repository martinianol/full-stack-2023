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

  expect(response.body).toHaveLength(initialBlogs.length);
});

test("verifies that the unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");
  const returnedBlogs = response.body;
  returnedBlogs.forEach((blog) => {
    expect(blog).toHaveProperty("id");
  });
});

test("verifies an HTTP POST request successfully creates a new blog post", async () => {
  const blogContent = {
    title: "This is the NEW blog title",
    author: "Mars",
    url: "www.newblog.com",
    likes: 0,
  };

  await api.post("/api/blogs").send(blogContent)

  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(response.body).toEqual(
    expect.arrayContaining([expect.objectContaining(blogContent)])
  );
});

test("verifies that if the likes property is missing, it will default to the value 0.", async () => {
  const blogContent = {
    title: "This is the NEW blog title",
    author: "Mars",
    url: "www.newblog.com",
  };

  const createdBlog = await api.post("/api/blogs").send(blogContent)

  expect(createdBlog.body.likes).toBe(0)

})

afterAll(async () => {
  await mongoose.connection.close();
});
