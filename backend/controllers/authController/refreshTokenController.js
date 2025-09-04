const Token = require("../../models/Token")
const CustomError = require("../../errors")
const { StatusCodes } = require("http-status-codes")
const { attachCookiesToResponse, createHash, createAccessTokenJWT, isTokenValid } = require("../../utils")
const crypto = require('crypto');

const refreshToken = async (req, res, next) => {
  const { refreshToken } = req.signedCookies

  try {
    if (!refreshToken) {
      throw new CustomError.UnauthenticatedError("Authentication invalid")
    }

    const payload = isTokenValid(refreshToken, process.env.REFRESH_TOKEN_SECRET)

    const plainRefreshToken = payload.refreshToken

    if(!plainRefreshToken) {
      throw new CustomError.UnauthenticatedError("Authentication invalid")
    }

    const hashedRefreshToken = createHash(plainRefreshToken)

    const existingToken = await Token.findOne({
      refreshToken: hashedRefreshToken,
      user: payload.user.userId,
    })

    if (!existingToken || !existingToken.isValid) {
      throw new CustomError.UnauthenticatedError("Authentication invalid")
    }

    await existingToken.deleteOne()

    const newRefreshToken = crypto.randomBytes(40).toString("hex")
    const newHashedRefreshToken = createHash(newRefreshToken)

    await Token.create({
      user: payload.user.userId,
      refreshToken: newHashedRefreshToken,
      userAgent: req.headers["user-agent"],
      ip: req.ip,
    })

    attachCookiesToResponse({ res, user: payload.user, refreshToken: newRefreshToken })

    res.sendStatus(StatusCodes.OK)
  } catch (error) {
    next(error)
  }
}

module.exports = refreshToken