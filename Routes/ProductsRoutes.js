const express = require("express");
const router = express.Router();

const productsController = require("../Controllers/productsController");

router.get("/products", productsController.getProducts)

module.exports = router;