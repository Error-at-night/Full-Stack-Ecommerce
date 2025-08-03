const Product = require("../../models/Product")
const { StatusCodes } = require("http-status-codes")
const mongoose = require("mongoose");
const CustomError = require("../../errors");

const deleteProductController = async (req, res, next) => {
  const { id: productId } = req.params

  if(!mongoose.Types.ObjectId.isValid(productId)) {
    throw new CustomError.BadRequestError("Something went wrong")
  }
  
  const product = await Product.findOne({ _id: productId })

  if(!product) {
    throw new CustomError.NotFoundError("Product not found")
  }

  await product.remove()

  res.status(StatusCodes.OK).json({ message: "Product deleted successfully" })
}

module.exports = deleteProductController