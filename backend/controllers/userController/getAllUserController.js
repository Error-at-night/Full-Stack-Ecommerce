const { StatusCodes } = require("http-status-codes")
const User = require("../../models/User")

const getAllUserController = async (req, res, next) => {
  const { search, page = 1, limit = 50 } = req.query

  const queryObject = {}

  try {
    if(search) {
      queryObject.$or = [{ fullName: { $regex: search, $options: "i" } }]
    }

    let result = User.find({ role: "user", ...queryObject }).select("fullName email role")

    result = result.sort("-createdAt")

    const skip = (Number(page) - 1) * Number(limit)
    result = result.skip(skip).limit(Number(limit))
    
    const users = await result
    const total = await User.countDocuments(queryObject)
    
    res.status(StatusCodes.OK).json({ users, total, page: Number(page), limit: Number(limit) })

  } catch(error) {
    next(error)
  }
}

module.exports = getAllUserController