const Review = require("../../models/Review")
const { StatusCodes } = require("http-status-codes")
const CustomError = require("../../errors")
const mongoose = require("mongoose")

const getSingleReviewController = async (req, res, next) => {
  const { id: reviewId } = req.params

  try {
    if(!mongoose.Types.ObjectId.isValid(reviewId)) {
      throw new CustomError.BadRequestError("Something went wrong")
    }

    const review = await Review.findOne({ _id: reviewId })

    if(!review) {
      throw new CustomError.NotFoundError("Review not found")
    }

    res.status(StatusCodes.OK).json({ review })
  } catch(error) {
    next(error)
  }
}

module.exports = getSingleReviewController