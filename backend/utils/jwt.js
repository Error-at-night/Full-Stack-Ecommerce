const jwt = require('jsonwebtoken');

const createAccessTokenJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" })
  return token
}

const createRefreshTokenJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" })
  return token
}

const isTokenValid = (token, secret) => jwt.verify(token, secret)

const attachCookiesToResponse = ({ res, user, refreshToken }) => {
  const accessTokenJWT = createAccessTokenJWT({ payload: { user } })
  const refreshTokenJWT = createRefreshTokenJWT({ payload: { user, refreshToken } })

  const thirtyMinutes = 1000 * 60 * 30;
  const oneDay = 1000 * 60 * 60 * 24

  res.cookie("accessToken", accessTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    sameSite: "Strict",
    expires: new Date(Date.now() + thirtyMinutes)
  })

  res.cookie("refreshToken", refreshTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    sameSite: "Strict",
    expires: new Date(Date.now() + oneDay)
  })
}

module.exports = {
  createAccessTokenJWT,
  isTokenValid,
  attachCookiesToResponse,
}