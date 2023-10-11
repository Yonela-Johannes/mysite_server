const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    links: [{
      name: String,
      url: String
    }],
    images: [],
    author: {
      type: String,
      default: "Nomi"
    },
    price: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    priceAfterDiscount: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    isPublished: {
      type: Boolean,
      default: false
    },
    tech_stack: [],
    key_words: [],
    status: {
      type: String,
      default: "0%",
    },
  },{
    timestamps: true
  }
);


module.exports = mongoose.model("Project", projectSchema);
