const { StatusCodes } = require("http-status-codes")
const User = require("../../models/User")
const mongoose = require("mongoose")
const CustomError = require("../../errors")
const { checkPermissions } = require("../../utils")

const getSingleUserController = async (req, res, next) => {
  const { id: userId } = req.params
  
  try {
    if(!mongoose.Types.ObjectId.isValid(userId)) {
      throw new CustomError.BadRequestError("Something went wrong")
    }

    const user = await User.find({ _id: userId }).select("fullName email role")

    if(!user) {
      throw new CustomError.NotFoundError("User not found")
    }

    checkPermissions(req.user, user._id)
    
    res.status(StatusCodes.OK).json({ user })

  } catch(error) {
    next(error)
  }
}

module.exports = getSingleUserController