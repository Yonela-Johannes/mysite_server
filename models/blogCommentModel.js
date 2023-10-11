const mongoose = require("mongoose");
const { stringify } = require("uuid");

const BlogCommentSchema = new mongoose.Schema({
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    blog: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Blog",
    },
    comment: {
      type: String,
      required: true,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    likedUsers: {
      type: [mongoose.Types.ObjectId],
      default: [],
      ref: "User"
    },
  },{
    timestamps: true
  }
);

module.exports = mongoose.model("BlogComment", BlogCommentSchema);
