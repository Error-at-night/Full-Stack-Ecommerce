const CustomError = require('../errors');
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  try {
    let token;

    if (req.signedCookies?.accessToken) {
      token = req.signedCookies.accessToken
    } else if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1]
    }

    if (!token) {
      throw new CustomError.UnauthenticatedError("Authentication invalid")
    }

    const payload = isTokenValid(token, process.env.ACCESS_TOKEN_SECRET)

    req.user = payload.user
    next()
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication invalid")
  }
}

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if(!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError("Unauthorized to access this route")
    }
    next()
  }
}

module.exports =  {
  authenticateUser,
  authorizePermissions
}