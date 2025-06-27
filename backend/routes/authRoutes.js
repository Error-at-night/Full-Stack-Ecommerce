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

const { registerValidator, sanitizeRegisterInput } = require("../middleware/validators/authValidator")

const validateInputs = require("../middleware/validators/validateInput")

router.post("/register", registerRateLimit, registerValidator, validateInputs, sanitizeRegisterInput(["fullName, email"]), registerController)
router.post("/verify-email", verifyEmailRateLimit, verifyEmailController)
router.post("/resend-verification-code", resendVerificationCodeRateLimit, resendVerificationCodeController)
router.post("/login", loginRateLimit, loginController)
router.get("/refresh-token", refreshTokenController)
router.delete("/logout", authenticateUser, logoutController)
router.post("/forgot-password", forgotPasswordRateLimit, forgotPasswordController)
router.post("/reset-password/:token", resetPasswordRateLimit, resetPasswordController)

module.exports = router