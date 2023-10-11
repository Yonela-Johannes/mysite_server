const express = require("express");
const { getProjects, updateProject, deleteProject, getProject, createProject } = require("../controllers/projectController");

const projectRouter = express.Router();

projectRouter.get("/", getProjects);
projectRouter.get("/:projectId", getProject);
projectRouter.post("/", createProject);
projectRouter.patch("/", updateProject);
projectRouter.delete("/", deleteProject);

module.exports = projectRouter;
