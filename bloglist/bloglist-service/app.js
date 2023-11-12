const express = require("express");
const cors = require("cors");

const connectToDB = require("./utils/connectToDB");
const blogsRouter = require("./controllers/blogs");
const loginRouter = require("./controllers/login");
const usersRouter = require("./controllers/users");
const middleware = require("./utils/middleware");
const testingRouter = require("./controllers/testing");

connectToDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use(middleware.requestLogger);
app.use("/api/login", loginRouter);
app.use(middleware.tokenExtractor);

app.use("/api/blogs", middleware.userExtractor, blogsRouter);
app.use("/api/users", usersRouter);
if (process.env.NODE_ENV === "test") app.use("/api/testing", testingRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
