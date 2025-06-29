const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require('bcryptjs');
const { emailPattern, passwordPattern } = require("../utils")

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please provide your fullname"],
    minlength: [7, "Fullname must be at least 7 characters long (For example: John Doe)"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide your email"],
    lowercase: true,
    validate: [
      {
        validator: validator.isEmail,
        message: "Please provide a valid email address",
      },
      {
        validator: function(value) {
          return emailPattern.test(value);
        },
        message: "Please provide a valid email address (For example: johndoe@gmail.com)",
      },
      {
        validator: function(value) {
          const firstPart = value.split("@")[0];
          return firstPart.length >= 5;
        },
        message: "The name before '@' must be at least 5 characters long",
      },
    ],
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    validate: {
      validator: function(value) {
        return passwordPattern.test(value);
      },
      message: "Password must be at least 8 characters long, and include an uppercase letter, number, and symbol",
    },
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  verificationCode: String,
  verificationCodeExpiresAt: Date,
  verified: Date,
  isVerified: {
    type: Boolean,
    default: false,
  },
  lastVerificationEmailSentAt: {
    type: Date,
    default: null,
  },
  passwordToken: {
    type: String,
  },
  passwordTokenExpirationDate: {
    type: Date,
  },

}, { timestamps: true })

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);