const { body } = require("express-validator")
const xss = require("xss")

const sanitizeInput = (fields) => {
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
  body("email").isEmail().withMessage("Please provide a valid email").normalizeEmail(),
  body("password")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
  sanitizeInput(["fullName", "email"])
]

module.exports = registerValidator