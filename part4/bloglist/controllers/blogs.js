const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  response.status(200).json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const { body } = request;

  const users = await User.find();
  const firstUserId = users[0].id;
  const firstUser = await User.findById(firstUserId);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: firstUserId,
  });

  if (!body.title || !body.url) {
    return response.status(400).json({
      error: "title and/or url missing",
    });
  }

  const savedBlog = await blog.save();
  firstUser.blogs = firstUser.blogs.concat(savedBlog._id);
  await firstUser.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const { id } = request.params;
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
