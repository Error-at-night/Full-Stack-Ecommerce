const Product = require("../../models/Product")
const { StatusCodes } = require("http-status-codes")
const CustomError = require("../../errors")
const mongoose = require("mongoose")

const getSingleProductController = async (req, res, next) => {
  const { id: productId } = req.params
  try {
    if(!mongoose.Types.ObjectId.isValid(productId)) {
      throw new CustomError.BadRequestError("Something went wrong")
    }

    const product = await Product.findOne({ _id: productId }).populate("reviews")

    if(!product) {
      throw new CustomError.NotFoundError("Product not found")
    }

    res.status(StatusCodes.OK).json({ product })

  } catch(error) {
    next(error)
  }
}

module.exports = getSingleProductController