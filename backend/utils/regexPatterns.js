const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/
const twoDecimalPlacePattern = /^\d+(\.\d{1,2})?$/
module.exports = {
  emailPattern,
  passwordPattern,
  twoDecimalPlacePattern
}