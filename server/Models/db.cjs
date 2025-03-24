const mongoose = require("mongoose");

const mongoURL = process.env.MONGO_URL || "mongodb://localhost:27017/ComfyWay";

mongoose
  .connect(mongoURL)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => {
    console.log("MongoDB connection error: ", err);
  });
