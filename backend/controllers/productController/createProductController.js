const Product = require("../../models/Product")
const { StatusCodes } = require("http-status-codes")
const CustomError = require("../../errors")

const createProductController = async (req, res, next) => {
  const { name, description, image, size, price, stock, category, subCategory, brand, featured } = req.body || {}

  try {
    if(!name || !description || !image || !size || !price || !stock || !category || !subCategory || !brand || !featured) {
      throw new CustomError.BadRequestError("All fields are required")
    }

    const product = await Product.create({ 
      user: req.user.userId,
      name, 
      description,
      image,
      size,
      price,
      stock,
      category,
      subCategory,
      brand,
      featured
    })

    res.status(StatusCodes.CREATED).json({ message: "You have successfully created a product", product })
    
  } catch(error) {
    next(error)
  }
}

module.exports = createProductController