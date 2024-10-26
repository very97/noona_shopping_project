const mongoose = require("mongoose");
const schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

require("dotenv").config();

const userSchema = new schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    level: { type: String, default: "customer" },
  },
  { timestamps: true }
); // timestamps 옵션 올바르게 설정

userSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.password;
  delete obj.__v;
  delete obj.updateAt;
  delete obj.createAt;
  return obj;
};

userSchema.methods.generationToken = async function () {
  const token = await jwt.sign({ id: this._id }, JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
