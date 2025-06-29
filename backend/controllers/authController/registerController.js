const User = require("../../models/User")
const CustomError = require("../../errors")
const { StatusCodes } = require("http-status-codes")
const { sendVerificationEmail } = require("../../utils")

const register = async (req, res, next) => {
  const { fullName: rawFullName, email: rawEmail, password: rawPassword, confirmPassword: rawConfirmPassword } = req.body || {}

  const fullName = rawFullName?.trim()
  const email = rawEmail?.trim()
  const password = rawPassword?.trim()
  const confirmPassword = rawConfirmPassword?.trim()

  try {

    if(!fullName || !email || !password || !confirmPassword) {
      throw new CustomError.BadRequestError("All fields are required")
    }

    if(password !== confirmPassword) {
      throw new CustomError.BadRequestError("Passwords do not match")
    }

    const emailAlreadyExists = await User.findOne({ email })

    if(emailAlreadyExists) {
      throw new CustomError.BadRequestError("Email already exists")
    }

    const role = email === process.env.ADMIN_EMAIL ? "admin" : "user"

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
    const verificationCodeExpiresAt = Date.now() + 5 * 60 * 1000 

    const user = await User.create({ fullName, email, password, role, verificationCode, verificationCodeExpiresAt })
    
    await sendVerificationEmail({ email: user.email, fullName: user.fullName, verificationCode: user.verificationCode })

    res.status(StatusCodes.CREATED).json({ message: "Please verify your email" })

  } catch(error) {
    next(error)
  }
}

module.exports = register