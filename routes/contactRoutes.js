const express = require("express");
const { createContact, contacts, contact, updateContact } = require("../controllers/contactController");

const contactRouter = express.Router();

contactRouter.post("/", createContact);

module.exports = contactRouter;
