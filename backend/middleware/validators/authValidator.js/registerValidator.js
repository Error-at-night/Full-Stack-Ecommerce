const { body } = require("express-validator")
const sanitizeInput = require("../sanitizeInput")

const registerValidator = [
  body("fullName")
    .trim()
    .isLength({ min: 7 }).withMessage('Fullname must be at least 7 characters')
    .escape(),
  body("email").isEmail().withMessage("Please provide a valid email").normalizeEmail(),
  body("password")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
  sanitizeInput(["fullName", "email"])
]

module.exports = registerValidator