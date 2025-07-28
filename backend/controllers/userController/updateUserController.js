const { StatusCodes } = require("http-status-codes")
const User = require("../../models/User")
const CustomError = require("../../errors")
const { createTokenUser, createAccessTokenJWT, attachCookiesToResponse, createHash } = require("../../utils")
const crypto = require("crypto")
const Token = require("../../models/Token")

const updateUserController = async (req, res, next) => {
  const { fullName: rawFullName, email: rawEmail } = req.body || {}

  const fullName = rawFullName?.trim()
  const email = rawEmail?.trim()
  
  try {
    if(!fullName || !email){
      throw new CustomError.BadRequestError("Please provide your email and fullname")
    }

    const user = await User.findOne({ _id: req.user.userId })

    user.fullName = fullName
    user.email = email

    await user.save()

    const tokenUser = createTokenUser(user)

    const refreshToken = crypto.randomBytes(40).toString("hex")
    const hashedRefreshToken = createHash(refreshToken)
    
    await Token.findOneAndDelete({ user: user._id })
    
    await Token.create({
      refreshToken: hashedRefreshToken,
      userAgent: req.headers["user-agent"],
      ip: req.ip,
      user: user._id,
    })

    const accessTokenJWT = createAccessTokenJWT({ payload: { user: tokenUser } })

    attachCookiesToResponse({ res, user: tokenUser, refreshToken })
    
    res.status(StatusCodes.OK).json({ message: "You have successfully updated your name and email", user: tokenUser, accessToken: accessTokenJWT })

  } catch(error) {
    next(error)
  }
}

module.exports = updateUserController