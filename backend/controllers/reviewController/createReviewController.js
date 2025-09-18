const Review = require("../../models/Review")
const Product = require("../../models/Product")
const { StatusCodes } = require("http-status-codes")
const CustomError = require("../../errors")

const createReviewController = async (req, res, next) => {
  const { title, comment, rating, product: productId } = req.body || {}

  try {
    if(!title || !comment || !rating) {
      throw new CustomError.BadRequestError("All fields are required")
    }

    if (rating < 1 || rating > 5) {
      throw new CustomError.BadRequestError("Rating must be between 1 and 5")
    }
    
    const isProductValid = await Product.findOne({ _id: productId })

    if(!isProductValid) {
      throw new CustomError.NotFoundError("Product not found")
    }

    const reviewAlreadyExists = await Review.findOne({ product: productId, user: req.user.userId })

    if(reviewAlreadyExists) {
      throw new CustomError.BadRequestError("You already submitted a review for this product")
    }

    const review = await Review.create({
      title,
      comment,
      rating,
      user: req.user.userId,
      product: productId
    })

    res.status(StatusCodes.CREATED).json({ message: "Review submitted", review })

  } catch(error) {
    next(error)
  }
}

module.exports = createReviewController