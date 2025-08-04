const mongoose = require("mongoose")
const Review = require("../../models/Review")
const { StatusCodes } = require("http-status-codes")

const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({})

    if(!reviews) {
      throw new CustomError.NotFoundError("No reviews")
    }

    res.status(StatusCodes.OK).json({ reviews })
    
  } catch(error) {
    next(error)
  }
}

module.exports = getAllReviews