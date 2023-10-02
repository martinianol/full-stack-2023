const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  response.status(200).json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const { body, user } = request;

  if (!user) {
    return response.status(400).json({ error: "no user logged in" });
  }

  if (!body.title || !body.url) {
    return response.status(400).json({
      error: "title and/or url missing",
    });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id,
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const { id } = request.params;
  const { user } = request;

  const blogToDelete = await Blog.findById(id);

  if (blogToDelete.user?.toString() !== user.id) {
    return response
      .status(401)
      .json({ error: "User not authorized to delete this blog" });
  }

  const result = await Blog.findByIdAndRemove(id);
  result ? response.status(204).end() : response.status(404).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const { id } = request.params;
  const { body } = request;

  console.log("body", body);
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {
    new: true,
    runValidators: true,
    context: "query",
  });

  updatedBlog
    ? response.status(200).json(updatedBlog)
    : response.status(404).end();
});

module.exports = blogsRouter;
