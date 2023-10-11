const mongoose = require("mongoose");

let review = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    comment: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    is_approved: {
      type: Boolean,
      default: false,
    }
  },{
    timestamps: true
  }
);

module.exports = mongoose.model("Review", review);
