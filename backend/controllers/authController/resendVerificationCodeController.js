const User = require("../../models/User")
const CustomError = require("../../errors")
const { StatusCodes } = require("http-status-codes")
const { resendVerificationCodeEmail } = require("../../utils")

const resendVerificationCode = async (req, res, next) => {
  const { email } = req.body || {}

  try {

    if(!email) {
      throw new CustomError.BadRequestError("Please provide your email")
    }

    const user = await User.findOne({ email })

    if (!user) {
      throw new CustomError.NotFoundError("Email does not exist")
    }

    if(user.isVerified) {
      throw new CustomError.BadRequestError("Email is already verified")
    }

    const now = Date.now()

    if(user.lastVerificationEmailSentAt && (now - user.lastVerificationEmailSentAt.getTime() < 60 * 1000)) {
      throw new CustomError.TooManyRequestsError("A verification code has already been sent, please check your email")
    }

    if(user.verificationCodeExpiresAt && user.verificationCodeExpiresAt > now) {
      return res.status(StatusCodes.OK).json({ message: "A verification code was already sent recently, please check your email." })
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
    const verificationCodeExpiresAt = now + 5 * 60 * 1000

    user.verificationCode = verificationCode
    user.verificationCodeExpiresAt = verificationCodeExpiresAt
    user.lastVerificationEmailSentAt = new Date(now)

    await user.save()

    await resendVerificationCodeEmail({ email: user.email, fullName: user.fullName, verificationCode: user.verificationCode })

    res.status(StatusCodes.OK).json({ message: "Verification code resent, please check your email." })
  
  } catch(error) {
    next(error)
  }
}

module.exports = resendVerificationCode