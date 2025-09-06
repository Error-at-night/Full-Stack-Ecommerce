const { StatusCodes } = require("http-status-codes");
const multer = require("multer");

function multerErrorHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    let message = "Something went wrong while uploading your file, please try again"

    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        message = "Your image is too large, maximum allowed size is 1MB"
        break;
      case "LIMIT_FILE_COUNT":
        message = "You tried to upload too many image at once, please upload fewer images"
        break;
      case "LIMIT_FIELD_KEY":
        message = "One of the field names is too long, please shorten it"
        break;
      case "LIMIT_FIELD_VALUE":
        message = "One of the field values is too long, please reduce its length"
        break;
      case "LIMIT_FIELD_COUNT":
        message = "Too many form fields were sent, please remove unnecessary fields"
        break;
      case "LIMIT_UNEXPECTED_FILE":
        message = "Invalid file type, only images (JPEG, JPG, PNG, WEBP) are allowed"
        break;
      default:
        message = err.message || "Upload failed due to an unexpected error"
        break;
    }

    return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message })
  }

  next(err)
}

module.exports = multerErrorHandler