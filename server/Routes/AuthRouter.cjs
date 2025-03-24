const { signup, login } = require("../Controllers/AuthController.cjs");
const {
  signupValidation,
  loginValidation,
} = require("../Middlewares/AuthValidation.cjs");
const UserModel = require("../Models/User.cjs");

const router = require("express").Router();

router.post("/login", loginValidation, login);

router.post("/signup", signupValidation, signup);

module.exports = router;
