const ProjectCategory = require("../models/projectCategoriesModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../config/validateMongoDbId");
const slugify = require("slugify")

// create Project Category
const createProjectCategory = asyncHandler (async (req, res) => {
  const { _id } = req.user;
  const  { title, slug } = req.body
  validateMongoDbId(_id);
  try {
    const category = await ProjectCategory.created({_id, title, slug: slugify(title.toLowercase())});
    res.status(200).json({
      status: true,
      message: "Project Category Created Successfully!",
      category,
    })
  } catch (error) {
    throw new Error(error)
  }
});

// Get Project Categories
const getProjectCategories = asyncHandler (async (req, res) => {
  try {
    const categories = await ProjectCategory.find().populate("user");
    res.status(200).json({
      status: true,
      message: "Fetch Project Categories Successfully!",
      categories,
    });
  } catch (error) {
    throw new Error(error)
  }
});

// Get Project Category
const getProjectCategory = asyncHandler (async (req, res) => {
  const { projectCategoryId } = req.body
  try {
    const category = await ProjectCategory.findById(projectCategoryId).populate("user");
    res.status(200).json({
      status: true,
      message: "Fetch Project Category Successfully!",
      category,
    });
  } catch (error) {
    throw new Error(error)
  }
});

// Edit/Update ProjectCategory
const updateProjectCategory = asyncHandler (async (req, res) => {
  const { projectCategoryId, title, slug } = req.body
  validateMongoDbId(projectCategoryId);
  try {
    const contact = await ProjectCategory.findByIdAndUpdate(projectCategoryId,
      {
        title, slug
      }, {new: true});
    res.status(200).json({
      status: true,
      message: "Project Category Updated Successfully",
      contact,
    });
  } catch (error) {
    throw new Error(error)
  }
});

// Edit/Update ProjectCategory
const deleteProjectCategory = asyncHandler (async (req, res) => {
  const { projectCategoryId } = req.body
  validateMongoDbId(projectCategoryId);
  try {
     await ProjectCategory.findByIdAndDelete(projectCategoryId);
    res.status(200).json({
      status: true,
      message: "Project Category Deleted Successfully",
    });
  } catch (error) {
    throw new Error(error)
  }
});

module.exports = { createProjectCategory, getProjectCategories, getProjectCategory, updateProjectCategory, deleteProjectCategory };
