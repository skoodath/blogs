const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const MONGODB_URI = require("./utils/config").MONGODB_URI;
const blogRouter = require("./controllers/blog");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const tokenExtracter = require("./utils/middleware").tokenExtractor

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    logger.info("Connected to database");
  })
  .catch((error) => {
    logger.error("error connecting to database", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(tokenExtracter)
app.use("/api/login", loginRouter)
app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);

module.exports = app;
