const Product = require("../../models/Product")
const Review = require("../../models/Review")
const { StatusCodes } = require("http-status-codes")
const mongoose = require("mongoose");
const CustomError = require("../../errors");
const { cloudinary } = require("../../utils");

const deleteProductController = async (req, res, next) => {
  const { id: productId } = req.params

  try {
    if(!mongoose.Types.ObjectId.isValid(productId)) {
      throw new CustomError.BadRequestError("Something went wrong")
    }
    
    const product = await Product.findOne({ _id: productId })

    if(!product) {
      throw new CustomError.NotFoundError("Product not found")
    }

    if(product.imageId) {
      await cloudinary.uploader.destroy(product.imageId);
    }

    await Review.deleteMany({ product: product._id })

    await product.deleteOne()

    res.status(StatusCodes.OK).json({ message: "Product deleted successfully" })
    
  } catch(error) {
    next(error)
  }
}

module.exports = deleteProductController