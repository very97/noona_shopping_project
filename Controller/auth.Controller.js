const User = require("../Model/User");
const bcrypt = require("bcryptjs");

const authController = {};

authController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      //Token
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        //
        const token = await User();

        return res.status(200).json({ status: "success", user, token });
      }
    }

    throw new Error("Invalid email or password");
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

module.exports = authController;
