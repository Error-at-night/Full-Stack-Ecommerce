const { StatusCodes } = require("http-status-codes");
const CustomError = require("../../errors");
const { cloudinary } = require("../../utils");
const streamifier = require("streamifier");
const fileType = require('file-type');

async function validateFile(buffer) {
  const type = await fileType.fromBuffer(buffer)
  if (!type || !["image/jpeg", "image/png", "image/webp"].includes(type.mime)) {
    throw new CustomError.BadRequestError("Invalid image file, only JPEG, JPG, PNG, and WebP are allowed")
  }
}

const uploadImageController = async (req, res, next) => {
  try {
    const file = req.file
    if(!file) {
      throw new CustomError.BadRequestError("No file uploaded")
    }

    await validateFile(file.buffer)

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder: "ecommerce_uploads" },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      )
      streamifier.createReadStream(file.buffer).pipe(stream)
    })

    const optimizedUrl = result.secure_url.replace("/upload/", "/upload/f_auto,q_auto/")

    res.status(StatusCodes.OK).json({
      message: "Image uploaded successfully",
      imageUrl: optimizedUrl,
      publicId: result.public_id
    })
  } catch (error) {
    next(error)
  }
}

module.exports = uploadImageController