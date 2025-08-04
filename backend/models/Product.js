const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, "Please provide the name for this product"],
    maxlength: 100,
    unique: true
  },
  image: {
    type: String,
    required: [true, "Please upload the image for this product"]
  },
  description: {
    type: String,
    required: [true, "Please provide the description for this product"],
    maxLength: 200,
  },
  size: {
    type: [String],
    required: [true, "Please provide the sizes for this product"],
    enum: ["S", "M", "L", "XL"]
  },
  price: {
    type: Number,
    required: [true, "Please provide the price for this product"],
    min: [0, "Please provide a positive number"],
    default: 0
  },
  averageRating: {
    type: Number,
    default: 0
  },
  numOfReviews: {
    type: Number,
    default: 0
  },
  stock: {
    type: Number,
    default: 5,
    required: true
  },
  category: {
    type: String,
    required: [true, "Please provide the category for this product"],
    enum: ["Men", "Women"]
  },
  subCategory: {
    type: String,
    required: [true, "Please provide the sub category for this product"],
    enum: ["Shirt", "Trouser", "Watch", "Shoe", "Bag"]
  },
  brand: {
    type: String,
    required: [true, "Please provide the name of the brand for this product"],
    enum: ["Dior", "Gucci", "Louis Vitton"]
  },
  featured: {
    type: Boolean,
    default: false
  }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

ProductSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
  justOne: false,
})

module.exports = mongoose.model("Product", ProductSchema)