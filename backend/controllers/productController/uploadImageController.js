const { cloudinary } = require("../../utils")
const { StatusCodes } = require("http-status-codes")
const CustomError = require("../../errors")

const uploadImageController = async (req, res, next) => {
  
  try {
    const file = req.file

    if (!file) {
      throw new CustomError.BadRequestError("No file uploaded")
    }

    const result = await cloudinary.uploader.upload(file.path, { folder: "ecommerce_uploads" })

    res.status(StatusCodes.OK).json({ message: "Upload successful", imageURL: result.secure_url })
 
  } catch (error) {
    next(error)
  }
}

module.exports = uploadImageController 