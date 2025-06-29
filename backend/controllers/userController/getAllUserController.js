const { StatusCodes } = require("http-status-codes")
const User = require("../../models/User")

const getAllUserController = async (req, res, next) => {
  try {
    const users = await User.find({ role: "user" }).select("fullName email role")
    
    res.status(StatusCodes.OK).json({ users })

  } catch(error) {
    next(error)
  }
}

module.exports = getAllUserController