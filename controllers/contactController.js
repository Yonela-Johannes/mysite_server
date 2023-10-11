const Contact = require("../models/contactModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../config/validateMongoDbId");
const sendMail = require("./emailController");

// create contact
const createContact = asyncHandler (async (req, res) => {
  const {first_name, last_name, email, comment, subject } = req.body

  try {
    const response = await sendMail({from: `👋 ${first_name} ${last_name}`, to: email, subject, text: comment})
    console.log(response)
    res.status(200).json({
      status: true,
      message: response,
    })
  } catch (error) {
    throw new Error(error)
  }
  return ''
});

module.exports = { createContact };
