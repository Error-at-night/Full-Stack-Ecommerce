const mongoose = require("mongoose")
const { twoDecimalPlacePattern } = require("../utils")

const ProductSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, "Please provide the name for this product"],
    minLength: [10, "Product name must be at least 10 characters"],
    maxlength: [100, "Product name cannot exceed 100 characters"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  image: {
    type: String,
    required: [true, "Please upload an image for this product"],
  },
  imageId: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: [true, "Please write a description for this product"],
    minLength: [50, "Description must be at least 50 characters"],
    maxLength: [300, "Description cannot exceed 300 characters"],
    trim: true,
  },
  size: {
    type: [String],
    required: [true, "Please select at least one size for the product"],
    enum: ["S", "M", "L", "XL", "XXL"]
  },
  price: {
    type: Number,
    required: [true, "Please provide a price for the product"],
    min: [0.01, "Price must be greater than 0"],
    validate: {
      validator: function(value) {
        return twoDecimalPlacePattern.test(value.toString())
      },
      message: "Price must be a valid amount (e.g. 100)"
    },
    set: (value) => Number(Number(value).toFixed(2))
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5 
  },
  numOfReviews: {
    type: Number,
    default: 0
  },
  stock: {
    type: Number,
    required: true,
    min: [1, "Stock quantity must be at least 1"],
    max: [100, "Stock quantity cannot exceed 100"],
    validate: {
      validator: Number.isInteger,
      message: "Stock quantity must be a whole number"
    }
  },
  category: {
    type: String,
    required: [true, "Please select a category for this product"],
    enum: ["Men", "Women"]
  },
  subCategory: {
    type: String,
    required: [true, "Please select a sub category for this product"],
    enum: ["Shirt", "Trouser", "Watch", "Shoe", "Bag"]
  },
  brand: {
    type: String,
    required: [true, "Please provide the name of the brand for this product"],
    trim: true,
  },
  featured: {
    type: Boolean,
    default: false
  }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

ProductSchema.pre("save", async function (next) {
  if (this.name) {
    this.name = this.name.trim().toLowerCase()
  }
  next()
})

ProductSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
  justOne: false,
})

module.exports = mongoose.model("Product", ProductSchema)