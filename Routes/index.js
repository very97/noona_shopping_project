const express = require("express");
const router = express.Router();
const UserApi = require("./User.api");

router.use("/user", UserApi);

module.exports = router;
