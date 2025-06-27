const Token = require("../../models/Token")
const { StatusCodes } = require("http-status-codes")

const logout = async (req, res, next) => {
  try {
    await Token.findOneAndDelete({ user: req.user.userId })
    
    res.cookie("refreshToken", "logout", {
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    })
    
    res.status(StatusCodes.OK).json({ message: "Logout successful" })
  } catch(error) {
    next(error)
  }
}

module.exports = logout