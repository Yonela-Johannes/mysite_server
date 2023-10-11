const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true
  },
  post: {
    type: String,
  },
  image: {
    type: String,
  },
  viewCount: {
    type: Number,
    default: 0
  },
  commentCount: {
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
  createdAt: {
    type: Date,
    default: new Date()
  },
});

module.exports = mongoose.model("Post", postSchema);
