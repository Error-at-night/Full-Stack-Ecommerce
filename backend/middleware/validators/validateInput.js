const { validationResult } = require("express-validator")
const { StatusCodes } = require("http-status-codes")

const validateInputs = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: errors.array() })
  }
  next()
}

module.exports = validateInputs