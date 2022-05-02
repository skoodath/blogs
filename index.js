const http = require("http");
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blog");

const mongoUrl = process.env.MONGODB_URI;

mongoose
  .connect(mongoUrl)
  .then((response) => {
    console.log("MongoDB connection established");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
