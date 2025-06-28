const fullNamePattern = /^[A-Za-z\s]+$/
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/

module.exports = {
  fullNamePattern,
  emailPattern,
  passwordPattern
}