const express = require("express");
const { getProjectCategories, updateProjectCategory, deleteProjectCategory, getProjectCategory, createProjectCategory } = require("../controllers/projectCategoryController");

const projectCategoryRouter = express.Router();

projectCategoryRouter.get("/", getProjectCategories);
projectCategoryRouter.get("/:projectCategoryId", getProjectCategory);
projectCategoryRouter.post("/", createProjectCategory);
projectCategoryRouter.patch("/", updateProjectCategory);
projectCategoryRouter.delete("/", deleteProjectCategory);

module.exports = projectCategoryRouter;
