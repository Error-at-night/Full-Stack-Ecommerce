const User = require("../../models/User")
const CustomError = require("../../errors")
const { StatusCodes } = require("http-status-codes")

const verifyEmail = async (req, res, next) => {
  const { verificationCode } = req.body || {}

  try {
    const user = await User.findOne({ verificationCode })

    if(!user) {
      throw new CustomError.BadRequestError("Invalid or expired verification code")
    }

    if(user.isVerified) {
      throw new CustomError.BadRequestError("Email is already verified")
    }

    if(user.verificationCodeExpiresAt && user.verificationCodeExpiresAt < Date.now()) {
      throw new CustomError.BadRequestError("Invalid or expired verification code")
    }

    user.isVerified = true
    user.verified = Date.now()
    user.verificationCode = ""
    user.verificationCodeExpiresAt = null

    await user.save()

    res.status(StatusCodes.OK).json({ message: "Email verified" })
  } catch (error) {
    next(error)
  }
}

module.exports = verifyEmail