const { getProductsRepository } = require("../Repository/productRepository");

const getProducts = async(req, res, next) => {
  try {
    const { storeId, categoryId, description } = req.body;
    const products = await getProductsRepository({ storeId, categoryId, description })

    res.status(200).json(products);
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getProducts,
}