const { createAccessTokenJWT, isTokenValid, attachCookiesToResponse } = require('./jwt');
const createTokenUser = require('./createTokenUser');
const sendVerificationEmail = require("./emails/authEmail/sendVerificationEmail");
const resendVerificationCodeEmail = require('./emails/authEmail/resendVerificationCodeEmail');
const sendResetPasswordEmail = require("./emails/authEmail/sendResetPasswordEmail")
const sendResetPasswordSuccessEmail = require("./emails/authEmail/sendResetPasswordSuccessEmail")
const createHash = require("./createHash")
const { emailPattern, passwordPattern } = require("./regexPatterns")
const checkPermissions = require("./checkPermissions")
const sendUpdateUserSuccessEmail = require("./emails/userEmail/sendUpdateUserSuccessEmail")
const sendUpdateUserPasswordSuccessEmail = require("./emails/userEmail/sendUpdateUserPasswordSucessEmail")

module.exports = {
  createAccessTokenJWT,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
  sendVerificationEmail,
  resendVerificationCodeEmail,
  sendResetPasswordEmail,
  sendResetPasswordSuccessEmail,
  createHash,
  emailPattern,
  passwordPattern,
  checkPermissions,
  sendUpdateUserSuccessEmail,
  sendUpdateUserPasswordSuccessEmail
};