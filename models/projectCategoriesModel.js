const mongoose = require("mongoose");

const projectCategorySchema = new mongoose.Schema({
    title: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    slug: {
      type: String,
      required: true,
    },
  },{
    timestamps: true
  }
);

module.exports = mongoose.model("ProjectCategory", projectCategorySchema);
