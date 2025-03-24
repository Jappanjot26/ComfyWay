const UserModel = require("../Models/User.cjs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(403)
        .json({ message: "email or password is wrong", success: false });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res
        .status(403)
        .json({ message: "email or password is wrong", success: false });
    }

    // const jwtToken = jwt.sign(
    //   { email: user.email, _id: user._id },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "24h" }
    // );

    res.status(200).json({
      message: "Login Successfully",
      success: true,
      email,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "User already exist", success: false });
    }
    const userModel = new UserModel({ email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res.status(201).json({ message: "Signup Successfully", success: true });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err.message,
    });
  }
};
module.exports = { signup, login };
