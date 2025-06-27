const registerController = require("./registerController")
const loginController = require("./loginController")
const logoutController = require("./logoutController")
const refreshTokenController = require("./refreshTokenController")
const verifyEmailController = require("./verifyEmailController")
const forgotPasswordController = require("./forgotPasswordController")
const resendVerificationCodeController = require("./resendVerificationCodeController")
const resetPasswordController = require("./resetPasswordController")

module.exports = {
  registerController,
  loginController,
  logoutController,
  verifyEmailController,
  forgotPasswordController,
  refreshTokenController,
  resendVerificationCodeController,
  resetPasswordController
}