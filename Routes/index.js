const express = require("express");
const router = express.Router();
const UserApi = require("./User.api");
const authApi = require("./auth.api");

router.use("/user", UserApi);
router.use("/auth", authApi);

module.exports = router;
