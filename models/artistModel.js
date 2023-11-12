const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    quote: {
      type: String,
    },
    location: {
      type: String,
    },
    account_verified: {
      type: Boolean,
      default: true,
    },
    lovedUsers: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    loveCount: {
      type: Number,
      default: 0,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
  },{
    timestamps: true
  }
);

const Artist = mongoose.model("Artist", artistSchema);
module.exports = Artist;
