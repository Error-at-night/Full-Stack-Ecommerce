const { body } = require("express-validator")
const xss = require("xss")

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/

const sanitizeRegisterInput = (fields) => {
  return (req, res, next) => {
    if(!req.body) return next()  
    fields.forEach((field) => {
      if(req.body[field]) {
        req.body[field] = xss(req.body[field])
      }
    })
    next()
  }
}

const registerValidator = [
  body("fullName")
    .trim()
    .isLength({ min: 7 }).withMessage('Fullname must be at least 7 characters'),

  body("email").isEmail().withMessage("Please provide a valid email address").bail()
    .custom((value) => emailPattern.test(value))
    .withMessage("Please provide a valid email address")
    .bail()
    .custom((value) => {
      const firstPart = value.split("@")[0]
      return firstPart.length >= 5;
    })
    .withMessage("The name before '@' must be at least 5 characters long")
    .normalizeEmail(),

  body("password")
    .custom((value) => passwordPattern.test(value))
    .withMessage("Password must be at least 8 characters, include an uppercase letter, number, and symbol"),

  body("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match")
]

module.exports = { 
  registerValidator, 
  sanitizeRegisterInput
}