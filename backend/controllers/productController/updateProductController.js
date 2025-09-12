const Product = require("../../models/Product")
const { StatusCodes } = require("http-status-codes")
const mongoose = require("mongoose")
const CustomError = require("../../errors")
const { cloudinary } = require("../../utils");

const updateProductController = async (req, res, next) => {
  const { id: productId } = req.params

  const { name, description, image, imageId, size, price, stock, category, subCategory, brand, featured } = req.body || {}

  try {
    if(!mongoose.Types.ObjectId.isValid(productId)) {
      throw new CustomError.BadRequestError("Something went wrong")
    }

    const product = await Product.findOne({ _id: productId })

    if(!product) {
      throw new CustomError.NotFoundError("Product not found")
    }

    if(product.imageId && imageId && product.imageId !== imageId) {
      await cloudinary.uploader.destroy(product.imageId)
    }

    product.name = name ?? product.name
    product.description = description ?? product.description
    product.image = image ?? product.image
    product.imageId = imageId ?? product.imageId
    product.size = size ?? product.size
    product.price = price ?? product.price
    product.stock = stock ?? product.stock
    product.category = category ?? product.category
    product.subCategory = subCategory ?? product.subCategory
    product.brand = brand ?? product.brand
    product.featured = featured ?? product.featured

    await product.save()

    res.status(StatusCodes.OK).json({ message: "Product updated successfully", product })

  } catch(error) {
    next(error)
  }
}

module.exports = updateProductController