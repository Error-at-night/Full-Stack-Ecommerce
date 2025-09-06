const multer = require("multer")
const path = require("path")

const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = allowedTypes.test(file.mimetype)

  if (extname && mimetype) {
    cb(null, true)
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "Only images are allowed"))
  }
}

const upload = multer({ storage, fileFilter, limits: { fileSize: 1 * 1024 * 1024 }})

module.exports = upload