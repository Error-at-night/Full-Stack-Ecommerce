const createProductController = require("./createProductController")
const getAllProductsController = require("./getAllProductsController")
const getSingleProductController = require("./getSingleProductController")
const updateProductController = require("./updateProductController")
const deleteProductController = require("./deleteProductController")
const uploadImageController = require("./uploadImageController")

module.exports = {
  createProductController,
  getAllProductsController,
  getSingleProductController,
  updateProductController,
  deleteProductController,
  uploadImageController
}