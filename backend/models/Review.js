const mongoose = require("mongoose")

const ReviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    required: [true, "Please provide rating"],
    min: 1,
    max: 5
  },
  title: {
    type: String,
    required: [true, "Please provide title for this review"],
    maxlength: 100,
    trim: true
  },
  comment: {
    type: String,
    required: [true, "Please drop a comment for this product"],
    maxlength: 200,
    trim: true
  }
}, { timestamps: true })

module.exports = mongoose.model("Review", ReviewSchema)