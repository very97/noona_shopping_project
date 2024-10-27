const express = require("express");
const UserController = require("../Controllers/user.Controller");
const authController = require("../Controllers/auth.Controller");

const router = express.Router();

router.post("/", UserController.createUser);
router.get("/me", authController.authenticate, UserController.getUser);

// 검색해볼것
module.exports = router;
