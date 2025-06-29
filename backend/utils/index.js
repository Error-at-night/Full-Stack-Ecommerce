const { createAccessTokenJWT, isTokenValid, attachCookiesToResponse } = require('./jwt');
const createTokenUser = require('./createTokenUser');
const sendVerificationEmail = require("./emails/authEmail/sendVerificationEmail");
const resendVerificationCodeEmail = require('./emails/authEmail/resendVerificationCodeEmail');
const sendResetPasswordEmail = require("./emails/authEmail/sendResetPasswordEmail")
const resetPasswordSuccessEmail = require("./emails/authEmail/resetPasswordSuccessEmail")
const createHash = require("./createHash")
const { fullNamePattern, emailPattern, passwordPattern } = require("./regexPatterns")

module.exports = {
  createAccessTokenJWT,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
  sendVerificationEmail,
  resendVerificationCodeEmail,
  sendResetPasswordEmail,
  resetPasswordSuccessEmail,
  createHash,
  fullNamePattern,
  emailPattern,
  passwordPattern
};
