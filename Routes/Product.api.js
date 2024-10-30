const express = require("express");
const router = express.Router();
const productController = require("../Controllers/product.Controller");
const authController = require("../Controllers/auth.Controller");

// admin 인지 아닌지 확인하는 작업
router.post(
  "/",
  authController.authenticate,
  authController.checkAdminPermission,
  productController.createProduct
);

router.get("/", productController.getProducts);
module.exports = router;
