const mongoose = require("mongoose");

const logger = require("./logger");
const config = require("./config");
const { MONGODB_URI } = config;

const connectToDB = () => mongoose
  .set("strictQuery", false)
  .connect(MONGODB_URI)
  .then((result) => {
    if (result) logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

module.exports = connectToDB