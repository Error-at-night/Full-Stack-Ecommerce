const xss = require("xss")

const sanitizeInput = (fields) => {
  return (req, res, next) => {
    fields.forEach((field) => {
      if (req.body[field]) {
        req.body[field] = xss(req.body[field])
      }
    })
    next()
  }
}

module.exports = sanitizeInput