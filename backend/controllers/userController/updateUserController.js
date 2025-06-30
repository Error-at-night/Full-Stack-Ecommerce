const { StatusCodes } = require("http-status-codes")
const User = require("../../models/User")
const CustomError = require("../../errors")
const { createTokenUser, createAccessTokenJWT, attachCookiesToResponse } = require("../../utils")

const updateUserController = async (req, res, next) => {
  const { fullName: rawFullName, email: rawEmail } = req.body || {}

  const fullName = rawFullName?.trim()
  const email = rawEmail?.trim()
  
  try {
    if(!fullName || !email){
      throw new CustomError.BadRequestError("Please provide your email and fullname")
    }

    const user = await User.find({ _id: req.user.userId })

    user.fullName = fullName

    await user.save()

    const tokenUser = createTokenUser(user)

    const accessTokenJWT = createAccessTokenJWT({ payload: { user: tokenUser } })

    attachCookiesToResponse({ res, user: tokenUser })
    
    res.status(StatusCodes.OK).json({ message: "Name updated successfully", user: tokenUser, accessToken: accessTokenJWT })

  } catch(error) {
    next(error)
  }
}

module.exports = updateUserController