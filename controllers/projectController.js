const Project = require("../models/projectModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../config/validateMongoDbId");
const slugify = require("slugify")

// create Project
const createProject = asyncHandler (async (req, res) => {
  const { _id } = req.user;
  const  { title, description, links, images, author, price, discount, price_after_discount, tech_stack, status, key_words } = req.body
  validateMongoDbId(_id);
  try {
    const project = await Project.created(
      {
        _id,
        title,
        slug:
        slugify(title.toLowercase()),
        description,
        links,
        images,
        author,
        price,
        discount,
        price_after_discount,
        tech_stack,
        status,
        key_words
      });
    res.status(200).json({
      status: true,
      message: "Project Created Successfully!",
      project,
    })
  } catch (error) {
    throw new Error(error)
  }
});

// Get Project Categories
const getProjects = asyncHandler (async (req, res) => {
  try {
    const projects = await Project.find().populate("user");
    res.status(200).json({
      status: true,
      message: "Fetch Projects Successfully!",
      projects,
    });
  } catch (error) {
    throw new Error(error)
  }
});

// Get Project Category
const getProject = asyncHandler (async (req, res) => {
  const { projectId } = req.body
  try {
    const project = await Project.findById(projectId).populate("user");
    res.status(200).json({
      status: true,
      message: "Fetch Project Successfully!",
      project: project,
    });
  } catch (error) {
    throw new Error(error)
  }
});

// Edit/Update Project
const updateProject = asyncHandler (async (req, res) => {
  const  { projectId, title, description, links, images, author, price, discount, price_after_discount, tech_stack, status, key_words, publish } = req.body
  validateMongoDbId(projectId);
  try {
    const project = await Project.findByIdAndUpdate(projectId,
      {
        title, slug: slugify(title.toLowercase()),
        description, links, images, author, price, tech_stack, discount, price_after_discount, status, key_words, publish
      }, {new: true});
    res.status(200).json({
      status: true,
      message: "Project Updated Successfully",
      project,
    });
  } catch (error) {
    throw new Error(error)
  }
});

// Edit/Update Project
const deleteProject = asyncHandler (async (req, res) => {
  const { projectId } = req.body
  validateMongoDbId(projectId);
  try {
     await Project.findByIdAndDelete(projectId);
    res.status(200).json({
      status: true,
      message: "Project Deleted Successfully",
    });
  } catch (error) {
    throw new Error(error)
  }
});


module.exports = { createProject, getProjects, getProject, updateProject, deleteProject };
