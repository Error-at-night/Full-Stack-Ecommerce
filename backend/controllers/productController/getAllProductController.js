const Product = require("../../models/Product")
const { StatusCodes } = require("http-status-codes")

const getAllProductController = async (req, res, next) => {
  const { category, brand, price, color, sort, page = 1, limit = 10 } = req.query

  const queryObject = {}

  try {
    if(category) {
      queryObject.category = category
    }

    if(brand) {
      queryObject.brand = brand
    }

    if(price) {
      queryObject.price = price
    }

    if(color) {
      queryObject.color = color
    }

    let result = Product.find(queryObject)

    if(sort) {
      const sortList = sort.split(",").join(" ")
      result = result.sort(sortList)
    } else {
      result = result.sort("-createdAt")
    }

    // const page = Number(req.query.page) || 1
    // const limit = Number(req.query.limit) || 10
    // const skip = (page - 1) * limit

    // results = results.skip(skip).limit(limit)

    // const products = await results
    // res.status(StatusCodes.OK).json({ products })

    const skip = (Number(page) - 1) * Number(limit)
    result = result.skip(skip).limit(Number(limit))

    const products = await result
    const total = await Product.countDocuments(queryObject)

    res.status(StatusCodes.OK).json({ total, page: Number(page), limit: Number(limit), products })
    
  } catch(error) {
    next(error)
  }
}

module.exports = getAllProductController