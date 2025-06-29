const User = require("../../models/User")
const Token = require("../../models/Token")
const CustomError = require("../../errors")
const { StatusCodes } = require("http-status-codes")
const { attachCookiesToResponse, createTokenUser, createHash, createAccessTokenJWT } = require("../../utils")
const crypto = require('crypto');

const login = async (req, res, next) => {
  const { email: rawEmail, password: rawPassword } = req.body || {}

  const email = rawEmail?.trim()
  const password = rawPassword?.trim()
  
  try {
    if (!email || !password) {
      throw new CustomError.BadRequestError("Please provide your email and password")
    }

    const user = await User.findOne({ email })

    if (!user) {
      throw new CustomError.BadRequestError("Invalid email or password")
    }

    const isPasswordCorrect = await user.comparePassword(password)

    if (!isPasswordCorrect) {
      throw new CustomError.BadRequestError("Invalid email or password")
    }

    if (!user.isVerified) {
      throw new CustomError.UnauthorizedError("Please verify your email")
    }

    const tokenUser = createTokenUser(user)

    const accessTokenJWT = createAccessTokenJWT({ payload: { user: tokenUser }})

    const refreshToken = crypto.randomBytes(40).toString("hex")
    const hashedRefreshToken = createHash(refreshToken)

    await Token.findOneAndDelete({ user: user._id })

    await Token.create({
      refreshToken: hashedRefreshToken,
      userAgent: req.headers["user-agent"],
      ip: req.ip,
      user: user._id,
    })

    attachCookiesToResponse({ res, user: tokenUser, refreshToken })

    res.status(StatusCodes.OK).json({ message: "Login successful", user: tokenUser, accessToken: accessTokenJWT })
  } catch (error) {
    next(error)
  }
}

module.exports = login