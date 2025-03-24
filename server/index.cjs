const express = require("express");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter.cjs");
require("./Models/db.cjs");

const PORT = process.env.PORT || 5174;

app.use(bodyParser.json());
app.use(
  cors({
    origin: `${process.env.FRONTEND_URL || "http://localhost:5173"}`,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use("/auth", AuthRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
