const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    given_name: {
      type: String,
      required: true,
    },
    family_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    picture: {
      type: String,
      required: true,
    },
    email_verified: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    quote: String,
  },{
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
