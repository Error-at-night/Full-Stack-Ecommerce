const CustomError = require('../errors');

const chechPermissions = (requestUser, resourceUserId) => {
  if (requestUser.role === "admin") return
  if (requestUser.userId === resourceUserId.toString()) return
  throw new CustomError.UnauthorizedError("Not authorized to access this route")
}

module.exports = chechPermissions;
