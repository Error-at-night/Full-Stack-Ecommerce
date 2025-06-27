const User = require("../../models/User")
const CustomError = require("../../errors")
const { StatusCodes } = require("http-status-codes")
const { sendResetPasswordEmail, createHash } = require("../../utils")
const crypto = require('crypto');

const forgotPasswordController = async (req, res, next) => {
  const { email } = req.body

  try {

    if(!email) {
      throw new CustomError.BadRequestError("Please provide your email")
    }

    const user = await User.findOne({ email })

    if(user) {
      const origin = "http://localhost:5173"

      const passwordToken = crypto.randomBytes(70).toString("hex")

      const tenMinutes = 1000 * 60 * 10

      const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes)

      user.passwordToken = createHash(passwordToken)
      user.passwordTokenExpirationDate = passwordTokenExpirationDate

      await user.save()

      await sendResetPasswordEmail({ fullName: user.fullName, email: user.email, token: passwordToken, origin })
    }

    res.status(StatusCodes.OK).json({ message: "Please check your email for the reset password link" })

  } catch(error) {
    next(error)
  }
}

module.exports = forgotPasswordController