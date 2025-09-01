const express = require("express")
const router = express.Router()

const { 
  registerController, 
  loginController, 
  verifyEmailController, 
  resendVerificationCodeController, 
  logoutController, 
  forgotPasswordController, 
  resetPasswordController, 
  refreshTokenController, 
} = require("../controllers/authController")

const { 
  resendVerificationCodeRateLimit, 
  registerRateLimit, 
  verifyEmailRateLimit, 
  loginRateLimit, 
  forgotPasswordRateLimit, 
  resetPasswordRateLimit 
} = require("../middleware/rate-limit")

const { authenticateUser } = require("../middleware/authentication")

router.post("/register", registerRateLimit, registerController)
router.post("/verify-email", verifyEmailRateLimit, verifyEmailController)
router.post("/resend-verification-code", resendVerificationCodeRateLimit, resendVerificationCodeController)
router.post("/login", loginRateLimit, loginController)
router.post("/refresh-token", refreshTokenController)
router.delete("/logout", authenticateUser, logoutController)
router.post("/forgot-password", forgotPasswordRateLimit, forgotPasswordController)
router.post("/reset-password/:token", resetPasswordRateLimit, resetPasswordController)

module.exports = router