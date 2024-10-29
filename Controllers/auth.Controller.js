const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authController = {};

//login id,pw -> token generation
authController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      //Token
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const token = await user.generateToken();
        console.log(token);
        //return res.status(200).json({ status: "success", user, token });
        return res.status(200).json({ status: "success", user, token });
      }
    }

    throw new Error("Invalid email or password");
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

//token ->
authController.authenticate = (req, res, next) => {
  try {
    const tokenString = req.headers.authorization;

    if (!tokenString) throw new Error("Token not found");
    const token = tokenString.replace("Bearer ", "");
    console.log(token);
    jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
      if (error) {
        throw new Error("Token is invalid");
      } else {
        req.userId = payload._id;
      }
    });
    next();
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

authController.checkAdminPermission = async (req, res, next) => {
  try {
    //token
    const { userId } = req;
    const user = await User.findById(userId);
    if (user.level !== "admin") throw new Error("You are not admin");

    next();
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

module.exports = authController;
