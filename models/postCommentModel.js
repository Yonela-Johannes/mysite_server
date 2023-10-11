const mongoose = require("mongoose");

const PostCommentSchema = new mongoose.Schema({
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    post: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Post",
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

module.exports = mongoose.model("PostComment", PostCommentSchema);
