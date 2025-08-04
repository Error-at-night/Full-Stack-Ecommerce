const User = require("../../models/User")
const CustomError = require("../../errors")
const { StatusCodes } = require("http-status-codes")
const { sendUpdateUserPasswordSuccessEmail } = require("../../utils")

const updateUserPasswordController = async (req, res, next) => {
  const { currentPassword: rawCurrentPassword, newPassword: rawNewPassword, newConfirmPassword: rawNewConfirmPassword } = req.body || {}

  const currentPassword = rawCurrentPassword?.trim()
  const newPassword = rawNewPassword?.trim()
  const newConfirmPassword = rawNewConfirmPassword?.trim() 

  try {
    if(!currentPassword || !newPassword || !newConfirmPassword) {
    throw new CustomError.BadRequestError("All fields are required")
    }

    if(newPassword !== newConfirmPassword) {
      throw new CustomError.BadRequestError("New password and confirm password does not match")
    }

    const user = await User.findOne({ _id: req.user.userId })

    const isCurrentPasswordCorrect = await user.comparePassword(currentPassword)

    if(!isCurrentPasswordCorrect) {
      throw new CustomError.BadRequestError("Incorrect current password")
    }

    user.password = newPassword

    await user.save()

    await sendUpdateUserPasswordSuccessEmail({ fullName: user.fullName, email: user.email })

    res.status(StatusCodes.OK).json({ message: "You have successfully updated your password" })

  } catch(error) {
    next(error)
  }
}

module.exports = updateUserPasswordController