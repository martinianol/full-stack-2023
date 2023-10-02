const mongoose = require("mongoose");

const logger = require("./logger");
const config = require("./config");
const { MONGODB_URI } = config;

const connectToDB = async () => {
  try {
    const result = await mongoose
      .set("strictQuery", false)
      .connect(MONGODB_URI);

    if (result) logger.info("connected to MongoDB");
  } catch (error) {
    logger.error("error connecting to MongoDB:", error.message);
  }
};

module.exports = connectToDB;
