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

const nonExistingId = async () => {
  const blog = new Blog({
    title: "This is will be removed",
    author: "Mars",
    url: "www.seondblog.com",
    likes: 5,
  });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

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

  await api.post("/api/blogs").send(blogContent);

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

  const createdBlog = await api.post("/api/blogs").send(blogContent);

  expect(createdBlog.body.likes).toBe(0);
});

test("verifies that if the title property is missing, the backend responds with status code 400.", async () => {
  const blogWithMissingContent = {
    author: "Mars",
    url: "www.newblog.com",
    likes: 5,
  };

  const response = await api.post("/api/blogs").send(blogWithMissingContent);
  expect(response.statusCode).toBe(400);
});

test("verifies that if the url property is missing, the backend responds with status code 400.", async () => {
  const blogWithMissingContent = {
    author: "Mars",
    title: "The url is missing",
    likes: 5,
  };

  const response = await api.post("/api/blogs").send(blogWithMissingContent);
  expect(response.statusCode).toBe(400);
});

describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const notesAtStart = await Blog.find({});
    const noteToDelete = notesAtStart[0];
    await api.delete(`/api/blogs/${noteToDelete.id}`).expect(204);
  });

  test("succeeds with status code 404 if id is valid and the blog is not found", async () => {
    const validNonExistingId = await nonExistingId();
    await api.delete(`/api/blogs/${validNonExistingId}`).expect(404);
  });
});

describe("update of a blog", () => {
  test("succeeds with status code 200 and the correct number of likes", async () => {
    const blogsAtStart = await api.get("/api/blogs");
    const blogToUpdate = blogsAtStart.body[0];
    blogToUpdate.likes = 100;

    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)

    expect(updatedBlog.body.likes).toBe(100);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
