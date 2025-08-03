const Product = require("../../models/Product")
const { StatusCodes } = require("http-status-codes")
const mongoose = require("mongoose")
const CustomError = require("../../errors")

const updateProductController = async (req, res, next) => {
  const { id: productId } = req.params
  try {
    if(!mongoose.Types.ObjectId.isValid(productId)) {
      throw new CustomError.BadRequestError("Something went wrong")
    }

    const product = await Product.findOneAndUpdate({ _id: productId }, req.body, { new: true, runValidators: true }) 

    if(!product) {
      throw new CustomError.NotFoundError("Product not found")
    }

    res.status(StatusCodes.OK).json({ message: "Product updated successfully", product })

  } catch(error) {
    next(error)
  }
}

module.exports = updateProductController