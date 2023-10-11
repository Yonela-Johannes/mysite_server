const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  viewCount: {
    type: Number,
    default: 0
  },
  loveCount: {
    type: Number,
    default: 0
  },
  lovedUsers: {
    type: [mongoose.Types.ObjectId],
    default: [],
    ref: "User",
  },
  categories: {
    type: Array,
    required: false,
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
});

module.exports = mongoose.model("Blog", blogSchema);
