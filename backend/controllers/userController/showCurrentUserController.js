const CustomError = require("../../errors")
const { StatusCodes } = require("http-status-codes")
const User = require("../../models/User")

const showCurrentUserController = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.userId }).select("fullName role")

    if(!user) {
      throw new CustomError.NotFoundError("User not found")
    }

    res.status(StatusCodes.OK).json({ user })
  } catch(error) {
    next(error)
  }
}

module.exports = showCurrentUserController
