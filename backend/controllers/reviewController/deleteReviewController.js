const { StatusCodes } = require("http-status-codes")
const Review = require("../../models/Review")

const deleteReviewController = async (req, res, next) => {
  const { id: reviewId } = req.params
  try {
    if(!mongoose.Types.ObjectId.isValid(reviewId)) {
      throw new CustomError.BadRequestError("Something went wrong")
    }

    const review = await Review.findOne({ _id: reviewId })

    if(!review) {
      throw new CustomError.NotFoundError("Review not found")
    }

    checkPermissions(req.user, review.user)

    await review.deleteOne()

    res.status(StatusCodes.OK).json({ message: "Review deleted successfully" })

  } catch(error) {
    next(error)
  }
}

module.exports =   deleteReviewController