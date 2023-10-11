const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    number: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Submitted",
    },
  },{
    timestamps: true
  }
);


module.exports = mongoose.model("Contact", contactSchema);
