const express = require("express");
const UserController = require("./controllers/user.Controller");
const router = express.Router();

router.post("/", UserController.createUser);

// 검색해볼것
module.exports = router;
