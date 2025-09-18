const { StatusCodes } = require("http-status-codes")
const Review = require("../../models/Review")

const updateReviewController = async (req, res, next) => {
  const { id: reviewId } = req.params
  const { title, rating, comment, } = req.body || {}

  try {
    const review = await Review.findOne({ _id: reviewId })

    if(!review) {
      throw new CustomError.NotFoundError("Review not found")
    }

    checkPermissions(req.user, review.user)

    review.rating = rating
    review.title = title
    review.comment = comment

    await review.save()

    res.status(StatusCodes.OK).json({ message: "Review updated successfully" })

  } catch(error) {
    next(error)
  }
}

module.exports = updateReviewController