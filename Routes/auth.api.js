const express = require("express");
const authController = require("../Controllers/auth.Controller");

const router = express.Router();

router.post("/login", authController.loginWithEmail);

module.exports = router;
