const express = require("express");
const router = express.Router();

const productsController = require("../Controllers/productsController");

router.post("/products", productsController.getProducts)

module.exports = router;