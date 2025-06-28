const CustomError = require('../errors');
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization

  try {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new CustomError.UnauthenticatedError("Authentication invalid")
    }

    const token = authHeader.split(" ")[1]
    const payload = isTokenValid(token, process.env.ACCESS_TOKEN_SECRET)

    req.user = payload.user
    next()
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid")
  }
}

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if(!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      )
    }
    next()
  }
}

module.exports =  {
  authenticateUser,
  authorizePermissions
}