const express = require("express");
const router = express.Router();
const UserApi = require("./User.api");
const authApi = require("./auth.api");
const ProductApi = require("./Product.api");

router.use("/user", UserApi);
router.use("/auth", authApi);
router.use("/product", ProductApi);

module.exports = router;
