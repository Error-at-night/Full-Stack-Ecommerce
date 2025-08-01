const User = require("../../models/User")
const CustomError = require("../../errors")
const { StatusCodes } = require("http-status-codes")
const { createHash, sendResetPasswordSuccessEmail } = require("../../utils")

const resetPassword = async (req, res, next) => {
  const { token } = req.params
  const { password: rawPassword, confirmPassword: rawConfirmPassword } = req.body || {}

  const password = rawPassword?.trim()
  const confirmPassword = rawConfirmPassword?.trim()

  try {
    if (!password) {
      throw new CustomError.BadRequestError("Please provide a new password")
    }

    if(!confirmPassword) {
      throw new CustomError.BadRequestError("Please confirm your new password")
    }

    if(password !== confirmPassword) {
      throw new CustomError.BadRequestError("Passwords do not match")
    }

    const hashedToken = createHash(token)
    
    const user = await User.findOne({
      passwordToken: hashedToken,
      passwordTokenExpirationDate: { $gt: new Date() } 
    })

    if(!user) {
      throw new CustomError.BadRequestError("Invalid or expired link")
    }
    
    user.password = password
    user.passwordToken = null
    user.passwordTokenExpirationDate = null
    await user.save()

    await sendResetPasswordSuccessEmail({ fullName: user.fullName, email: user.email })

    res.status(StatusCodes.OK).json({ message: "Password reset successful" })

  } catch(error) {
    next(error)
  }
}

module.exports = resetPassword